import { useSelector } from 'react-redux';
import { reopenTicket, setHasAutoOpened, setSelectedTicketId } from '../store/slices/base';
import { useCloseTicketMutation, useOpenTicketMutation, useTakeChatMutation } from '../services/service';
import { useDeleteTicketMutation } from "../services/service";
import { deleteTicket, closeTicket } from '../store/slices/base';
import { useDispatch } from "react-redux";
import { selectFilteredUnassignedTickets } from '../utils/selectors';
import type { RootState } from '../store/store';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { setAssignedChats } from '../store/slices/agent';
import { useGetAssignedChatsQuery, useGetWaitingChatsQuery } from '../services/service';
import { setTickets } from '../store/slices/base';

const useGeneralInbox = () => {
  const dispatch = useDispatch();
  const { assigningTicketId } = useSelector((state: RootState) => state.base);
  const [ deleteTicketCallToApi, { isLoading: isDeleting } ] = useDeleteTicketMutation();
  const [inboxSearchValue, setInboxSearchValue] = useState<string>('');
  const filteredUnassignedTickets = useSelector((state: RootState) => selectFilteredUnassignedTickets(state.base, inboxSearchValue));
  const [ takeChat, { isLoading: isTakingChat } ] = useTakeChatMutation();
  const { refetch } = useGetAssignedChatsQuery(); // to keep assigned chats updated
  const { refetch: refetchWaitingChats } = useGetWaitingChatsQuery();

  const assignAndGo = async () => {
    // Dispatch action to assign agent to ticket
    // dispatch(assignTicketToAgent({ ticketId: assigningTicketId, agentChatId: agentId, agentName: `${first_name} ${last_name}` }));
    const result = await refetch();
    const data = (result as any)?.data;
    const waitingResult = await refetchWaitingChats();
    const waitingData = (waitingResult as any)?.data;
    if (data && data.chats) {
      // Update assigned chats in the store
      dispatch(setAssignedChats(data.chats));
    }
    if (waitingData && waitingData.chats) {
      // Update waiting chats in the store
      dispatch(setTickets(waitingData.chats));
    }
    // Close modal
    const closeModalButton = document.getElementById('close_modal') as HTMLButtonElement | null;
    if (closeModalButton) closeModalButton.click();
    // Navigate to chat view
    dispatch(setSelectedTicketId(assigningTicketId));
    dispatch(setHasAutoOpened(false));
  }  

  const handleAssign = async () => {
    try {
      await takeChat({ ticketId: assigningTicketId }).unwrap()
      assignAndGo();
    } catch (error: any) {
      console.error('Error assigning ticket:', error);
      toast.error(error?.data?.error || 'Error al asignar el ticket. Por favor, intenta de nuevo.');
      // Close modal
      const closeModalButton = document.getElementById('close_modal') as HTMLButtonElement | null;
      if (closeModalButton) closeModalButton.click();
    }
  }

  /* 
  * In order to re-use the Modal component for deleting tickets, we need to create a unique ID for the delete button within the modal.
  * as well as a unique modal ID.
  */
  const deleteModalId = 'delete_ticket_modal'
  const closeDeleteTicketBntId = `delete_ticket_btn_${assigningTicketId}`;
  const handleDelete = async () => {
    try {
      await deleteTicketCallToApi({ ticketId: assigningTicketId });
      dispatch(deleteTicket({ ticketId: assigningTicketId! }));
      // Close modal
      const closeModalButton = document.getElementById(closeDeleteTicketBntId) as HTMLButtonElement | null;
      if (closeModalButton) closeModalButton.click();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  }

  /* 
  * In order to re-use the Modal component for CLOSING tickets, we need to create a unique ID for the delete button within the modal.
  * as well as a unique modal ID.
  */
  const closeTicketModalId = 'close_ticket_modal'
  const closeCloseTicketBntId = `close_ticket_btn_${assigningTicketId}`;
  const [ closeTicketApiCall, { isLoading: isClosingTicket } ] = useCloseTicketMutation();
  const handleCloseTicket = async () => {
    try {
      await closeTicketApiCall({ ticketId: assigningTicketId });
      dispatch(closeTicket({ ticketId: assigningTicketId }));
      // Close modal
      const closeModalButton = document.getElementById(closeCloseTicketBntId) as HTMLButtonElement | null;
      if (closeModalButton) closeModalButton.click();
    } catch (error) {
      console.error('Error closing ticket:', error);
    }
  }

  /* 
  * In order to re-use the Modal component for REOPENING tickets, we need to create a unique ID for the delete button within the modal.
  * as well as a unique modal ID.
  */
  const reopenTicketModalId = 'reopen_ticket_modal'
  const closeReopenTicketBntId = `reopen_ticket_btn_${assigningTicketId}`;
  const [ reopenTicketApiCall, { isLoading: isReopeningTicket } ] = useOpenTicketMutation();
  const handleReopenTicket = async () => {
    try {
      await reopenTicketApiCall({ ticketId: assigningTicketId });
      dispatch(reopenTicket({ ticketId: assigningTicketId }));
      // Close modal
      const closeModalButton = document.getElementById(closeReopenTicketBntId) as HTMLButtonElement | null;
      if (closeModalButton) closeModalButton.click();
    } catch (error) {
      console.error('Error reopening ticket:', error);
    }
  }



  return {
    isTakingChat,
    handleAssign,
    deleteModalId,
    handleDelete,
    isDeleting,
    closeDeleteTicketBntId,
    inboxSearchValue,
    setInboxSearchValue,
    filteredUnassignedTickets,
    closeTicketModalId,
    handleCloseTicket,
    isClosingTicket,
    closeCloseTicketBntId,
    reopenTicketModalId,
    handleReopenTicket,
    isReopeningTicket,
    closeReopenTicketBntId
  }
}

export default useGeneralInbox
