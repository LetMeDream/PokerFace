import { useEffect, useState, useRef } from 'react'
import { useGetNotificationsQuery } from '../services/service'
import { useDispatch } from 'react-redux'
import { setCurrentNotification, setNotifications } from '../store/slices/agent'
import { useMarkNotificationReadMutation } from '../services/service'
import type { NotificationItem } from '../types/Slices'
import { useNavigate } from 'react-router-dom'

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
        setLastFiveNotifications(notificationsData.notifications.slice(0, 5 + extraNotificationsLoaded));
      }
    }, [extraNotificationsLoaded, setLastFiveNotifications, notificationsData]);

    /* Reset */
    useEffect(() => {
      if (!isOpen) {
        setExtraNotificationsLoaded(0);
      }
    }, [isOpen, setExtraNotificationsLoaded]);

    
    const [markNotificationRead] = useMarkNotificationReadMutation();

    /* Refactor read notification logic */
    const navigate = useNavigate();
    const goToNotification = (notification: NotificationItem) => {
      try {
        dispatch(setCurrentNotification(notification));
        navigate(`/dashboard/notification/${notification.chat_room_id}`);
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