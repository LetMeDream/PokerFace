import { IoIosNotifications } from 'react-icons/io';
import type { NotificationItem } from '../../../types/Slices';
import { formatDistance } from "date-fns";
import useNotifications from '../../../hooks/useNotifications';
import { useSelector } from 'react-redux';
import { selectNotificationsArray } from '../../../utils/selectors';

export const Notifications = () => {
  const {
    isOpen,
    setIsOpen,
    dropdownRef,
    lastFiveNotifications,
    notificationsData,
    handleSeeNotification,
    handleMarkAllAsRead,
    handleSeeMoreNotifications
  } = useNotifications();
  const currentNotifications = useSelector(selectNotificationsArray);

  return (
    <>
      {/* añadir la clase dropdown-open cuando isOpen es true */}
      <div ref={dropdownRef} className={`dropdown`}>
          
        {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
        {/* For TSX uncomment the commented types below */}
        <button 
          className="btn !bg-secondary text-gray-200" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } as React.CSSProperties}
          onClick={() => {
            setIsOpen(!isOpen)
          }}   
        >
          <IoIosNotifications size={20} className="group-hover:text-primary" />
          <div className="badge badge-sm badge-secondary group-hover:text-primary !bg-red-400 p-2">
            {currentNotifications ? currentNotifications.filter((n: NotificationItem) => !n.is_read).length : 0}
          </div>
        </button>

        <div className="dropdown menu w-[40ch] rounded-box bg-base-100 shadow-sm !truncate"
            popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } as React.CSSProperties }>
          <li>
            <h3 className="font-bold !text-white border-b-1 border-b-gray-200 pb-2 mb-2 text-center">Notificaciones</h3>
          </li>
          {lastFiveNotifications.map((notification) => (
            <NotificationEntry
              handleSeeNotification={handleSeeNotification}
              key={notification.id}
              notification={notification}
            />
          ))}
          {/* No notifications */}
          {lastFiveNotifications.length === 0 && (
            <li>
              <a>No hay notificaciones</a>
            </li>
          )}
          {/* See More Notifications */}
          {notificationsData && notificationsData.notifications.length > 5 && (
            <div className=' flex justify-between'>
              <li
                className="text-start !text-primary p-2 py-1.5 cursor-pointer hover:underline"
                onClick={handleMarkAllAsRead}
              >
                Marcar como leídos
              </li>
              <li
                className="!text-primary p-2 py-1.5 cursor-pointer hover:underline"
                onClick={handleSeeMoreNotifications}
              >
                Ver más...
              </li>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const NotificationEntry = ({ notification, handleSeeNotification }: { notification: NotificationItem, handleSeeNotification: (notification: NotificationItem) => void }) => {

  const truncatedMessage = notification.message.length > 40 ? notification.message.slice(0, 40) + '...' : notification.message;

  return (
    <div 
      className={`border-b-1 border-b-gray-200 mb-2 group 
      ${notification.is_read ? 'bg-secondary-light' : 'font-bold !text-white '} 
    `}
      onClick={() => handleSeeNotification(notification)}
    >
      <li key={notification.id} className={` font-bold !text-white`} title={notification.message}>
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