import { useEffect, useState, useRef } from 'react'
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
import toast from 'react-hot-toast'
import { selectNotificationsArray } from '../utils/selectors'
import useSound from 'use-sound'
import guest from '../assets/sounds/guest.mp3'

const useNotifications = () => {
    const { data: notificationsData } = useGetNotificationsQuery<any>(undefined, { pollingInterval: 5000, skip: false });
    const dispatch = useDispatch();
  
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (notificationsData) {
        dispatch(setNotifications(notificationsData.notifications));
      }
    }, [notificationsData, dispatch]);

    const [lastFiveNotifications, setLastFiveNotifications] = useState<Array<NotificationItem>>(notificationsData 
      ? notificationsData.notifications.slice(0, 5) 
      : []
    );

    const currentNotifications = useSelector(selectNotificationsArray);

    /* See More */
    useEffect(() => {
      if (notificationsData) {
        const sortedNotifications = [...currentNotifications.filter((n: NotificationItem) => !n.is_read)].sort((a, b) => 
          (Number(a.is_read) - Number(b.is_read))
        );
        setLastFiveNotifications(sortedNotifications.slice(0, 5));
      }
    }, [setLastFiveNotifications, notificationsData]);

    /* Get Unread notifications */
    useEffect(() => {
      if (notificationsData) {
        const unreadNotifications = currentNotifications.filter((n: NotificationItem) => !n.is_read);
        setLastFiveNotifications(unreadNotifications.slice(0, 5));
      }
    }, [notificationsData, currentNotifications]);


    /* Sound when new notifications (for 'new_message' || 'new_chat') arrive */
    const [guestPing] = useSound(guest);
    useEffect(() => {
      if (!lastFiveNotifications) return;
      console.log(lastFiveNotifications)
      if (lastFiveNotifications.some(n => n.notification_type === 'new_message' || n.notification_type === 'new_chat')) {
        guestPing();
      }

    }, [lastFiveNotifications, guestPing]);
    
    const [markNotificationRead] = useMarkNotificationReadMutation();

    /* Refactor read notification logic */
    const [takeChat] = useTakeChatMutation();
    const assignedChats = useSelector((state: RootState) => state.agent.assigned_chats);

    const goToNotification = async (notification: NotificationItem) => {
      try {
        const isAssigned = assignedChats.byId[notification.chat_room_id];
        dispatch(removeNotification(notification.id));
        if (notification.notification_type === 'new_chat') {
          if (!isAssigned) {
            await takeChat({ ticketId: notification.chat_room_id }).unwrap();
          }
          await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
          dispatch(setSelectedTicketId(notification.chat_room_id));
        } else if (notification.notification_type === 'agent_assigned') {
          await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
          dispatch(setSelectedTicketId(notification.chat_room_id));
        } else if (notification.notification_type === 'new_message') {
          if (!isAssigned) {
            takeChat({ ticketId: notification.chat_room_id })
          }
          await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
          dispatch(setSelectedTicketId(notification.chat_room_id));
        } else if (
          notification.notification_type === 'chat_resolved'  || 
          notification.notification_type === 'chat_closed'    || 
          notification.notification_type === 'agent_unassigned'
        ) {
          await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
        }
        // Signal success in some way, e.g., with a toast notification using icons
        toast.success('');
      } catch (error) {
        // reset previously removed notification, if needed
        // dispatch(setNotifications(currentNotifications));
        console.error('Failed to navigate to notification:', error);
      }
    }


    /* read all notifications */
    const handleMarkAllAsRead = () => {
      try {
        const ids = lastFiveNotifications.map(notification => notification.id);
        if (ids.length > 0) {
          markNotificationRead({ notificationIds: ids }).unwrap();
        }
      } catch (error) {
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
    handleSeeNotification: goToNotification,
    handleMarkAllAsRead,
    handleSeeMoreNotifications
  }
}

export default useNotifications