import { useEffect } from 'react'
// import { messages } from '../constants/chat';

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

  /* Reset chat whenever it closes */
  useEffect(() => {
    if (!isOpen) {
      setChatMessages([])
      setIsContactFormVisible(false);
    }
  }, [isOpen, setChatMessages, setIsContactFormVisible]);

  /* Update chat messages when new messages arrive */
  useEffect(() => {
    setTimeout(() => {
      if (isUserConected) {
        if (chatMessages.length == 1) {
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { type: 'agent', content: "Hola! ¿En qué puedo ayudarte hoy?" }
          ]);
        }
        if (chatMessages.length == 3) {
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { type: 'agent', content: "Que bueno saberlo😊, estamos a la orden." }
          ]);
        } 
      }
    }, 2000);

  }, [chatMessages, setChatMessages, isUserConected]);

  return {}
}

export default usePresentation