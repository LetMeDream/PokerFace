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
  chatBodyRef,
  type = 'guest'
}) => {
  const guestPropertiesExist = [isSending, setIsSending, chatBodyRef].every(exists);
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
                  chatBodyRef={chatBodyRef!}
                  setIsSending={setIsSending!}
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
        {chatMessages?.map((msg, index) => (
            <div 
              key={index}
            >
              {/* Guest messages */}
              {msg.sender_type === 'user' ? guestMessage(msg.content) : null}
              {/* Agent messages */}
              {msg.sender_type === 'system' ? agentMessage(msg.content) : null}
            </div>
        ))}
      </>
    )
  }
  return null;
}

export default Messages