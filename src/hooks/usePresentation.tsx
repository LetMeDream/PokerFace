import { useEffect } from 'react'
// import { messages } from '../constants/chat';
import useSound from 'use-sound';
import agent from '../assets/sounds/agent.mp3'

interface PresentationProps {
  isOpen: boolean;
  setChatMessages: React.Dispatch<React.SetStateAction<{ type: string; content: string; }[]>>;
  chatMessages: { type: string; content: string; }[];
  isUserConected: boolean;
  setIsContactFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const usePresentation = ({
  isOpen,
  setChatMessages,
  chatMessages,
  isUserConected,
  setIsContactFormVisible
}: PresentationProps) => {
  const [ping] = useSound(agent);

  /* Reset chat whenever it closes */
  useEffect(() => {
    if (!isOpen) {
      setChatMessages([])
      setIsContactFormVisible(false);
    }
  }, [isOpen, setChatMessages, setIsContactFormVisible]);

  /* Update chat messages when new messages arrive */
  useEffect(() => {
    const timeout = chatMessages.length == 2 ? 4000 : 3000;
    setTimeout(() => {
      if (isUserConected) {
        if (chatMessages.length == 2) {
          ping();
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { type: 'agent', content: "Hola! ¿En qué puedo ayudarte hoy?" }
          ]);
        }
        if (chatMessages.length == 4) {
          ping();
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { type: 'agent', content: "Que bueno saberlo😊, estamos a la orden." }
          ]);
        } 
      }
    }, timeout);

  }, [chatMessages, setChatMessages, isUserConected]);

  /* No return here; Effect-full custom hook!! */
}

export default usePresentation