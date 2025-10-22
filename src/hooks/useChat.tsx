import { useState, useRef } from "react";
import useSound from "use-sound";
import turun from '../assets/turun .mp3'
// import { messages } from "../constants/chat";

type ChatMessage = {
  type: string;
  content: string;
};

const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const classnames = {
    // 'overflow-hidden' is crucial so the chat body is hidden when collapsed
    widgetWrapper: 'fixed rounded-tl rounded-tr-3xl text-sm bottom-0 left-10 max-w-[80vw] max-w-[310px] w-[310px] caret-transparent overflow-hidden !caret-transparent',
    // Base classes for the chat body; includes height/opacity transitions
    chatBody: 'bg-white h-[450px] shadow-lg flex flex-col transition-all duration-300 ease-in-out ',
    // Clickable banner at the top
    banner: 'bg-primary text-secondary montserrat regular px-3 py-2 cursor-pointer flex items-center justify-between gap-2'
  };


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  /* Message for Service Agent */
  const agentMessage = (message: string) => (<>
    <div className="flex items-start gap-2.5 mb-4 ">
      <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0" title="Guest"></div>

      <div className="flex flex-col gap-1">
        <div className="bg-gray-100 p-2 rounded-lg max-w-[160px] break-words">
          <p className="text-sm text-gray-700 max-w-[160px]">{message}</p>
        </div>
      </div>
    </div>

  </>)

  /* Message for visitor */
  const guestMessage = (message: string) => (<>
    <div className="flex justify-end gap-2.5 mb-4 ">
      <div className="flex flex-col gap-1">
        <div className="bg-green-500 text-white p-2 rounded-lg max-w-[160px] break-words">
            <p className="text-sm max-w-[160px]">{message}</p>
        </div>

      </div>
      
      <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" title="Dev"></div>
    </div>
  </>)

  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(/* messages */[]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  
  /* Seng Message */
  const [beep] = useSound(turun);
  const send = () => {
    if (messageInput.trim() === "") return;
    console.log(messageInput)
    setChatMessages([...chatMessages, { type: 'guest', content: messageInput }]);
    setMessageInput("");  
    beep()
    // Scroll to bottom after sending a message
    setTimeout(() => {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      } 
    }, 200);
  }


  return {
    isOpen,
    toggleChat,
    agentMessage,
    guestMessage,
    classnames,
    messageInput,
    setMessageInput,
    chatMessages,
    setChatMessages,
    send,
    chatBodyRef
  }
}

export default useChat