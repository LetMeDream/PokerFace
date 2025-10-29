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
      const adjustChatBody = () => {
        if (!isOpen) return;

        // Ajustar chat body height para mobile: 100% vh menos banner y input
        if (isMobile && chatBodyRef.current && bannerRef.current && inputRef.current) {
          const bannerHeight = bannerRef.current.offsetHeight;
          const inputHeight = inputRef.current.offsetHeight;
          // Use visualViewport when esté disponible (maneja barra/teclado en móvil)
          const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
          const chatBodyHeight = viewportHeight - bannerHeight - inputHeight;
          chatBodyRef.current.style.height = `${chatBodyHeight}px`;
        } else if (chatBodyRef.current) {
          // Reset a altura por defecto para non-mobile
          chatBodyRef.current.style.height = '450px';
        }
      };

      // Call once immediately
      adjustChatBody();

      const vp = window.visualViewport;
      if (vp) {
        vp.addEventListener('resize', adjustChatBody);
        vp.addEventListener('scroll', adjustChatBody);
      } else {
        window.addEventListener('resize', adjustChatBody);
        window.addEventListener('orientationchange', adjustChatBody);
      }

      return () => {
        if (vp) {
          vp.removeEventListener('resize', adjustChatBody);
          vp.removeEventListener('scroll', adjustChatBody);
        } else {
          window.removeEventListener('resize', adjustChatBody);
          window.removeEventListener('orientationchange', adjustChatBody);
        }
      };
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