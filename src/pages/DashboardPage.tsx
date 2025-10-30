import Header from "../components/Dashboard/Header";
import ReceivedMessage from "../components/Dashboard/ReceivedMessage";
import useDashboard from "../hooks/useDashboard";
import { allTickets } from "../constants/chat";
import { setSelectedTicket } from "../store/slices/base";
import { useDispatch } from "react-redux";
import type { ChatTicket } from "../types/Slices";
import Messages from "../components/liveChat/Messages/Messages";
import { useSelector } from "react-redux";
import { RiSearchLine, RiSettingsLine } from "react-icons/ri";

export default function DashboardPage() {
  const { drawerButtonRef, containerRef, searchValue, setSearchValue, classnames } = useDashboard();
  const selectedTicket = useSelector((state: any) => state.base.selectedTicket);

  const ticketsQty = allTickets.length;

  const dispatch = useDispatch();

  const handleTicketClick = (ticket: ChatTicket) => {
    dispatch(setSelectedTicket(ticket));
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div 
            className={classnames.container}
            ref={containerRef}
          >
            {/* Header */}
            <Header />

            {/* Current Selected chat conversation */}
            {selectedTicket ? (                
              <AgentChat selectedTicket={selectedTicket} />
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-secondary pt-6 text-white">
                  <h1 className="!text-xl md:!text-3xl  font-bold mb-4">Selecciona una conversación</h1>
                  <p className="text-lg text-center">Elige una conversación de la barra lateral para ver los mensajes aquí.</p>
                </div>
            )}


            {/* Button for drawer */}
            <label 
              htmlFor="my-drawer-1" className={classnames.drawerBtn}
              ref={drawerButtonRef}
            >
                Conversaciones <span className="badge bg-secondary">{ticketsQty}</span>
            </label>
          </div>  
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
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
              {allTickets.filter(ticket => ticket.messages.length > 0)
                .filter(ticket => ticket.nickname.toLowerCase().includes(searchValue.toLowerCase()))
                .map((ticket) => (
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
        </div>
      </div>

    </>
  );
}

/* Agent Chat */
function AgentChat ({selectedTicket}: {selectedTicket: ChatTicket}) {
  return (
    <div>
      {/* Placeholder for selected chat conversation */}
      <div className="flex flex-col items-start justify-start h-full p-4">
        {/* Placeholder for selected chat messages */}
        <div className="flex flex-col text-secondary w-full items-center">
          {/* Chat Body */}
          <div className=" bg-cyan-50 rounded-xl max-w-[90vw] w-6xl py-5">
              {/* Title and name */}
              <div className="md:p-6 p-2 px-8 border-b border-gray-300 flex items-center gap-2 justify-between">
                <p className="text-sm text-gray-600 md:text-end text-nowrap">Nombre del usuario: 
                  <span className="font-medium text-gray-800 ml-1">
                  {selectedTicket.nickname}
                  </span>
                </p>
                {/* Icons for look for message, and settings */}
                <div className="flex gap-2">
                    <RiSearchLine className="w-5 md:w-6 md:h-6 text-indigo-700 hover:text-indigo-900 cursor-pointer" />
                    <RiSettingsLine className="w-5 md:w-6 md:h-6 text-indigo-700 hover:text-indigo-900 cursor-pointer" />
                </div>
              </div>
              {/* Messages Area */}
              <div className="p-4 h-96 overflow-y-auto">
                  <Messages
                    chatMessages={selectedTicket.messages}
                    type='agent'
                  />
              </div>
              
          </div>
        </div>
      </div>

    </div>
  )
}