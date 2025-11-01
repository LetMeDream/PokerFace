import {  useState, useRef } from 'react'
import Messages from '../liveChat/Messages/Messages';
import { RiSearchLine, RiSettingsLine, RiCloseLargeFill } from 'react-icons/ri';
import { BsSend } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { selectTicketById } from '../../utils/selectors';
import type { RootState } from '../../store/store';
import { addMessageToTicket, unsetSelectedTicket } from '../../store/slices/base';
import { useDispatch } from 'react-redux';

const AgentChat = ({selectedTicketId}: {selectedTicketId: string | null}) => {
  /* Input state */
  const [newMessage, setNewMessage] = useState<string>("");
  /* Get selected ticket using supah cool selector */
  const selectedTicket = useSelector((state: RootState) => 
    selectTicketById(state.base, selectedTicketId));

  /* Ref to scroll */
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const handleSendMessage = () => {
    dispatch(addMessageToTicket({
      chatRoomId: selectedTicketId,
      message: { type: 'agent', message_type: 'agent', content: newMessage }
    }));
    setNewMessage("");
    /* Scroll to bottom in chat body */
    setTimeout(() => {
    if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    }, 100);
  };

  const closeChat = () => {
    // Logic to close the chat (e.g., unset selected ticket)
    dispatch(unsetSelectedTicket());
  }

  return (
    <div>
      {/* Placeholder for selected chat conversation */}
      <div className="flex flex-col items-start justify-start h-full p-4 mt-4-
      ">
        {/* Placeholder for selected chat messages */}
        <div className="flex flex-col text-secondary w-full items-center">
          {/* Chat Body */}
          <div className=" bg-cyan-50 rounded-xl max-w-[90vw] w-6xl py-5 pb-2 relative" >
              {/* Title and name */}
              <div className="md:p-6 p-2 px-8 border-b border-gray-300 flex items-center gap-2 justify-between">
                <p className="text-sm text-gray-600 md:text-end text-nowrap">Nombre del usuario: 
                  <span className="font-medium text-gray-800 ml-1">
                  {selectedTicket?.nickname}
                  </span>
                </p>
                {/* Icons for look for message, and settings */}
                <div className="flex gap-2">
                  <RiSearchLine className="!w-5 md:!w-6 md:!h-5 text-indigo-700 hover:text-indigo-900 cursor-pointer" />
                  <RiSettingsLine className="!w-5 md:!w-6 md:!h-5 text-indigo-700 hover:text-indigo-900 cursor-pointer" />
                  <RiCloseLargeFill className="!w-5 md:!w-6 md:!h-5 text-gray-600 hover:text-gray-800 cursor-pointer hover:scale-105 transition" onClick={closeChat} />
                </div>
              </div>
              {/* Messages Area */}
              <div className="p-4 h-96 overflow-y-auto scroll-smooth" ref={chatBodyRef} >
                  <Messages
                    chatMessages={selectedTicket?.messages}
                    type='agent'
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

    </div>
  )
}

export default AgentChat