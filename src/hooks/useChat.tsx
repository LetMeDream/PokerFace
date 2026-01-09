import { useState, useRef, useEffect } from "react";
import { store } from "../store/store";
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
import { useCompleteChatMutation } from "../services/service";
declare const grecaptcha: any;
import { setGuestProfile } from "../store/slices/guest";
import { handleCompleteChatError } from "../utils/helpers";


type ChatMessage = {
  type: string;
  content: string;
};

const useChat = () => {
  const { isGuestChatOpen } = useSelector((state: RootState) => state.base);
  const { status } = useSelector((state: RootState) => state.guest);
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
    if (chatMessages.length > 0) {
      // console.log('saving messages to localStorage');
      // console.log('A punto de recordar mensajes')
      // console.log(chatMessages.length)
      dispatch(setGuestMessages(chatMessages));
    }
  }, [chatMessages, dispatch]);

  /* Seng Message */
  const [beep] = useSound(guest);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completeChat, { isSuccess: isChatCompleted, isError, error, data: completeChatData }] = useCompleteChatMutation();
  
  const send = async () => {
    /* Call to Initiate a Chat */
    if (status !== 'closed' && status !== 'resolved') {
      try {
        if (messageInput.trim() === "") return;
          if (chatMessages.length === 0 || !isUserconnected) {
              const data = await initiateChat({ initialMessage: messageInput }).unwrap();
              dispatch(setGuestSessionId(data.session_id));
              updateGuestChatAfterSend(chatMessages, messageInput); 
              beep()
              // * Perform call to complete the chat in here with recaptcha
              if (typeof grecaptcha !== 'undefined') {
                grecaptcha.ready(() => {
                  grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY_V3, { action: 'complete_chat' }).then(async (token: string) => {
                  await completeChat({
                    session_id: data.session_id,
                    phone_number: '00000000000',
                    recaptcha_token: token
                  }).unwrap()
                    setIsSubmitting(false);
                  });
                });
              }
              
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
    } else {
      toast('La conversación ha finalizado.', {
        icon: 'ℹ️',
      });
      setTimeout(() => {
        toast('Haga clic en "Iniciar nuevo chat" para continuar.', {
          icon: '💬',
        }); 
      }, 600);
    }


  }
  // State for handling logic for the animation form submition
  const [isSending, setIsSending] = useState(false);
  useEffect(() => {
      if (isChatCompleted) {
        setTimeout(() => {
          setIsSending(false); // reset animation state
          // console.log(completeChatData)
          // Ensure data exists and normalize shape to satisfy GuesstState
          if (!completeChatData) return;
          const resp: any = completeChatData;
          const user = resp.user_data ?? resp.user ?? {};
          dispatch(setGuestProfile({
            id: user.id,
            session_id: user.session_id,
            chatRoomId: user.chat_room_id,
            email: user.email,
            full_name: user.full_name,
            phone_number: user.phone_number,
            is_temporary: user.is_temporary ?? false,
            messages: resp.messages ?? [],
            isUserConected: true,
            created_at: user.created_at ?? new Date().toISOString(),
          }));
        }, 1000); // match animation duration
      } else if (isError) {
        setTimeout(() => {
          setIsSending(false); // reset animation state
          handleCompleteChatError(error);
        }, 1000);
      }
    }, [isChatCompleted, setIsSending, isError, error]);

  useEffect(() => {
    setTimeout(() => {
      if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, 100);
  }, [chatMessages]);



  const { isUserConected } = useSelector((state: RootState) => state.guest);

  const wsRef = useRef<WebSocket | null>(null);
  const { id: chat_room_id } = useSelector((state: any) => state.guest);
  
  /* Connect to WebSocket for guest chat, using chat_room_id */
  useEffect(() => {
    if (!chat_room_id || !isUserConected) return;
    const ws = new WebSocket(`ws://localhost:8000/ws/guest_chat_${chat_room_id}/`);
    wsRef.current = ws;

    ws.onopen = () => console.log('WebSocket abierto');
    ws.onmessage = (event) => {
      // Aquí manejas el mensaje recibido
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        data = { content: String(event.data) };
      }
      // Obtener el valor actualizado de messages directamente del store
      if (data.sender === 'agent') {
        const currentMessages = store.getState().guest.messages;
        const receivedMessage: ChatMessage = {
          type: 'agent',
          content: String(data.message.content ?? '')
        };
        dispatch(setGuestMessages([...currentMessages, receivedMessage]));
        console.log('Mensaje del AGENTE recibido:', event.data);
      } else {
        console.log('Mensaje desconocido recibido:', event.data);
      }

    };
    ws.onerror = (e) => console.error('WebSocket error', e);
    ws.onclose = () => console.log('WebSocket cerrado');

    return () => ws.close();
  }, [chat_room_id, dispatch, isUserConected]);



  const sendAndEmitMessage = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN || !isUserConected) {
      send()
    }
  }


  return {
    isOpen : isGuestChatOpen,
    toggleChat,
    classnames,
    messageInput,
    setMessageInput,
    chatMessages,
    send: sendAndEmitMessage,
    chatBodyRef,
    inputRef,
    bannerRef,
    isChatInitiationSuccess,
    setGuestMessages,
    isChatIniationLoading,
    isSending,
    setIsSending,
    isUserConected,
    isSubmitting
  }
}

export default useChat