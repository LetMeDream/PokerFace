import { RiMessage2Line, RiCloseLine, RiSendPlane2Fill  } from "react-icons/ri";
import useChat from "../../../hooks/useChat";
import usePresentation from "../../../hooks/usePresentation";
import useContactForm from "../../../hooks/useContactForm";
import ContactForm from "../ContactForm/ContactForm";

const Chat = () => {
  const { isOpen, toggleChat, agentMessage, guestMessage, classnames, messageInput, setMessageInput, chatMessages, send, chatBodyRef, setChatMessages} = useChat();
  const { isContactFormVisible, isUserConected, setIsContactFormVisible, isAnimating, setIsAnimating } = useContactForm({ chatMessages, chatBodyRef });
  usePresentation({ isOpen, setChatMessages, chatMessages, setIsContactFormVisible, isUserConected });

  return (
    <div className={classnames.widgetWrapper}>
      
      <div 
        className={`
          ${classnames.banner}
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
        `}
      >

        {/* Content wrapper scrolls when the chat is open */}
        <div 
          className="p-4 pb-0 px-2 flex-grow overflow-y-auto scroll-smooth text-black"         
          ref={chatBodyRef}
>
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

          {/* Contact Form Message */}
          {isContactFormVisible && (
            <ContactForm
              isAnimating={isAnimating}
              setIsAnimating={setIsAnimating}
            />
          )}
        </div>

        {/* Input */}
        <div className="border-t p-3 bg-white flex-shrink-0 relative caret-transparent">
          <textarea 
            autoComplete="off"
            name='message'
            placeholder="Type here" 
            className={`w-full p-2 border rounded-md text-black ${isContactFormVisible && !isUserConected ? 'caret-transparent' : 'caret-amber-400'} break-word overflow-clip pr-8`}
            value={messageInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                send();
              }
            }}
            onChange={(e) => setMessageInput(e.target.value)}
            // disabled={isContactFormVisible && !isUserConected}
          />
          <RiSendPlane2Fill 
            onClick={send}
            onMouseDown={(e) => e.preventDefault()} /* prevent icon from stealing focus */
            className="text-lg text-black cursor-pointer !caret-transparent absolute right-6 top-1/2 translate-y-[-75%]" 
          />
        </div>

      </div>
    </div>
  );
};





export default Chat;