import ReceivedMessage from '../Dashboard/ReceivedMessage';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import type { ChatTicket } from '../../types/Slices';
import { selectFilteredPersonalAssignedChat } from '../../utils/selectors';
import Pagination from './Pagination';
import usePagination from '../../hooks/usePagination';

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
    const assignedFilteredTickets = useSelector((state: RootState) => selectFilteredPersonalAssignedChat(state.agent, searchValue));

    const {
      currentItems: paginatedTickets,
      totalPages,
      goToPage,
      currentPage
    } = usePagination({elements: assignedFilteredTickets, itemsPerPage: 5, inboxSearchValue: searchValue});

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
          {paginatedTickets?.map((ticket: ChatTicket) => (
              /* Mensajes de la Bandeja de conversaciones */
              <ReceivedMessage 
                key={ticket?.id}
                name={`${ticket?.chat_user?.full_name}`}
                messages={ticket?.messages}
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