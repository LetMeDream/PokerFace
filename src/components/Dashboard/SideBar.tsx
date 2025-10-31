import ReceivedMessage from '../Dashboard/ReceivedMessage';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { selectFilteredTickets } from '../../utils/helpers';

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
    const filteredTickets = useSelector((state: RootState) => selectFilteredTickets(state.base, searchValue));

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
          {filteredTickets?.map((ticket) => (
              /* Mensajes de la Bandeja de conversaciones */
              <ReceivedMessage 
                key={ticket.chat_room_id}
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