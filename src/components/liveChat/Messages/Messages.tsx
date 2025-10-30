import type { FC } from "react";
import { guestMessage, agentMessage } from "../../../constants/chat";
import type { MessagesProps } from "../../../types/Chat";
import ContactForm from "../ContactForm/ContactForm";

// helper: comprueba existencia (no confundir con truthy/falsy)
// devuelve true si el valor NO es null ni undefined
const exists = <T,>(value: T | null | undefined): value is T => value !== null && value !== undefined;

const Messages: FC<MessagesProps> = ({
  chatMessages,
  isSending,
  setIsSending,
  setIsUserConected,
  isUserConected,
  chatBodyRef,
  type = 'guest'
}) => {
  const guestPropertiesExist = [isSending, setIsSending, setIsUserConected, isUserConected, chatBodyRef].every(exists);
  if (type === 'guest' && guestPropertiesExist) {
    // * Messages for the Guest user, in the Landing Page chat widget
    return (
      <>
        {chatMessages.map((msg, index) => (
            <div 
              key={index}
            >
              {/* Guest messages */}
              {msg.type === 'guest' ? guestMessage(msg.content) : null}
  
              {/* Agent messages */}
              {msg.type === 'agent' ? agentMessage(msg.content) : null}
  
              {/* New Customer form */}
              {msg.type === 'contactForm' ? (
                <ContactForm
                  isSending={isSending!}
                  setIsSending={setIsSending!}
                  setIsUserConected={setIsUserConected!}
                  isUserConected={isUserConected!}
                  chatBodyRef={chatBodyRef!}
                />
              ) : null}
            </div>
        ))}
      </>
    )
  }
  if (type === 'agent') {
    // * Messages for the Agent user, in the Dashboard chat conversation
    return (
      <>
        {chatMessages.map((msg, index) => (
            <div 
              key={index}
            >
              {/* Guest messages */}
              {msg.message_type === 'guest' ? guestMessage(msg.content) : null}
              {/* Agent messages */}
              {msg.message_type === 'agent' ? agentMessage(msg.content) : null}
            </div>
        ))}
      </>
    )
  }
  return null;
}

export default Messages