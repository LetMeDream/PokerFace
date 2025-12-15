import type { ReceivedChatMessage } from "../types/Slices";
import { useSelector } from "react-redux";
import { selectNotificationsArray } from "../utils/selectors";
import { formatDistance } from "date-fns";
import { es } from 'date-fns/locale';
import { useUnassignAgentMutation, useGetAssignedChatsQuery, useGetWaitingChatsQuery, useResolveChatMutation } from "../services/service";
import { useDispatch } from "react-redux";
import { setAssignedChats } from "../store/slices/agent";
import { setTickets, unsetSelectedTicketId } from "../store/slices/base";
import { toast } from "react-hot-toast";

export const useReceivedMessage = ({
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

// * Hook for handling logic for 'Unassigning' Agent 
export const useUnassignAgent = ({
  chatMessage,
}:{
  chatMessage: ReceivedChatMessage
}) => {

  const handleShowUnassignTicketModal = () => {
    const dialog = document.getElementById(unassignTicketModalId) as HTMLDialogElement | null;
    if (dialog) dialog.showModal();
  }

  const unassignTicketModalId = `unassign_ticket_modal_${chatMessage.id}`;
  const closeBtnId = `unassign_ticket_close_btn_${chatMessage.id}`;

  const [unassignAgent, { isLoading: isUnassigning }] = useUnassignAgentMutation();
  const { refetch: refetchAssignedChats } = useGetAssignedChatsQuery()
  const { refetch: refetchWaitingChats } = useGetWaitingChatsQuery();
  
  const dispatch = useDispatch();
  const unassignAgentFromTicketHandler = async () => {
    try {
      if (chatMessage) {
        await unassignAgent({ ticketId: chatMessage.id }).unwrap();
        const assignedChatsResults = await refetchAssignedChats();
        const data = (assignedChatsResults as any)?.data;
        if (data && data.chats) {
          // Update assigned chats in the store
          dispatch(setAssignedChats(data.chats));
        }
        const waitingChatsResults = await refetchWaitingChats();
        const waitingData = (waitingChatsResults as any)?.data;
        if (waitingData && waitingData.chats) {
          // Update waiting chats in the store
          dispatch(setTickets(waitingData.chats));
        }

        dispatch(unsetSelectedTicketId());
      }
    } catch (error) {
      console.error('Error desasignando el ticket:', error);
      toast.error('Error desasignando el ticket. Por favor, inténtelo de nuevo.');
    } finally {
      const dialog = document.getElementById(unassignTicketModalId) as HTMLDialogElement | null;
      if (dialog) dialog.close();
    }

  
  }

  return {
    handleShowUnassignTicketModal,
    unassignTicketModalId,
    closeBtnId,
    isUnassigning,
    unassignAgentFromTicketHandler
  }
}

// * Hook for handling logic for 'Resolving' Agent 
export const useResolveAgent = ({
  chatMessage,
}:{
  chatMessage: ReceivedChatMessage
}) => {

  const dispatch = useDispatch();
  const resolveTicketModalId = `close_ticket_modal_${chatMessage.id}`;
  const closeTicketModalId = `close_ticket_close_btn_${chatMessage.id}`;
  // Show Resolve Ticket Modal
  const handleShowResolveTicketModal = () => {
    const dialog = document.getElementById(resolveTicketModalId) as HTMLDialogElement | null;
    if (dialog) dialog.showModal();
  }
  const [resolveChatMutation, { isLoading: isResolving }] = useResolveChatMutation();
  const { refetch: refetchAssignedChats } = useGetAssignedChatsQuery()
  const resolveChatHandler = async () => {
    try {
      if (chatMessage) {
        await resolveChatMutation({ ticketId: chatMessage.id }).unwrap();
        const result = await refetchAssignedChats();
          const data = (result as any)?.data;
          if (data && data.chats) {
            // Update assigned chats in the store
            dispatch(setAssignedChats(data.chats));
          }
      }
    } catch (error) {
      console.error('Error resolviendo el ticket:', error);
      toast.error('Error resolviendo el ticket. Por favor, inténtelo de nuevo.');    
    } finally {
      const dialog = document.getElementById(resolveTicketModalId) as HTMLDialogElement | null;
      if (dialog) dialog.close();
    }
  }



  return {
    resolveTicketModalId,
    closeTicketModalId,
    handleShowResolveTicketModal,
    isResolving,
    resolveChatHandler
  }
}