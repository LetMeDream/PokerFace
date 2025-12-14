import ReceivedMessage from '../Dashboard/ReceivedMessage';
// import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import type { ReceivedChatMessage } from '../../types/Slices';
import { selectFilteredPersonalAssignedChat, selectNotificationsArray } from '../../utils/selectors';
import Pagination from './Pagination';
import usePagination from '../../hooks/usePagination';
import { useRefetchMyChat } from '../../hooks/useRefetch';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedTicketId } from '../../store/slices/base';
import { removeNotification } from '../../store/slices/agent';
import { useMarkNotificationReadMutation } from '../../services/service';
import toast from 'react-hot-toast';
/* import { formatDistance } from 'date-fns';
 */
const SideBar = (
  { 
    searchValue, setSearchValue, classnames 
  }: 
  {
    searchValue: string;
    setSearchValue: (value: string) => void;
    classnames: { searchInput: string };
  }) => {
    const assignedChats = useSelector((state: any) => selectFilteredPersonalAssignedChat(state.agent, searchValue)) as unknown as ReceivedChatMessage[];
    useRefetchMyChat();
    const unreadNotifications = useSelector(selectNotificationsArray).filter(n => !n.is_read);

 
    const orderedTickets = [...assignedChats].sort((a, b) => {
        // Si un chat no tiene mensajes, se va al final.
        if (!a.messages || a.messages.length === 0) return 1;
        if (!b.messages || b.messages.length === 0) return -1;
      
        const aLastMessage = a.messages[a.messages.length - 1];
        const bLastMessage = b.messages[b.messages.length - 1];
      
        // Si un mensaje no existe (aunque el array de mensajes sí), se va al final.
        if (!aLastMessage) return 1;
        if (!bLastMessage) return -1;
      
        const aCalculatedTime = new Date(aLastMessage.created_at).getTime();
        const bCalculatedTime = new Date(bLastMessage.created_at).getTime();
      
        return bCalculatedTime - aCalculatedTime;
    });

    const dispatch = useDispatch(); 
    const [markNotificationRead] = useMarkNotificationReadMutation();

    const {
      currentItems: paginatedTickets,
      totalPages,
      goToPage,
      currentPage,
      setCurrentPage
    } = usePagination({elements: orderedTickets, itemsPerPage: 5});

    const handleSelectTicket = async (ticket: ReceivedChatMessage) => {
      const notificationForTicket = unreadNotifications.find(n => n.chat_room_id === ticket.id);
      try {
        if (notificationForTicket) {
          await markNotificationRead({ notificationIds: [notificationForTicket.id] }).unwrap();
        }
        dispatch(removeNotification(notificationForTicket?.id));
        dispatch(setSelectedTicketId(ticket.id));
        const drawerCheckbox = document.getElementById('my-drawer-1') as HTMLInputElement;
        if (drawerCheckbox && drawerCheckbox.checked) {
          drawerCheckbox.checked = false; // Cierra el drawer al seleccionar un ticket
        }
        
      } catch (error) {
        console.error('Failed to navigate to ticket from sidebar:', error);
        toast.error('Hubo un error al abrir el chat. Inténtalo de nuevo.');
      } 
    }

    useEffect(() => {
      setCurrentPage(1);
    }, [searchValue, setCurrentPage]);

    return (
      <ul className="menu bg-secondary min-h-full p-4 max-w-80">
        {/* Sidebar content here */}
        <div className="caret-transparent mb-4">
          <h2 className="caret-transparent">
            Buscar:
          </h2>
          <input 
            type="text" 
            placeholder="Buscar..." 
            className={classnames.searchInput} 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-center">
          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            goToPage={goToPage}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 max-w-full">
          {paginatedTickets?.map((ticket) => (
              /* Mensajes de la Bandeja de conversaciones */
              <ReceivedMessage 
                key={ticket?.id}
                chatMessage={ticket}
                onClick={() => handleSelectTicket(ticket)}
              />
            ))}
        </div>

 

      </ul>
    )
}

export default SideBar