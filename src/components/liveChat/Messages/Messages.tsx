import type { FC } from "react";
import { guestMessage, agentMessage } from "../../../constants/chat";
import type { MessagesProps } from "../../../types/Chat";
import ContactForm from "../ContactForm/ContactForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/auth";
import { clearUser } from "../../../store/slices/user";
import { unsetChatProfile } from "../../../store/slices/agent";
import { unsetBase } from "../../../store/slices/base";
import { unsetGuest } from "../../../store/slices/guest";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";

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
  const guestStatus = useSelector((state: any) => state.guest.status);
  const dispatch = useDispatch();

  const resetRedux = () => {
    dispatch(logout())
    dispatch(clearUser())
    dispatch(unsetChatProfile())
    dispatch(unsetBase())
    dispatch(unsetGuest())
  }

  if (type === 'guest' && guestPropertiesExist) {
    // * Messages for the Guest user, in the Landing Page chat widget
    return (
      <>
        {chatMessages.map((msg, index) => (
          <>
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
            {/*  */}
            {index === chatMessages.length - 1 && (guestStatus === 'closed') && (
              <div className="text-center text-sm text-gray-500 mt-2 mb-4">
                <p className="mb-2">
                  La conversación ha finalizado. Si deseas continuar, por favor inicia un nuevo chat.
                </p>
                <button className="border! border-gray-300! hover:border-gray-500! hover:text-black!" onClick={resetRedux}>
                  Iniciar nuevo chat
                </button>
              </div>
            )}
            {index === chatMessages.length - 1 && (guestStatus === 'resolved') && (
              <div className="text-center text-sm text-gray-500 mt-2 mb-4">
                <p className="mb-2">
                  La conversación ha sido marcada como <span className="text-secondary">Resuelta</span>. Si deseas continuar, por favor inicia un nuevo chat.
                </p>
                <button className="border! border-gray-300! hover:border-gray-500! hover:text-black!" onClick={resetRedux}>
                  Iniciar nuevo chat
                </button>
              </div>
            )}
          </>
              
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
              title={formatDistance(new Date(msg.created_at || new Date()), new Date(), { addSuffix: true, locale: es })}
            >
              {/* Guest messages */}
              {msg.sender_type === 'user' ? guestMessage(msg.content, msg.created_at) : null}
              {/* Agent messages */}
              {(msg.sender_type === 'system' || msg.sender_type === 'agent') ? agentMessage(msg.content, msg.created_at) : null}
            </div>
        ))}
      </>
    )
  }
  return null;
}

export default Messages