import { IoIosNotifications } from 'react-icons/io';
import type { NotificationItem } from '../../../types/Slices';
import { formatDistance } from "date-fns";
import useNotifications from '../../../hooks/useNotifications';
import { useEffect } from 'react';

export const Notifications = () => {
  const {
    isOpen,
    setIsOpen,
    dropdownRef,
    lastFiveNotifications,
    notificationsData
  } = useNotifications();

    useEffect(() => {
      console.log(isOpen)
    }, [isOpen])

  return (
    <>
      {/* añadir la clase dropdown-open cuando isOpen es true */}
      <div ref={dropdownRef} className={`dropdown`}>
          
        {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
        {/* For TSX uncomment the commented types below */}
        <button 
          className="btn" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } as React.CSSProperties}
          onClick={() => {
            setIsOpen(!isOpen)
          }}   
        >
          <IoIosNotifications size={20} className="group-hover:text-primary" />
          <div className="badge badge-sm badge-secondary !px-0 group-hover:text-primary">
            {notificationsData ? notificationsData.notifications.length : 0}
          </div>
        </button>

        <div className="dropdown menu w-[40ch] rounded-box bg-base-100 shadow-sm !truncate"
            popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } as React.CSSProperties }>
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