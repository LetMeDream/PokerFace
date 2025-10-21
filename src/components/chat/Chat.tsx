import { RiMessage2Line, RiCloseLine, RiSendPlane2Fill  } from "react-icons/ri";
import useChat from "../../hooks/useChat";
import { messages } from "../../constants/chat";
import { useState } from "react";

const Chat = () => {
  const { isOpen, toggleChat, agentMessage, guestMessage, classnames } = useChat();
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState(messages);

  const send = () => {
    if (messageInput.trim() === "") return;
    console.log(messageInput)
    setChatMessages([...chatMessages, { type: 'guest', content: messageInput }]);
    setMessageInput("");   
  }

  return (
    <div className={classnames.widgetWrapper}>
      
      <div 
        className={`
          ${classnames.banner}
          ${isOpen ? 'rounded-t-lg' : 'rounded-tl rounded-tr-[34px]'} 
        `}
        onClick={toggleChat} 
      >
        <div className="flex items-center gap-2">
          <RiMessage2Line className="text-2xl" />
          Send us a message
        </div>
        
        {isOpen && (
          <RiCloseLine className="text-2xl" />
        )}
      </div>

      {/* Chat body is always rendered; visibility is controlled via max-height and opacity */}
      <div className={`
        ${classnames.chatBody}
        ${isOpen ? 'max-h-[450px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
          
        {/* Content wrapper scrolls when the chat is open */}
        <div className="p-4 flex-grow overflow-y-auto text-black">
          {/* Date separator */}
          <p className="text-xs text-center text-gray-500 mb-2">Today</p>

          {/* Messages */}
          {chatMessages.map((msg, index) => (
            <div 
              key={index}
            >
              {msg.type === 'guest' ? guestMessage(msg.content) : agentMessage(msg.content)}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-3 bg-white flex-shrink-0 relative caret-transparent">
          <input 
            name='message'
            type="text" 
            placeholder="Type here" 
            className="w-full p-2 border rounded-md text-black caret-amber-400"
            value={messageInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                send();
              }
            }}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <RiSendPlane2Fill 
            onClick={send}
            onMouseDown={(e) => e.preventDefault()} /* prevent icon from stealing focus */
            className="text-lg text-black cursor-pointer !caret-transparent absolute right-6 top-1/2 transform -translate-y-1/2" 
          />
        </div>

      </div>
    </div>
  );
};





export default Chat;