import { useEffect, useState, useRef } from 'react'
import { useGetNotificationsQuery } from '../services/service'
import { useDispatch } from 'react-redux'
import { setNotifications } from '../store/slices/agent'
import { useMarkNotificationReadMutation } from '../services/service'
import type { NotificationItem } from '../types/Slices'
import { useTakeChatMutation } from '../services/service'
import { setSelectedTicketId } from '../store/slices/base'

const useNotifications = () => {
    const { data: notificationsData } = useGetNotificationsQuery();
    const dispatch = useDispatch();
  
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (notificationsData) {
        dispatch(setNotifications(notificationsData.notifications));
      }
    }, [notificationsData, dispatch]);

    const [extraNotificationsLoaded, setExtraNotificationsLoaded] = useState(0);
    const [lastFiveNotifications, setLastFiveNotifications] = useState<Array<NotificationItem>>(notificationsData 
      ? notificationsData.notifications.slice(0, 5) 
      : []
    );

    /* See More */
    useEffect(() => {
      if (notificationsData) {
        const sortedNotifications = [...notificationsData.notifications.filter(n => !n.is_read)].sort((a, b) => 
          (Number(a.is_read) - Number(b.is_read))
        );
        setLastFiveNotifications(sortedNotifications.slice(0, 5 + extraNotificationsLoaded));
      }
    }, [extraNotificationsLoaded, setLastFiveNotifications, notificationsData]);

    /* Get Unread notifications */
    useEffect(() => {
      if (notificationsData) {
        const unreadNotifications = notificationsData.notifications.filter(n => !n.is_read);
        setLastFiveNotifications(unreadNotifications.slice(0, 5 + extraNotificationsLoaded));
      }
    }, [notificationsData, extraNotificationsLoaded]);

    /* Reset */
    useEffect(() => {
      if (!isOpen) {
        setExtraNotificationsLoaded(0);
      }
    }, [isOpen, setExtraNotificationsLoaded]);

    
    const [markNotificationRead] = useMarkNotificationReadMutation();

    /* Refactor read notification logic */
    const [takeChat] = useTakeChatMutation();
    const goToNotification = async (notification: NotificationItem) => {
      try {
        if (notification.notification_type === 'new_chat') {
          await takeChat({ ticketId: notification.chat_room_id }).unwrap();
          await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
          dispatch(setSelectedTicketId(notification.chat_room_id));
        } else if (notification.notification_type === 'agent_assigned') {
          await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
          dispatch(setSelectedTicketId(notification.chat_room_id));
        } else if (notification.notification_type === 'new_message') {
          await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
          dispatch(setSelectedTicketId(notification.chat_room_id));
        } else if (notification.notification_type === 'chat_resolved' || notification.notification_type === 'chat_closed' || notification.notification_type === 'agent_unassigned') {
          await markNotificationRead({ notificationIds: [notification.id] }).unwrap();
        }
      } catch (error) {
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
    const handleSeeMoreNotifications = () => {
      setExtraNotificationsLoaded(prev => prev + 2);
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