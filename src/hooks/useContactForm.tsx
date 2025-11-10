import { useState, useEffect } from "react";

interface ContactFormProps {
  chatMessages: { type: string; content: string; }[];
  chatBodyRef: React.RefObject<HTMLDivElement | null>;
  setChatMessages: React.Dispatch<React.SetStateAction<{ type: string; content: string; }[]>>;
  isChatInitiationSuccess?: boolean;
}

const useContactForm = ({ chatMessages, chatBodyRef, setChatMessages, isChatInitiationSuccess }: ContactFormProps) => {
  /* Variables used to handle the form for the 'register' logic */
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isUserConected, setIsUserConected] = useState(false);
  /* useEffect to show the Contact Form */
  useEffect(() => {
    if (chatMessages.length === 1 && isChatInitiationSuccess) {
      setTimeout(() => {
        // Scroll to bottom when contact form appears
        setChatMessages(prevMessages => [...prevMessages, { type: 'contactForm', content: '' }]);
        setTimeout(() => {
          if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
          }
        }, 10);

      }, 1300);
    }
  }, [chatMessages])

  

  /* State for handling logic for the animation form submition */
  const [isSending, setIsSending] = useState(false);


  return {
    isContactFormVisible,
    setIsContactFormVisible,
    isSending,
    setIsSending,
    isUserConected,
    setIsUserConected
  }
}

export default useContactForm