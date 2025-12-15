import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import guest from '../assets/sounds/guest.mp3'
// import { messages } from "../constants/chat";
import { useInitiateChatMutation } from "../services/service";
import { useDispatch } from "react-redux";
import { setGuestSessionId } from "../store/slices/guest";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useGuestSendMessageMutation } from "../services/service";
import { selectGuestMessagePayload } from "../utils/selectors";
import toast from "react-hot-toast";
import { setGuestMessages } from "../store/slices/guest";
import { setIsGuestChatOpen } from "../store/slices/base";

type ChatMessage = {
  type: string;
  content: string;
};

const useChat = () => {
  const { isGuestChatOpen } = useSelector((state: RootState) => state.base);
  const dispatch = useDispatch();

  const classnames = {
    // 'overflow-hidden' is crucial so the chat body is hidden when collapsed
    widgetWrapper: 'md:left-10 fixed text-sm bottom-0 w-[100dvw] md:max-w-[80vw] md:max-w-[310px] md:w-[310px] caret-transparent overflow-hidden !caret-transparent',
    // Base classes for the chat body; includes height/opacity transitions
    chatBody: 'bg-white md:h-[450px] shadow-lg flex flex-col transition-all duration-300 ease-in-out ',
    // Clickable banner at the top
    banner: 'bg-primary text-secondary md:rounded-tr-3xl montserrat regular px-3 py-2 cursor-pointer flex items-center justify-between gap-2 transition border! border-black!'
  };

  const toggleChat = () => {
    dispatch(setIsGuestChatOpen(!isGuestChatOpen));
  };

  /* Verify chat is closed on opening */
  useEffect(() => {
      dispatch(setIsGuestChatOpen(false));
  }, [])

  const updateGuestChatAfterSend = (chatMessages: ChatMessage[], messageInput: string) => {
    dispatch(setGuestMessages([...chatMessages, { type: 'guest', content: messageInput }]));
    (document.activeElement as HTMLElement | null)?.blur();
    setMessageInput("");
  }

  const [messageInput, setMessageInput] = useState("");

  // const previousChatMessages = useSelector((state: RootState) => state.guest.messages);
  const isUserconnected = useSelector((state: RootState) => state.guest.isUserConected);
  const chatMessages = useSelector((state: RootState) => state.guest.messages);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [initiateChat, { isSuccess: isChatInitiationSuccess, isLoading: isChatIniationLoading }] = useInitiateChatMutation();
  const [guestSendMessage] = useGuestSendMessageMutation();
  const guestMessagePayload = useSelector((state: RootState) => selectGuestMessagePayload(state, messageInput));


  // Store chat messages to localStorage whenever they change
  useEffect(() => {
    if (chatMessages.length > 4) {
      // console.log('saving messages to localStorage');
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
    isOpen : isGuestChatOpen,
    toggleChat,
    classnames,
    messageInput,
    setMessageInput,
    chatMessages,
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