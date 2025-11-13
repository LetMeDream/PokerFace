import {  useState } from 'react'
import Messages from '../liveChat/Messages/Messages';
import { RiSearchLine, RiSettingsLine, RiCloseLargeFill } from 'react-icons/ri';
import { BsSend } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { selectAssignedChatById } from '../../utils/selectors';
import type { RootState } from '../../store/store';
import Modal from './Modal';
import useAgentChat from '../../hooks/useAgentChat';

const AgentChat = ({selectedTicketId}: {selectedTicketId: number | null}) => {
  /* Input state */
  const [newMessage, setNewMessage] = useState<string>("");
  /* Get selected ticket using supah cool selector */
  const selectedTicket = useSelector((state: RootState) => selectAssignedChatById(state.agent, selectedTicketId));
  /* Custom hook for agent chat logic */
  const {
    chatBodyRef,
    handleSendMessage,
    closeChat,
    handleUnassign,
    isUnassigning,
    unassignAgentFromTicketHandler,
    handleResolveChat,
    isResolving,
    resolveChatHandler,
    handleReopenTicket,
    isOpening,
    reopenTicketHandler,
    unassignModalId,
    closeTicketModalId,
    closeBtnId,
    reopenTicketModalId,
    closeOpenTicketBtnId
  } = useAgentChat(selectedTicketId, newMessage, setNewMessage);



  return (
    <div>
      {/* Placeholder for selected chat conversation */}
      <div className="flex flex-col items-start justify-start h-full p-4 mt-4-">
        {/* Placeholder for selected chat messages */}
        <div className="flex flex-col text-secondary w-full items-center">
          {/* Chat Body */}
          <div className=" bg-cyan-50 rounded-xl max-w-[90vw] w-6xl py-5 pb-2 relative" >
              {/* Title and name */}
              <div className="md:p-6 p-2 px-8 border-b border-gray-300 flex items-center gap-2 justify-between">
                <div className="text-sm text-gray-600 md:text-end text-nowrap ">
                  Número del usuario: 
                  <span className="font-medium text-gray-800 ml-1">
                    {selectedTicket?.chat_user_info?.phone_number || 'Desconocido'}
                  </span>
                  <div className='text-left'>
                    Status: <span className="font-medium text-gray-800">{
                      selectedTicket?.status.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                    }</span>
                  </div>
                </div>
                
                {/* Icons for look for message, and settings */}
                <div className="flex gap-2">
                  <RiSearchLine className="!w-5 md:!w-6 md:!h-5 text-indigo-700 hover:text-indigo-900 cursor-pointer" />
                  <div className="dropdown dropdown-bottom dropdown-end">
                    {/* unset all styles for this button */}
                    <div className=' !bg-[unset]' role='button' tabIndex={0} >
                      <RiSettingsLine className="!w-5 md:!w-6 md:!h-5 text-indigo-700 hover:text-indigo-900 cursor-pointer" />
                    </div>
                    <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                      <li onClick={selectedTicket?.status === 'closed' ? handleReopenTicket : handleResolveChat}>
                        <a>
                          {
                            selectedTicket?.status === 'closed' ? 'Reabrir Ticket' : 'Marcar como Resuelto'
                          }
                        </a>
                      </li>
                      <li onClick={handleUnassign}>
                        <a>
                          Desasignar
                        </a>
                      </li>
                    </ul>
                  </div>
                  <RiCloseLargeFill className="!w-5 md:!w-6 md:!h-5 text-gray-600 hover:text-gray-800 cursor-pointer hover:scale-105 transition" onClick={closeChat} />
                </div>
              </div>
              {/* Messages Area */}
              <div className="p-4 h-96 overflow-y-auto scroll-smooth" ref={chatBodyRef} >
                  <Messages
                    chatMessages={selectedTicket?.messages}
                    type={'agent'}
                  />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-300 w-full relative">
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                  placeholder="Escribe tu mensaje aquí..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      // Handle send message
                      handleSendMessage();
                    }
                  }}
                ></textarea>
                <div 
                  className="flex absolute top-[50%] translate-y-[-50%] right-10 cursor-pointer"
                  onClick={newMessage ? handleSendMessage : undefined}
                >
                    <BsSend className='text-2xl' />
                </div>
              </div>
              
          </div>
        </div>
      </div>
      <Modal 
        acceptFunction={unassignAgentFromTicketHandler} 
        isLoading={isUnassigning}
        type='info'
        message='¿Desear desasignarse del ticket y volver a la bandeja de entrada?'
        btnMessage='Desasignar'
        id={unassignModalId}
      />
      <Modal
        acceptFunction={resolveChatHandler}
        isLoading={isResolving}
        type='info'
        message='¿Desea marcar el ticket como resuelto y cerrarlo?'
        btnMessage='Cerrar Ticket'
        id={closeTicketModalId}
        closeBtnId={closeBtnId}
      />
      <Modal
        acceptFunction={reopenTicketHandler}
        isLoading={isOpening}
        type='info'
        message='¿Desea reabrir el ticket?'
        btnMessage='Reabrir Ticket'
        id={reopenTicketModalId}
        closeBtnId={closeOpenTicketBtnId}
      />
    </div>
  )
}

export default AgentChat