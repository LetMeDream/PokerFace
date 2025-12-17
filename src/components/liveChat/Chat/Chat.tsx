import { RiMessage2Line, RiCloseLine, RiSendPlane2Fill  } from "react-icons/ri";
import { IoArrowUpCircle } from "react-icons/io5";
import useChat from "../../../hooks/useChat";
import useMobileChat from "../../../hooks/useMobileChat";
import Messages from "../Messages/Messages";
import { FaEnvelope } from "react-icons/fa";
import { useRefetchGuestChatStatus } from "../../../hooks/useRefetch";
import "./Chat.css";
import { useEffect } from "react";

const Chat = () => {
  const { isOpen, toggleChat, classnames, messageInput, setMessageInput, chatMessages, send, chatBodyRef, inputRef, bannerRef, 
    isChatIniationLoading, isSending, setIsSending, isUserConected
   } = useChat();
  const { isBannerHidden, showBanner, modifiedToggleChat } = useMobileChat({ isOpen, toggleChat, bannerRef, inputRef, chatBodyRef });
  useRefetchGuestChatStatus();

  /* useEffect para bindear function a tecla Escape */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        toggleChat();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, toggleChat]);

  return (
    <>
      <div className={classnames.widgetWrapper}>
        
        <div 
          id="chat-banner"
          className={`
            ${classnames.banner} ${isBannerHidden ? 'hidden' : 'flex'} 
          `}
          onClick={ modifiedToggleChat } 
          ref={bannerRef}
        >
          <div className="flex items-center gap-2">
            <RiMessage2Line className="text-2xl" />
            Enviá un mensaje
          </div>
          
          {isOpen && (
            <RiCloseLine className="text-2xl" />
          )}
        </div>

        {/* Chat body is always rendered; visibility is controlled via max-height and opacity */}
        <div 
          className={`${classnames.chatBody} ${isOpen ? 'md:max-h-[450px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {/* Content wrapper scrolls when the chat is open */}
          <div 
            className="p-4 pb-0 px-2 flex-grow overflow-y-auto scroll-smooth text-black"         
            ref={chatBodyRef}
          >
            {/* Date separator */}
            <p className="text-xs text-center text-gray-500 mb-2">Hoy</p>

            {/* Messages */}
            <Messages
              chatMessages={chatMessages as any}
              isSending={isSending}
              setIsSending={setIsSending}
              chatBodyRef={chatBodyRef}
            />

          </div>

          {/* Input */}
          <div className="border-t p-3 bg-white flex-shrink-0 relative caret-transparent"
            ref={inputRef}
          >
            <textarea 
              autoComplete="off"
              name='message'
              placeholder="Escribí aquí tu mensaje..." 
              className={`w-full p-2 border rounded-md text-black ${!isUserConected ? 'caret-transparent' : 'caret-amber-400'} break-word overflow-clip pr-8`}
              value={messageInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (isChatIniationLoading) return; // prevent sending while initiating chat
                  e.preventDefault()
                  send();
                }
              }}
              onChange={(e) => setMessageInput(e.target.value)}
              disabled={chatMessages.some(message => message.type === 'contactForm') && !isUserConected}
            />
            <RiSendPlane2Fill 
              onClick={send}
              onMouseDown={(e) => e.preventDefault()} /* prevent icon from stealing focus */
              className={`
                text-lg text-black cursor-pointer !caret-transparent absolute right-6 top-1/2 translate-y-[-75%] block md:hidden
                ${(messageInput.length > 0) ? 'text-green-500 cursor-pointer' : ''}`
              }
            /> 
            <IoArrowUpCircle 
              onClick={messageInput.length > 0 ? send : undefined}
              onMouseDown={(e) => e.preventDefault()} /* prevent icon from stealing focus */
              className={`
                text-3xl text-black !caret-transparent absolute 
                right-5 top-1/2 translate-y-[-50%] hidden md:block transition 
                ${messageInput.length > 0 ? 'text-green-500 cursor-pointer' : 'text-gray-300'}
              `}
            />
          </div>

        </div>

      </div>
      <div className={`
        md:hidden fixed bottom-5 right-5 bg-gray-700 rounded-full p-5
        ${ isOpen ? 'hidden' : 'block' }
      `}
        id='open-chat-mobile-icon'
        onClick={showBanner} 
      >
        <FaEnvelope 
          className='text-2xl text-white  opacity-90 cursor-pointer'
        />

      </div>

    </>
  );
};

export default Chat;