import { RiMessage2Line, RiCloseLine } from "react-icons/ri";
import useChat from "../../hooks/useChat";

const Chat = () => {
  const { isOpen, toggleChat, agentMessage, guestMessage } = useChat();

  const classnames = {
    // 'overflow-hidden' is crucial so the chat body is hidden when collapsed
    widgetWrapper: 'fixed rounded-tl text-sm bottom-0 left-10 max-w-[80vw] w-[310px] caret-transparent overflow-hidden',
    // Base classes for the chat body; includes height/opacity transitions
    chatBody: 'bg-white h-[450px] shadow-lg flex flex-col transition-all duration-300 ease-in-out',
    // Clickable banner at the top
    banner: 'bg-gray-500 text-primary montserrat regular px-3 py-2 cursor-pointer flex items-center justify-between gap-2'
  };

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
          {guestMessage("Hi there! I need some help.")}
          {agentMessage("Hello! How can I help you?")}
          {guestMessage("I love the website!")}
        </div>
          
        
        {/* Input */}
        <div className="border-t p-3 bg-white flex-shrink-0 caret-amber-400">
          <input 
            type="text" 
            placeholder="Type here" 
            className="w-full p-2 border rounded-md text-black"
          />
        </div>

      </div>
    </div>
  );
};




export default Chat;