import { FaUserAstronaut } from "react-icons/fa6";
import type { ReceivedChatMessage } from '../../types/Slices';
import { formatDistance } from "date-fns";
import { es } from 'date-fns/locale';
import { useSelector } from "react-redux";
import { selectNotificationsArray } from "../../utils/selectors";

const ReceivedMessage = ({
  chatMessage,
  onClick
}: {
  chatMessage: ReceivedChatMessage
  onClick: () => void;
}) => {
  const filteredMessages = chatMessage?.messages?.filter(msg => msg.sender_type !== 'system') ?? [];
  const lastMessage = filteredMessages.length ? filteredMessages[filteredMessages.length - 1] : null;

  const notifications = useSelector(selectNotificationsArray);

  const isUnread = notifications?.some(n => n.chat_room_id === lastMessage.chat_room_id && !n.is_read);

  return (
    <li className={`flex-row items-center flex-nowrap group !rounded-sm border min-h-[80px] max-w-full ${isUnread ? 'border-orange-400 border-2' : ''}`} onClick={onClick}>
      {/* Avatar */}

      <div className="rounded-l-sm self-stretch flex justify-center group-hover:!bg-slate-600">
        <FaUserAstronaut className="text-white w-12 h-12" />
      </div>


      {/* Content */}
      <div className="content rounded-r-sm rounded-l-none flex flex-col overflow-hidden items-start grow group-hover:!bg-slate-600 relative -left-[0.75px] self-stretch">
        <a className="!text-primary">{chatMessage?.chat_user_info?.phone_number || 'Missing Phone Number'}</a>
        <span className="text-sm text-white break-words">{lastMessage?.content}</span>
        <span className="absolute bottom-0.5 text-gray-400 right-2 text-[10px] bg-secondary rounded-sm px-1">
          {lastMessage ? formatDistance(new Date(lastMessage.created_at), new Date(), { addSuffix: true, locale: es }) : ''}
        </span>
      </div>
    </li>
  )
}

export default ReceivedMessage