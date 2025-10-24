import type { FC } from "react";
import { guestMessage, agentMessage } from "../../../constants/chat";
import type { MessagesProps } from "../../../types/Chat";
import ContactForm from "../ContactForm/ContactForm";

const Messages: FC<MessagesProps> = ({
  chatMessages,
  isSending,
  setIsSending,
  setIsUserConected,
  isUserConected,
  chatBodyRef
}) => {
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
                isSending={isSending}
                setIsSending={setIsSending}
                setIsUserConected={setIsUserConected}
                isUserConected={isUserConected}
                chatBodyRef={chatBodyRef}
              />
            ) : null}
          </div>
      ))}
    </>
  )
}

export default Messages