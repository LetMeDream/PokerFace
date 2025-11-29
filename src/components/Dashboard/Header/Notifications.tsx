import { useEffect, useState, useRef } from 'react';
import { useGetNotificationsQuery } from '../../../services/service';
import { IoIosNotifications } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { setNotifications } from '../../../store/slices/agent';
import type { NotificationItem } from '../../../types/Slices';
import { formatDistance } from "date-fns";

export const Notifications = () => {
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

  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])
  

  return (
    <>
      {/* añadir la clase dropdown-open cuando isOpen es true */}
      <div ref={dropdownRef} className={`dropdown ${isOpen ? 'dropdown-open' : ''}`}>
        <button
          tabIndex={0}
          className="btn btn-secondary !bg-secondary gap-0 !px-3 group"
          onClick={() => setIsOpen(!isOpen)} 
          aria-expanded={isOpen}
        >
          <IoIosNotifications size={20} className="group-hover:text-primary" />
          <div className="badge badge-sm badge-secondary !px-0 group-hover:text-primary">
            {notificationsData ? notificationsData.notifications.length : 0}
          </div>
        </button>

        <div
          tabIndex={-1}
          className="dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm w-[40ch] truncate"
        >
          <li>
            <h3 className="font-bold !text-white border-b-1 border-b-gray-200 pb-2 mb-2 text-center">Notificaciones</h3>
          </li>
          {lastFiveNotifications.map((notification) => (
            <NotificationEntry
              key={notification.id}
              notification={notification}
              // onSelect={() => setIsOpen(false)}
            />
          ))}
          {lastFiveNotifications.length === 0 && (
            <li>
              <a>No notifications</a>
            </li>
          )}
          {notificationsData && notificationsData.notifications.length > 5 && (
            <li
              className="text-start !text-primary p-2 py-1.5 cursor-pointer hover:underline"
              onClick={() => {
                // ejemplo: cerrar y navegar a "ver todo"
                setIsOpen(false);
                // navegar o abrir página de notificaciones...
              }}
            >
              See all notifications
            </li>
          )}
        </div>
      </div>
    </>
  );
};

const NotificationEntry = ({ notification }: { notification: NotificationItem }) => {

  const truncatedMessage = notification.message.length > 40 ? notification.message.slice(0, 40) + '...' : notification.message;

  return (
    <div className='border-b-1 border-b-gray-200 mb-2 group'>
      <li key={notification.id} className={` ${notification.is_read ? '' : 'font-bold !text-white '}`} title={notification.message}>
        <a className=" !truncate">
            {truncatedMessage}
        </a>
      </li>
      <span className="text-xs opacity-60 p-2 pl-4 group-hover:bg-[unset]">
        {formatDistance(new Date(notification.created_at), new Date(), { addSuffix: true })}
      </span>
    </div>
  )
}