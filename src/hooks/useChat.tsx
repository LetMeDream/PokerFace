import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import guest from '../assets/sounds/guest.mp3'
// import { messages } from "../constants/chat";

type ChatMessage = {
  type: string;
  content: string;
};

const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const classnames = {
    // 'overflow-hidden' is crucial so the chat body is hidden when collapsed
    widgetWrapper: 'md:left-10 fixed md:rounded-tr-3xl text-sm bottom-0 w-[100dvw] md:max-w-[80vw] md:max-w-[310px] md:w-[310px] caret-transparent overflow-hidden !caret-transparent',
    // Base classes for the chat body; includes height/opacity transitions
    chatBody: 'bg-white md:h-[450px] shadow-lg flex flex-col transition-all duration-300 ease-in-out ',
    // Clickable banner at the top
    banner: 'bg-primary text-secondary montserrat regular px-3 py-2 cursor-pointer flex items-center justify-between gap-2 transition'
  };


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(/* messages */[]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  
  /* Seng Message */
  const [beep] = useSound(guest);
  const send = () => {
    if (messageInput.trim() === "") return;
    setChatMessages([...chatMessages, { type: 'guest', content: messageInput }]);
    (document.activeElement as HTMLElement | null)?.blur(); // remove focus from input
    setMessageInput("");  
    beep()
  }

  useEffect(() => {
    setTimeout(() => {
      if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, 100);
  }, [chatMessages]);


  return {
    isOpen,
    toggleChat,
    classnames,
    messageInput,
    setMessageInput,
    chatMessages,
    setChatMessages,
    send,
    chatBodyRef,
    inputRef,
    bannerRef
  }
}

export default useChat