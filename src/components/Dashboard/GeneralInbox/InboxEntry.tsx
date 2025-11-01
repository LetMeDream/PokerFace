import React from 'react'
import { SlOptionsVertical } from "react-icons/sl";
import { HiUserAdd } from "react-icons/hi";
import type { ChatTicket } from '../../../types/Slices';
import { FaUserAstronaut } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setAssigningTicketId } from '../../../store/slices/base';

const InboxEntry = ({ ticket }: { ticket: ChatTicket }) => {
  const [imgError, setImgError] = React.useState(false);

  const lastMessage = (ticket.messages && ticket.messages.length > 0)
    ? ticket.messages[ticket.messages.length - 1].content
    : 'No hay mensajes aún.';

  const lastRemitent = (ticket.messages && ticket.messages.length > 0)
    ? ticket.messages[ticket.messages.length - 1].message_type
    : 'Desconocido';

  const dispatch = useDispatch();
  const showModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const dialog = document.getElementById('my_modal_1') as HTMLDialogElement | null;
    dispatch(setAssigningTicketId(ticket.id));
    
    if (dialog) dialog.showModal();
  }

  const showOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    const optionsButton = document.getElementById(`options-button-${ticket.id}`);
    if (!optionsButton) return;
    // DaisyUI's dropdowns are triggered by focus, so we focus the button to open the menu
    optionsButton.focus();
  }

  return (
    <>
      <div className=" border-b border-gray-300">
          <div 
            className="flex items-center gap-3 p-3 bg-cyan-50 hover:bg-indigo-100 duration-300 text-secondary transition-colors cursor-pointer" 
            onClick={showOptions}
            data-id={ticket.id}
          >
            {/* Avatar */}
            {ticket?.avatarSrc && !imgError ? (
              /* Avatar image */
              <div className="rounded-l-sm rounded-r-none group-hover:!bg-slate-600 self-stretch flex justify-center items-center">
                <div className="mask mask-squircle w-12">
                  <img src={ticket.avatarSrc} onError={() => setImgError(true)} />
                </div>
              </div>
            ) : (
              /* Fallback avatar */
              <div className="rounded-l-sm self-stretch flex justify-center group-hover:!bg-slate-600">
                <FaUserAstronaut className="text-secondary w-12 h-12" />
              </div>
            )}

            {/* Nombre + Estado + Mensaje */}
            <div className="flex-1 min-w-0 flex gap-2 max-h-[60px] border-r border-r-gray-300">
              {/* Columna: Nombre y Status */}
              <div className="flex flex-col flex-1 basis-1/5 md:basis-1/6 truncate border-r border-r-gray-300">
                <div className="md:px-2 text-sm font-medium truncate">
                  {ticket.nickname || 'Usuario Anónimo'}
                </div>
                <div className="md:px-2 text-xs uppercase font-semibold opacity-60">
                  {ticket.status || 'Desconocido'}
                </div>
              </div>

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
                      {ticket.nickname || 'Usuario'}
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
            <div className="flex items-center md:px-4">
              {/* Asignar e ir */}
              <div
                className="text-indigo-700 hover:text-indigo-900 transition-colors px-3 py-2.5"
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
                  <button className=' !bg-[unset]' role='button' tabIndex={0} 
                    id={`options-button-${ticket.id}`}
                  >
                    <SlOptionsVertical className="!w-5 !h-5 text-indigo-700 hover:text-indigo-900 focus:text-indigo-900" 
                    />
                  </button>
                  <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                      <a>
                        Asignar 
                      </a>
                    </li>
                    <li>
                      <a>
                        Marcar como Resuelto
                      </a>
                    </li>
                    <li>
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