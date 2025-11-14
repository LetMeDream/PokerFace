import { useState, useEffect } from "react";
interface ContactFormProps {
  chatMessages: { type: string; content: string; }[];
  chatBodyRef: React.RefObject<HTMLDivElement | null>;
  isChatInitiationSuccess?: boolean;
}
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setIsUserConected } from "../store/slices/guest";
import { setGuestMessages } from "../store/slices/guest";
import { useDispatch } from "react-redux";

const useContactForm = ({ chatBodyRef, isChatInitiationSuccess }: ContactFormProps) => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((state: RootState) => state.guest.messages);
  
  /* Variables used to handle the form for the 'register' logic */
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const { isUserConected } = useSelector((state: RootState) => state.guest);
  // const [isUserConected, setIsUserConected] = useState(false);
  /* useEffect to show the Contact Form */
  useEffect(() => {
    if (chatMessages.length === 1 && isChatInitiationSuccess) {
      setTimeout(() => {
        // Scroll to bottom when contact form appears
        dispatch(setGuestMessages([...chatMessages, { type: 'contactForm', content: '' }]));
        setTimeout(() => {
          if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
          }
        }, 10);

      }, 1300);
    }
  }, [chatMessages, dispatch])

  

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