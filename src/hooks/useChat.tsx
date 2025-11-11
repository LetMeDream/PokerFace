import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import guest from '../assets/sounds/guest.mp3'
// import { messages } from "../constants/chat";
import { useInitiateChatMutation } from "../services/service";
import { useDispatch } from "react-redux";
import { setGuestSessionId } from "../store/slices/guest";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setGuestMessages } from "../store/slices/guest";
import { useGuestSendMessageMutation } from "../services/service";
import { selectGuestMessagePayload } from "../utils/selectors";
import toast from "react-hot-toast";

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

  const updateGuestChatAfterSend = (chatMessages: ChatMessage[], messageInput: string) => {
    setChatMessages([...chatMessages, { type: 'guest', content: messageInput }]);
    (document.activeElement as HTMLElement | null)?.blur();
    setMessageInput("");
  }

  const [messageInput, setMessageInput] = useState("");

  const previousChatMessages = useSelector((state: RootState) => state.guest.messages);
  const isUserconnected = useSelector((state: RootState) => state.guest.isUserConected);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(previousChatMessages || []);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [initiateChat, { isSuccess: isChatInitiationSuccess, isLoading: isChatIniationLoading }] = useInitiateChatMutation();
  const dispatch = useDispatch();
  const [guestSendMessage] = useGuestSendMessageMutation();
  const guestMessagePayload = useSelector((state: RootState) => selectGuestMessagePayload(state, messageInput));

  /* Load previous chat messages from localStorage on mount */
  useEffect(() => {
    if (previousChatMessages && previousChatMessages.length > 0 && chatMessages.length === 0) {
      setChatMessages(previousChatMessages);
    }
  }, [previousChatMessages, chatMessages.length]);

  // Store chat messages to localStorage whenever they change
  useEffect(() => {
    if (chatMessages.length > 4) {
      console.log('saving messages to localStorage');
      dispatch(setGuestMessages(chatMessages));
    }
  }, [chatMessages, dispatch]);

  /* Seng Message */
  const [beep] = useSound(guest);
  const send = async () => {
    /* Call to Initiate a Chat */
    try {
      if (messageInput.trim() === "") return;
        if (chatMessages.length === 0) {
            const data = await initiateChat({ initialMessage: messageInput }).unwrap();
            dispatch(setGuestSessionId(data.session_id));
            updateGuestChatAfterSend(chatMessages, messageInput); 
            beep()
            
        } else {
          if (isUserconnected) {
            await guestSendMessage(guestMessagePayload).unwrap();
            updateGuestChatAfterSend(chatMessages, messageInput); 
            beep()
          }
        }
      } catch (error) {
        console.error("Error initiating chat:", error);
        toast.error("Error al enviar el mensaje. Por favor, inténtalo de nuevo.");
      }
    /* Should continue the chat here */
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
    bannerRef,
    isChatInitiationSuccess,
    setGuestMessages,
    isChatIniationLoading
  }
}

export default useChat