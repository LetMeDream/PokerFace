import { useEffect, useState, useRef } from 'react'
import { useGetNotificationsQuery } from '../services/service'
import { useDispatch } from 'react-redux'
import { setNotifications } from '../store/slices/agent'

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
  
    // cerrar al hacer click fuera
    useEffect(() => {
      const onClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
  
      document.addEventListener('mousedown', onClickOutside);
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('mousedown', onClickOutside);
        document.removeEventListener('keydown', onKey);
      };
    }, []);
  
    const lastFiveNotifications = notificationsData
      ? notificationsData.notifications.slice(0, 5)
      : [];
    

  return {
    isOpen,
    setIsOpen,
    dropdownRef,
    lastFiveNotifications,
    notificationsData
  }
}

export default useNotifications