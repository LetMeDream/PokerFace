import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useAgentSendMessageMutation, useUnassignAgentMutation, useResolveChatMutation, useOpenTicketMutation, useGetAssignedChatsQuery } from '../services/service';
import { reopenTicket } from '../store/slices/base';
import { setAssignedChats } from '../store/slices/agent';
import { unsetSelectedTicketId } from '../store/slices/base';
import toast from 'react-hot-toast';


const useAgentChat = (selectedTicketId: number | null, newMessage: string, setNewMessage: (message: string) => void) => {
    /* Ref to scroll */
    const chatBodyRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();

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
        const result = await refetch();
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
    const unassignAgentFromTicketHandler = async () => {
      try {
        if (selectedTicketId) {
          await unassignAgent({ ticketId: selectedTicketId }).unwrap();
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
    const { refetch } = useGetAssignedChatsQuery();
    const resolveChatHandler = async () => {
      try {
        if (selectedTicketId) {
          await resolveChatMutation({ ticketId: selectedTicketId }).unwrap();
          dispatch(unsetSelectedTicketId());
          const result = await refetch();
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
  
    const [openTicketMutation, { isLoading: isOpening }] = useOpenTicketMutation();
    const closeOpenTicketBtnId = 'close_open_ticket_btn'
    const reopenTicketHandler = async () => {
      try {
        if (selectedTicketId) {
          await openTicketMutation({ ticketId: selectedTicketId }).unwrap();
          dispatch(reopenTicket({ ticketId: selectedTicketId }));
        }
        const closeBtn = document.getElementById(closeOpenTicketBtnId) as HTMLButtonElement | null;
        if (closeBtn) closeBtn.click();
  
      } catch (error) {
        console.error('Error reabriendo el ticket:', error);
      }
    }
  
    const handleUnassign = () => {
      const dialog = document.getElementById(unassignModalId) as HTMLDialogElement | null;
      if (dialog) dialog.showModal();
    }


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
    isOpening,
    reopenTicketHandler,
    unassignModalId,
    closeTicketModalId,
    closeBtnId,
    reopenTicketModalId,
    closeOpenTicketBtnId
  }
}

export default useAgentChat