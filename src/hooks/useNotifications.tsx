import { useEffect, useState, useRef, useMemo } from 'react'
import { useGetNotificationsQuery } from '../services/service'
import { useDispatch } from 'react-redux'
import { setNotifications, removeNotification} from '../store/slices/agent'
import { useMarkNotificationReadMutation } from '../services/service'
import type { NotificationItem } from '../types/Slices'
import { useTakeChatMutation } from '../services/service'
import { setSelectedTicketId } from '../store/slices/base'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'
import { selectNotificationsArray } from '../utils/selectors'
import useSound from 'use-sound'
import guest from '../assets/sounds/guest.mp3'
import { setHasNotificationsSoundPlayed } from '../store/slices/base'
import toast from 'react-hot-toast';
import { FiInfo } from 'react-icons/fi';

export const toastInfo = (message: string) => {
  return toast.custom(
    (t) => (
      <div
        className={`
          flex items-center gap-3 
          bg-white text-gray-800 
          px-4 py-3 rounded-lg shadow-md border border-gray-200
          min-w-[320px] max-w-md
          ${t.visible ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-200
        `}
      >
        <FiInfo className="text-blue-500 flex-shrink-0 text-xl" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          ×
        </button>
      </div>
    ),
    { duration: 4500 }
  );
};


const useNotifications = () => {
    const { data: notificationsData } = useGetNotificationsQuery<any>(undefined, { skip: false });
    const dispatch = useDispatch();
  
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (notificationsData) {
        const newMessagesNotifications = notificationsData.notifications.filter((n: NotificationItem) => n.notification_type === 'new_message' || n.notification_type === 'new_chat');

        console.log(newMessagesNotifications)
        dispatch(setNotifications(newMessagesNotifications));
      }
    }, [notificationsData, dispatch]);

    /* const [lastFiveNotifications, setLastFiveNotifications] = useState<Array<NotificationItem>>(notificationsData 
      ? notificationsData.notifications.filter((n: NotificationItem) => n.notification_type === 'new_message' || n.notification_type === 'new_chat').slice(0, 5) 
      : []
    ); */

    const currentNotifications = useSelector(selectNotificationsArray);

    useEffect(() => {
      if (!notificationsData?.notifications) return;

      // We filter the notifications to keep only 'new_message' and 'new_chat' types before saving them in Redux
      const relevantNotifications = notificationsData.notifications.filter((n: NotificationItem) =>
        n.notification_type === 'new_message' || n.notification_type === 'new_chat'
      );

      dispatch(setNotifications(relevantNotifications));

    }, [notificationsData, dispatch]);

    const lastFiveNotifications = useMemo(() => {
      return currentNotifications
        .filter(n => !n.is_read)
        // .filter(n => n.notification_type === 'new_message' || n.notification_type === 'new_chat')
        .sort((a, b) => Number(a.created_at || 0) - Number(b.created_at || 0)) // o como ordenes
        .slice(0, 5);
    }, [currentNotifications]);

    
    


    /* Sound when new notifications (for 'new_message' || 'new_chat') arrive */
    const [guestPing] = useSound(guest);
    const hasNotificationSoundPlayed = useSelector((state: RootState) => state.base.hasNotificationsSoundPlayed);

    useEffect(() => {
      setTimeout(() => {
        dispatch(setHasNotificationsSoundPlayed(false));
      }, 2000);
    }, [hasNotificationSoundPlayed, dispatch])

    useEffect(() => {
      if (!lastFiveNotifications) return;
      if (lastFiveNotifications.some(n => n.notification_type === 'new_message' || n.notification_type === 'new_chat')) {
        if (!hasNotificationSoundPlayed) {
          // console.log('arriving new message notification');
          guestPing();
          dispatch(setHasNotificationsSoundPlayed(true));
        }
      }

    }, [guestPing, dispatch, lastFiveNotifications]);
    
    const [markNotificationRead] = useMarkNotificationReadMutation();

    /* Refactor read notification logic */
    const [takeChat] = useTakeChatMutation();
    const assignedChats = useSelector((state: RootState) => state.agent.assigned_chats);

    const handleSeeNotification = async (notification: NotificationItem) => {
      try {
        const isAssigned = assignedChats.byId[notification.chat_room_id];
        dispatch(removeNotification(notification.id));
        let takeChatResult;
        if (notification.notification_type === 'new_chat') {
          if (!isAssigned) {
            takeChatResult = await takeChat({ ticketId: notification.chat_room_id }).unwrap();
            if (takeChatResult) {
              await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
              dispatch(setSelectedTicketId(notification.chat_room_id));
            }
          }
        } else if (notification.notification_type === 'agent_assigned') {
          await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
          if (isAssigned) dispatch(setSelectedTicketId(notification.chat_room_id));
        } else if (notification.notification_type === 'new_message') {
          if (!isAssigned) {
            try {
              await takeChat({ ticketId: notification.chat_room_id }).unwrap();
              await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
              dispatch(setSelectedTicketId(notification.chat_room_id));
            } catch (error) {
              console.error('Failed to take chat from notification:', error);
            }
          }
        } else if (
          notification.notification_type === 'chat_resolved'  || 
          notification.notification_type === 'chat_closed'    || 
          notification.notification_type === 'agent_unassigned'
        ) {
          await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
        }
        // Signal success in some way
        toastInfo('Notificación marcada como leída');
      } catch (error) {
        // reset previously removed notification, if needed
        // dispatch(setNotifications(currentNotifications));
        if ((error as any)?.data?.error === 'Este chat ya ha sido asignado o no está en espera'){
          toastInfo('No se ha podido tomar el chat porque ya ha sido asignado a otro agente ');
        } else {
          toastInfo((error as any)?.data?.error || 'Error al procesar la notificación');
        }
        await markNotificationRead({ notificationIds: [notification.id] }).unwrap();

      }
    }


    /* read all notifications */
    const handleMarkAllAsRead = () => {
      try {
        const ids = lastFiveNotifications.map(notification => notification.id);
        let updatedNotifications = [...currentNotifications];
        ids.forEach(id => {
          updatedNotifications = updatedNotifications.map(notification =>
            notification.id === id ? { ...notification, is_read: true } : notification
          );
        });
        // Updating notifications locally instantly 
        dispatch(setNotifications(updatedNotifications));
        
        // Updating notifications in the server 
        if (ids.length > 0) {
          markNotificationRead({ notificationIds: ids }).unwrap();
        }
      } catch (error) {
        // reset previously removed notification, if needed
        // dispatch(setNotifications(currentNotifications));
        console.error('Failed to mark all notifications as read:', error);
      }
    };
    /* see more notifications */
    const navigate = useNavigate();
    const handleSeeMoreNotifications = () => {
      navigate('/dashboard/notifications');
    }

  return {
    isOpen,
    setIsOpen,
    dropdownRef,
    lastFiveNotifications,
    notificationsData,
    handleSeeNotification,
    handleMarkAllAsRead,
    handleSeeMoreNotifications
  }
}

export default useNotifications