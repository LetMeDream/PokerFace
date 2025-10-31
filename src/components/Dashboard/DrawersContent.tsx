import React, { useEffect, useRef, useState } from 'react'
import Header from './Header';
import Messages from '../liveChat/Messages/Messages';
import type { ChatMessage, ChatTicket } from '../../types/Slices';
import { RiSearchLine, RiSettingsLine } from 'react-icons/ri';
import { BsSend } from "react-icons/bs";
import { useSelector } from 'react-redux';
/* We NORMALIZED tickets in our store, so now we need to SELECT them properly */
import { selectTicketsArray } from '../../utils/helpers';
import type { RootState } from '../../store/store';

const DrawersContent = ({classnames, containerRef, selectedTicket, drawerButtonRef}: {
  classnames: { container: string; drawerBtn: string };
  containerRef: React.RefObject<HTMLDivElement | null>;
  selectedTicket: any;
  drawerButtonRef: React.RefObject<HTMLLabelElement | null>; 
}) => {
  const tickets = useSelector((state: RootState) => selectTicketsArray(state.base));
  const ticketsQty = tickets.length;

  return (
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
                <div className="flex flex-col items-center justify-center h-full pt-6 text-white">
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
  )
}

export default DrawersContent

/* Agent Chat */
function AgentChat ({selectedTicket}: {selectedTicket: ChatTicket}) {
  /* Input state */
  const [newMessage, setNewMessage] = useState<string>("");
  

  /* Logic for Messages, to be changed */
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  useEffect(() => {
    setMessages(selectedTicket.messages);
  }, [selectedTicket]);



  /* Ref to scroll */
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const handleSendMessage = () => {
    setMessages(prevMessages => [...prevMessages, { type: 'agent', message_type: 'agent', content: newMessage }]);
    setNewMessage("");
    /* Scroll to bottom in chat body */
    setTimeout(() => {
      if (chatBodyRef.current) {
          chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, 100);
    };

  return (
    <div>
      {/* Placeholder for selected chat conversation */}
      <div className="flex flex-col items-start justify-start h-full p-4">
        {/* Placeholder for selected chat messages */}
        <div className="flex flex-col text-secondary w-full items-center">
          {/* Chat Body */}
          <div className=" bg-cyan-50 rounded-xl max-w-[90vw] w-6xl py-5 pb-2" >
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
              <div className="p-4 h-96 overflow-y-auto scroll-smooth" ref={chatBodyRef} >
                  <Messages
                    chatMessages={messages}
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