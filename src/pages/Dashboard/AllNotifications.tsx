import Header from '../../components/Dashboard/Header/Header'
import { selectNotificationsArray } from '../../utils/selectors'
import { useSelector } from 'react-redux'

const AllNotifications = () => {
  const classnames = {
    container: 'bg-secondary container !min-w-full !min-h-[100dvh]',
  }
  const notifications = useSelector(selectNotificationsArray);
  console.log(notifications.slice(0, 10))

  return (
    <div className={classnames.container}>
      {/* Header */}
      <Header />

      <div className="p-6">
        {/* <div role="alert" className="alert alert-vertical sm:alert-horizontal max-w-2xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <h3 className="font-bold">¡Nueva notificación!</h3>
            <div className="text-xs">{currentNotification?.message || ''}</div>
          </div>
          <button className="btn btn-sm" onClick={handleSeeNotification}>Marcar como leído</button>
        </div> */}
      

      </div>
    </div>
  )
}

export default AllNotifications