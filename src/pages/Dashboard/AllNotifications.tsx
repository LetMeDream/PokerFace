import Header from '../../components/Dashboard/Header/Header'
import { selectNotificationsArray } from '../../utils/selectors'
import { useSelector } from 'react-redux'
import Pagination from '../../components/Dashboard/Pagination'
import usePagination from '../../hooks/usePagination'
import { formatDistance } from 'date-fns'
import { notificationStatusMessages } from '../../constants/chat'

const AllNotifications = () => {
  const classnames = {
    container: 'bg-secondary container !min-w-full !min-h-[100dvh]',
  }
  const notifications = useSelector(selectNotificationsArray);
  const {
    currentItems: paginatedNotifications,
    totalPages,
    goToPage,
    currentPage
  } = usePagination({elements: notifications, itemsPerPage: 10});

  return (
    <div className={classnames.container}>
      {/* Header */}
      <Header />

      <div className="p-6">

        <div className="overflow-x-auto bg-gray-600 rounded-t-2xl p-2 max-w-4xl mx-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Número</th>
                <th

                >Mensaje</th>
                <th>Creada Hace</th>
                <th>Tipo</th>
                <th>Leído</th>

              </tr>
            </thead>
            <tbody>

              {paginatedNotifications.map((notification, index) => (
                <tr key={notification.id} className={notification.is_read ? '' : 'bg-gray-400 font-bold'}>
                  <th>{index + 1}</th>
                  <td>{notification.id}</td>
                  <td>{notification.message}</td>
                  <td>{formatDistance(new Date(notification.created_at), new Date(), { addSuffix: true })}</td>
                  <td>{notificationStatusMessages[notification.notification_type as keyof typeof notificationStatusMessages]}</td>
                  <td>{notification.is_read ? 'Sí' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
        <div className="mt-4 flex justify-center">
          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            goToPage={goToPage}
          />
        </div>

      </div>
    </div>
  )
}

export default AllNotifications