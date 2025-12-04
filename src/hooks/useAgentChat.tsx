import { useEffect, useRef } from 'react'
import { useDispatch,  } from 'react-redux';
import { useAgentSendMessageMutation, useUnassignAgentMutation, useResolveChatMutation, useGetAssignedChatsQuery, useGetWaitingChatsQuery } from '../services/service';
import { setAssignedChats } from '../store/slices/agent';
import { setTickets } from '../store/slices/base';
import { unsetSelectedTicketId } from '../store/slices/base';
import toast from 'react-hot-toast';
import { useRefetchMyChat } from './useRefetch';

const useAgentChat = (selectedTicketId: string | null, newMessage: string, setNewMessage: (message: string) => void) => {
    /* Ref to scroll */
    const chatBodyRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();

    useRefetchMyChat();

    /* To scroll to bottom of chat upong accesing it */
    useEffect(() => {
      setTimeout(() => {
        // Scroll to bottom in chat body when selectedTicketId changes
        if (chatBodyRef.current) {
          chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
      }, 300);
    }, [selectedTicketId]);
  
    // * AGENT SEND MESSAGE
    const [agentSendMessage] = useAgentSendMessageMutation();
    const handleSendMessage = async () => {
      try {
        /* dispatch(addMessageToTicket({
          chatRoomId: selectedTicketId,
          message: { type: 'agent', message_type: 'agent', content: newMessage }
        })); */
        await agentSendMessage({ chatRoomId: selectedTicketId, payload: { content: newMessage, message_type: 'text' } }).unwrap();
        // * The 'refetch' is magical here, it updates the assigned chats after sending a message
        const result = await refetchAssignedChats();
        const data = (result as any)?.data;
        if (data && data.chats) {
          // Update assigned chats in the store
          dispatch(setAssignedChats(data.chats));
        }

        setNewMessage("");
        /* Scroll to bottom in chat body */
        setTimeout(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
          }
        }, 100);
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error('Error enviando el mensaje. Por favor, inténtelo de nuevo.');
      }
    };
  
    const closeChat = () => {
      // Logic to close the chat (e.g., unset selected ticket)
      dispatch(unsetSelectedTicketId());
    }
  
    // * Unassigning Ticket Logic
    const unassignModalId = 'unassign_ticket_modal'
    /* const handleUnassign = () => {
      const dialog = document.getElementById(unassignModalId) as HTMLDialogElement | null;
      if (dialog) dialog.showModal();
    } */
  
    const [unassignAgent, { isLoading: isUnassigning }] = useUnassignAgentMutation();
    const { refetch: refetchWaitingChats } = useGetWaitingChatsQuery(/* undefined, { 
      pollingInterval: 5000,
      refetchOnMountOrArgChange: true,
      skip: selectedTicketIdFromStore !== null,
      skipPollingIfUnfocused: true
    } */);
    const unassignAgentFromTicketHandler = async () => {
      try {
        if (selectedTicketId) {
          await unassignAgent({ ticketId: selectedTicketId }).unwrap();
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
        const dialog = document.getElementById(unassignModalId) as HTMLDialogElement | null;
        if (dialog) dialog.close();
      }
  
   
    }
  
    // * RESOLVE CHAT Logic
    const closeTicketModalId = 'close_ticket_modal'
    const handleResolveChat = () => {
      const dialog = document.getElementById(closeTicketModalId) as HTMLDialogElement | null;
      if (dialog) dialog.showModal();
    }
  
    const closeBtnId = 'close_ticket_btn'
    const [resolveChatMutation, { isLoading: isResolving }] = useResolveChatMutation();
    const { data: assignedChatsData, refetch: refetchAssignedChats } = useGetAssignedChatsQuery<any>(undefined, { 
      pollingInterval: 5000,
      refetchOnMountOrArgChange: true
    });
    const resolveChatHandler = async () => {
      try {
        if (selectedTicketId) {
          await resolveChatMutation({ ticketId: selectedTicketId }).unwrap();
          dispatch(unsetSelectedTicketId());
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
        const closeBtn = document.getElementById(closeBtnId) as HTMLButtonElement | null;
        if (closeBtn) closeBtn.click();
      }
  
    }
  
    // * Re-opening ticket logic
    const reopenTicketModalId = 'reopen_ticket_modal'
    const handleReopenTicket = () => {
      const dialog = document.getElementById(reopenTicketModalId) as HTMLDialogElement | null;
      if (dialog) dialog.showModal();
    }
  
    const closeOpenTicketBtnId = 'close_open_ticket_btn'

  
    const handleUnassign = () => {
      const dialog = document.getElementById(unassignModalId) as HTMLDialogElement | null;
      if (dialog) dialog.showModal();
    }

    /* Custom Hook  */
    useEffect(() => {
      setTimeout(() => {
        // Scroll to bottom in chat body when selectedTicketId changes
        if (chatBodyRef.current) {
          chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
      }, 150);
    }, [assignedChatsData]);

  return {
    chatBodyRef,
    handleSendMessage,
    closeChat,
    handleUnassign,
    isUnassigning,
    unassignAgentFromTicketHandler,
    handleResolveChat,
    isResolving,
    resolveChatHandler,
    handleReopenTicket,
    unassignModalId,
    closeTicketModalId,
    closeBtnId,
    reopenTicketModalId,
    closeOpenTicketBtnId
  }
}

export default useAgentChat