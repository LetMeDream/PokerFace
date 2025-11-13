import { SlOptionsVertical } from "react-icons/sl";
import { HiUserAdd } from "react-icons/hi";
import type { ChatTicket } from '../../../types/Slices';
import { FaUserAstronaut } from 'react-icons/fa';
import useInboxEntry from "../../../hooks/useInboxEntry";
import { useDispatch } from "react-redux";
import { setAssigningTicketId } from "../../../store/slices/base";

const InboxEntry = ({ 
  ticket, 
  deleteModalId, 
  closeTicketModalId,
  reopenTicketModalId
}: { 
  ticket: ChatTicket, 
  deleteModalId: string, 
  closeTicketModalId: string,
  reopenTicketModalId: string 
}) => {
  const { lastMessage, lastRemitent, showModal, showOptions } = useInboxEntry({ ticket });
  const dispatch = useDispatch();


  const handleDeleteTicket = () => {
    // Implement ticket deletion logic here
    dispatch(setAssigningTicketId(ticket.id));
    const dialog = document.getElementById(deleteModalId) as HTMLDialogElement | null;
    if (dialog) dialog.showModal();
  }

  /* RESOLVE CHAT */
  const handleCloseTicket = () => {
    // Implement ticket closing logic here
    dispatch(setAssigningTicketId(ticket.id));
    const dialog = document.getElementById(closeTicketModalId) as HTMLDialogElement | null;
    if (dialog) dialog.showModal();
  }

  const handleReOpenTicket = () => {
    // Implement ticket reopening logic here
    dispatch(setAssigningTicketId(ticket.id));
    const dialog = document.getElementById(reopenTicketModalId) as HTMLDialogElement | null;
    if (dialog) dialog.showModal();
  }

  let status 
  switch (ticket.status.toLowerCase()) {
    case 'active':
      status = <div className=" text-left !text-xs uppercase font-semibold">
                  Activo
                </div>;
      break;

    case 'closed':
      status = <div className=" text-left !text-xs uppercase text-red-700 font-semibold">
                  Cerrado
                </div>;
      break;

    case 'pending':
      status = (<div className=" text-left !text-xs uppercase font-semibold">
                  Pendiente
                </div>);
      break
    case 'waiting':
      status = (<div className=" text-left !text-xs uppercase font-semibold">
                  En Espera
                </div>);  
      break;
    default:
      break;
  }
  return (
    <>
      <div className=" border-b border-gray-300">
          <div 
            className="flex items-center gap-3 px-3 py-0.5 bg-cyan-50 hover:bg-indigo-100 duration-300 text-secondary transition-colors cursor-pointer" 
            onClick={showOptions}
            data-custom-id={ticket.id}
          >
            {/* Avatar + Name */}
            <div className=" border-r border-r-gray-300 p-1 basis-2/6 md:basis-1/6 truncate">

                <div className="rounded-l-sm self-stretch flex justify-center group-hover:!bg-slate-600">
                  <FaUserAstronaut className="text-secondary w-12 h-12" />
                </div>

                {/* Columna: Nombre y Status */}
              <div className="flex flex-col flex-1 basis-1/5 md:basis-1/6 truncate text-center">
                <div className="md:px-2 text-xs font-medium truncate">
                  {ticket?.chat_user?.full_name || 'Usuario Anónimo'}
                </div>
                <div className="md:px-2 !text-xs uppercase font-semibold opacity-60">
                  {status || 'Desconocido'}
                </div>
              </div>
              
            </div>

            {/* Último mensaje */}
            <div className="flex-1 min-w-0 flex gap-2 max-h-[60px] basis-3/6 md:basis-4/6">
              

              {/* Columna: Último mensaje */}
              <div className="flex-1 basis-4/5 md:basis-5/6">
                {/* From */}
                <div className="text-xs font-semibold md:px-4 mb-1">
                  {lastRemitent === 'agent' ? (
                    <span className=' text--600'>
                      Agente
                    </span>
                    ) : (
                    <span className=' text-indigo-600'>
                      {ticket?.chat_user?.full_name || 'Usuario'}
                    </span>
                    )}
                </div>
                {/* Message */}
                <p className="text-xs text-gray-700 line-clamp-3 overflow-hidden md:px-4">
                  {lastMessage}
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-1 items-center md:px-4 basis-1/6 md:basis-1/6">
              {/* Asignar e ir */}
              <div
                className={`text-indigo-700 hover:text-indigo-900 transition-colors px-3 py-2.5
                  ${ticket.status.toLocaleLowerCase() === 'closed' ? ' !text-gray-400 hover:!text-gray-600 focus:!text-gray-600 ' : ' !text-indigo-700 hover:!text-indigo-900 focus:!text-indigo-900'}  
                `}
                title="Asignar e Ir a conversación"
                aria-label="Asignar ticket y abrir conversación"
                onClick={showModal}
                data-
              >
                <HiUserAdd className="w-5 h-5" />
              </div>

              {/* Menú de opciones */}
              <div className="relative">
                <div className="dropdown dropdown-bottom dropdown-end">
                  {/* unset all styles for this button */}
                  <button 
                    role='button' 
                    tabIndex={0} 
                    id={`options-button-${ticket.id}`}
                    className={`!bg-[unset]
                      ${ticket.status.toLocaleLowerCase() === 'closed' ? 'hover:!border-transparent' : ''}
                    
                    `} 
                  >
                    <SlOptionsVertical 
                      className={`!w-5 !h-5 text-indigo-700 hover:text-indigo-900 focus:text-indigo-900
                        ${ticket.status.toLocaleLowerCase() === 'closed' ? ' !text-gray-400 hover:!text-gray-600 focus:!text-gray-600 ' : ' !text-indigo-700 hover:!text-indigo-900 focus:!text-indigo-900'}
                      `}
                    />
                  </button>
                  <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    {/* give appearance of disabled button */}
                    <li className="pointer-events-none">
                      <a className=" !text-gray-600 ">
                        Asignar 
                      </a>
                    </li>
                    {/* give appearance of disabled button */}
                    <li 
                      onClick={
                        ticket.status.toLowerCase() === 'closed' ? handleReOpenTicket : handleCloseTicket
                      }
                    >
                      <a>
                        { ticket.status.toLowerCase() === 'closed' ? 'Reabrir Ticket' : 'Marcar como Resuelto' }
                      </a>
                    </li>
                    <li onClick={handleDeleteTicket}>
                      <a>
                        Eliminar
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default InboxEntry