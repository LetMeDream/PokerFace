import { FaUserAstronaut } from "react-icons/fa6";
import type { ReceivedChatMessage } from '../../types/Slices';
import { AiOutlineCheckCircle, AiOutlineUserDelete } from "react-icons/ai";
import { useReceivedMessage, useUnassignAgent, useResolveAgent } from "../../hooks/useReceivedMessage";
import Modal from "./Modal";


const ReceivedMessage = ({
  chatMessage,
  onClick
}: {
  chatMessage: ReceivedChatMessage
  onClick: () => void;
}) => {
  const { isUnread, lastMessage, timeStamp } = useReceivedMessage({ chatMessage });
  
  // Unassign Agent Hook
  const { handleShowUnassignTicketModal, unassignTicketModalId, closeBtnId, unassignAgentFromTicketHandler, isUnassigning } = useUnassignAgent({ chatMessage });

  // Resolve Chat Hook
  const { handleShowResolveTicketModal, resolveTicketModalId, closeTicketModalId, isResolving, resolveChatHandler } = useResolveAgent({ chatMessage });


  return (
    <>
      <li className={`flex-row items-center flex-nowrap group !rounded-sm border min-h-[80px] md:min-w-[240px]! max-w-full ${isUnread ? 'border-orange-400 border-2' : ''}`} onClick={onClick}>
        {/* Avatar */}

        <div className="rounded-l-sm self-stretch flex justify-center group-hover:!bg-slate-600">
          <FaUserAstronaut className="text-white w-12 h-12" />
        </div>


        {/* Content */}
        <div className="content rounded-r-sm rounded-l-none flex flex-col overflow-hidden items-start grow group-hover:!bg-slate-600 relative -left-[0.75px] self-stretch">
          <a className="!text-primary text-xs ">{chatMessage?.chat_user_info?.phone_number || 'Missing Phone Number'}</a>
          <span className="text-sm text-white break-words">{lastMessage?.content}</span>
          <span className="absolute bottom-0.5 text-gray-400 right-2 text-[10px] bg-secondary rounded-sm px-1">
            {timeStamp}
          </span>
          <div 
            className="flex absolute top-2 right-2 group opacity-0 group-hover:opacity-100 gap-0.5 bg-secondary rounded-sm p-0.5"
            onClick={(event) => {
              // stop bubbling to parent onClick
              event?.stopPropagation();
            }}
          >
            <AiOutlineCheckCircle 
              className="  text-gray-400 w-[18px] h-[18px] hover:text-green-500/70 cursor-pointer transition-colors" 
              title="Marcar Chat como Resuelto"  
              onClick={handleShowResolveTicketModal}
            />
            <AiOutlineUserDelete 
              className=" text-gray-400 w-[18px] h-[18px] hover:text-red-500/70 cursor-pointer transition-colors" 
              title="Desasignar Agente del Chat"  
              onClick={handleShowUnassignTicketModal}
            />
          </div>
        </div>
      </li>
      {/* Unassign Modal */}
      <Modal
        acceptFunction={unassignAgentFromTicketHandler}
        isLoading={isUnassigning}
        type='info'
        message='¿Desea desasignarse del ticket y volver a la bandeja de entrada?'
        btnMessage='Desasignar'
        id={unassignTicketModalId}
        closeBtnId={closeBtnId}
      />
      {/* Resolve Modal */}
      <Modal
        acceptFunction={resolveChatHandler}
        isLoading={isResolving}
        type='info'
        message='¿Desea marcar el ticket como resuelto y cerrarlo?'
        btnMessage='Marcar como Resuelto'
        id={resolveTicketModalId}
        closeBtnId={closeTicketModalId}
      />
    </>
  )
}

export default ReceivedMessage