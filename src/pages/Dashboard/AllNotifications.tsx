import Header from '../../components/Dashboard/Header/Header'
import { useSelector } from 'react-redux'
import { useMarkNotificationReadMutation } from '../../services/service'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AllNotifications = () => {
  const classnames = {
    container: 'bg-secondary container !min-w-full !min-h-[100dvh]',
  }
  const currentNotification = useSelector((state: any) => state.agent.current_notification);

  const navigate = useNavigate();
  /* read notification individually */
  const [markNotificationRead] = useMarkNotificationReadMutation();
  const handleSeeNotification = async () => {
    try {
      await markNotificationRead({ notificationIds: [currentNotification?.id] }).unwrap()
      toast.success('Notificación marcada como leída');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      toast.error('Error al marcar la notificación como leída');
    }
  }

  return (
    <div className={classnames.container}>
      {/* Header */}
      <Header />

      <div className="p-6">
        <div role="alert" className="alert alert-vertical sm:alert-horizontal max-w-2xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <h3 className="font-bold">¡Nueva notificación!</h3>
            <div className="text-xs">{currentNotification?.message || ''}</div>
          </div>
          <button className="btn btn-sm" onClick={handleSeeNotification}>Marcar como leído</button>
        </div>
      </div>
    </div>
  )
}

export default AllNotifications