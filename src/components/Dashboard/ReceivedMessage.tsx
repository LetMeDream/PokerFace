import { FaUserAstronaut } from "react-icons/fa6";
import type { ReceivedChatMessage } from '../../types/Slices';

const ReceivedMessage = ({
  chatMessage,
  onClick
}: {
  chatMessage: ReceivedChatMessage
  onClick: () => void;
}) => {
  const filteredMessages = chatMessage?.messages?.filter(msg => msg.sender_type !== 'system') ?? [];
  const lastMessage = filteredMessages.length ? filteredMessages[filteredMessages.length - 1] : null;

  return (
    <li className="flex-row items-center flex-nowrap group !rounded-sm border min-h-[80px] max-w-full" onClick={onClick}>
      {/* Avatar */}

      <div className="rounded-l-sm self-stretch flex justify-center group-hover:!bg-slate-600">
        <FaUserAstronaut className="text-white w-12 h-12" />
      </div>


      {/* Content */}
      <div className="content rounded-r-sm rounded-l-none flex flex-col overflow-hidden items-start grow group-hover:!bg-slate-600 relative -left-[0.75px] self-stretch">
        <a className="!text-primary">{chatMessage?.chat_user_info?.phone_number || 'Missing Phone Number'}</a>
        <span className="text-sm text-white break-words">{lastMessage?.content}</span>
      </div>
    </li>
  )
}

export default ReceivedMessage