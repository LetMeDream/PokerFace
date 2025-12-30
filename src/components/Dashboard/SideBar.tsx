import ReceivedMessage from '../Dashboard/ReceivedMessage';
// import type { RootState } from '../../store/store';
import Pagination from './Pagination';
import useSideBar from '../../hooks/useSideBar';


const SideBar = (
  { 
    searchValue 
  }: 
  {
    searchValue: string;
    setSearchValue: (value: string) => void;
    classnames: { searchInput: string };
  }) => {

  const {
    paginatedTickets,
    totalPages,
    currentPage,
    goToPage,
    handleSelectTicket
  } = useSideBar({ searchValue });

  console.log(totalPages)

  return (
    <ul className="menu bg-secondary min-h-full p-4 max-w-80">
      {/* Sidebar content here */}
      {/* <div className="caret-transparent mb-4">
        <input 
        type="text" 
        placeholder="Buscar..." 
        className={classnames.searchInput} 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        />
        </div> */}
      <h2 className="caret-transparent text-xl mb-2">
        Conversaciones:
      </h2>

      <div className="mb-4 flex justify-center">
        <Pagination 
          totalPages={10}
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