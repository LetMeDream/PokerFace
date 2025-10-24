import { useState, useEffect } from 'react'
import useMediaQuery from './useMediaQuery';

interface UseMobileChatProps {
  isOpen: boolean;
  toggleChat: () => void;
  bannerRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLDivElement | null>;
  chatBodyRef: React.RefObject<HTMLDivElement | null>;
}

const useMobileChat = ({
  isOpen,
  toggleChat,
  bannerRef,
  inputRef,
  chatBodyRef
} : UseMobileChatProps) => {
    const isMobile = useMediaQuery('(max-width: 767px)');
  
    /* Adjusting Body Size to be fullscreen */
    useEffect(() => {
      if (isOpen) {
        console.log(bannerRef.current);
        console.log(inputRef.current);
        console.log(chatBodyRef.current);
        // Adjust chat body height for mobile, equal to 100% vh mins banner and input heights
        if (isMobile && chatBodyRef.current && bannerRef.current && inputRef.current) {
          const bannerHeight = bannerRef.current.offsetHeight;
          const inputHeight = inputRef.current.offsetHeight;
          const chatBodyHeight = window.innerHeight - bannerHeight - inputHeight;
          chatBodyRef.current.style.height = `${chatBodyHeight}px`;
        } else if (chatBodyRef.current) {
          // Reset to default height for non-mobile
          chatBodyRef.current.style.height = '450px'; 
        }
      }
    }, [isOpen, isMobile, bannerRef, inputRef, chatBodyRef]);
  
    const [isBannerHidden, setIsBannerHidden] = useState(isMobile);

    /* We display the chat, by showing the banner */
    const showBanner = () => {
      setIsBannerHidden(false);
    };
  
    /* Each time bannerShows, if it mobile, toggleChat (open it!!!) */
    useEffect(() => {
      if (isMobile && !isBannerHidden) {
        setTimeout(() => {
          toggleChat()
        }, 333);
      }
    }, [isBannerHidden]);
  
    /*  */
    const modifiedToggleChat = () => {
      if (isMobile) {
        setIsBannerHidden(!isBannerHidden);
      }
      toggleChat();
    };

  return { isBannerHidden, showBanner, modifiedToggleChat, isMobile }
}

export default useMobileChat