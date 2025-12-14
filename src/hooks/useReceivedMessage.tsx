import type { ReceivedChatMessage } from "../types/Slices";
import { useSelector } from "react-redux";
import { selectNotificationsArray } from "../utils/selectors";
import { formatDistance } from "date-fns";
import { es } from 'date-fns/locale';

const useReceivedMessage = ({
  chatMessage,
}:{
  chatMessage: ReceivedChatMessage
}) => {
  const filteredMessages = chatMessage?.messages?.filter(msg => msg.sender_type !== 'system') ?? [];
  const lastMessage = filteredMessages.length ? filteredMessages[filteredMessages.length - 1] : null;

  const notifications = useSelector(selectNotificationsArray);

  const isUnread = notifications?.some(n => n.chat_room_id === lastMessage.chat_room_id && !n.is_read);
  const timeStamp = lastMessage ? formatDistance(new Date(lastMessage.created_at), new Date(), { addSuffix: true, locale: es }) : '';

  return {
    isUnread,
    lastMessage,
    timeStamp
  }
}

export default useReceivedMessage