import ReceivedMessage from '../Dashboard/ReceivedMessage';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import type { ChatTicket } from '../../types/Slices';
import { selectFilteredTicketsByChatRoomId } from '../../utils/selectors';

const SideBar = (
  { 
    searchValue, setSearchValue, classnames, handleTicketClick 
  }: 
  {
    searchValue: string;
    setSearchValue: (value: string) => void;
    classnames: { searchInput: string };
    handleTicketClick: (ticket: any) => void;
  }) => {
    const { chat_id: chat_room_id } = useSelector((state: RootState) => state.chatProfile);
    const assignedFilteredTickets = useSelector((state: RootState) => selectFilteredTicketsByChatRoomId(state.base, searchValue, chat_room_id));

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
        {/* Message */}
        <div className="flex flex-col gap-2 max-w-full">
          {assignedFilteredTickets?.map((ticket: ChatTicket) => (
              /* Mensajes de la Bandeja de conversaciones */
              <ReceivedMessage 
                key={ticket.id}
                avatarSrc={ticket?.avatarSrc || ''}
                name={`${ticket.nickname}`}
                messages={ticket.messages}
                onClick={() => {
                  handleTicketClick(ticket as any);
                  const drawerCheckbox = document.getElementById('my-drawer-1') as HTMLInputElement;
                  if (drawerCheckbox && drawerCheckbox.checked) {
                    drawerCheckbox.checked = false; // Cierra el drawer al seleccionar un ticket
                  }
                }}
              />
            ))}
        </div>

      </ul>
    )
}

export default SideBar