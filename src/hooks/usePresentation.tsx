import { useEffect } from 'react'
// import { messages } from '../constants/chat';
import useSound from 'use-sound';
import agent from '../assets/sounds/agent.mp3'  
import { useDispatch } from 'react-redux';

interface PresentationProps {
  isOpen: boolean;
  chatMessages: { type: string; content: string; }[];
  isUserConected: boolean;
  setIsContactFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const usePresentation = ({
  chatMessages,
  isUserConected,
}: PresentationProps) => {
  const [ping] = useSound(agent);
  const dispatch = useDispatch();
  
  /* Update chat messages when new messages arrive */
  useEffect(() => {
    const timeout = chatMessages.length == 2 ? 5000 : 3000;
    setTimeout(() => {
      if (isUserConected) {
        /* if (chatMessages.length == 2) {
          ping();
          const newMessage = { type: 'agent', content: "Hola! ¿En qué puedo ayudarte hoy?" }
          dispatch(setGuestMessages([...chatMessages, newMessage]));

        } */
      }
    }, timeout);

  }, [chatMessages, isUserConected, dispatch, ping]);

  /* No return here; Effect-full custom hook!! */
}

export default usePresentation