import { useSelector } from 'react-redux';
import { setHasAutoOpened, setSelectedTicketId } from '../store/slices/base';
import { useCloseChatMutation, useTakeChatMutation } from '../services/service';
import { deleteTicket } from '../store/slices/base';
import { useDispatch } from "react-redux";
import { selectFilteredUnassignedTickets } from '../utils/selectors';
import type { RootState } from '../store/store';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { setAssignedChats } from '../store/slices/agent';
import { useGetAssignedChatsQuery, useGetWaitingChatsQuery } from '../services/service';
import { useResolveChatMutation } from '../services/service';
import { setTickets } from '../store/slices/base';

const useGeneralInbox = () => {
  const dispatch = useDispatch();
  const { assigningTicketId } = useSelector((state: RootState) => state.base);
  const [ closeChat, { isLoading: isClosing } ] = useCloseChatMutation();
  const [inboxSearchValue, setInboxSearchValue] = useState<string>('');
  const filteredUnassignedTickets = useSelector((state: RootState) => selectFilteredUnassignedTickets(state.base, inboxSearchValue));
  const [ takeChat, { isLoading: isTakingChat } ] = useTakeChatMutation();
  const is_superuser = useSelector((state: RootState) => state.user.is_superuser);
  const { refetch: refetchAssignedChats } = useGetAssignedChatsQuery(undefined, { skip: is_superuser }); // to keep assigned chats updated
  const { refetch: refetchWaitingChats } = useGetWaitingChatsQuery(undefined, { skip: is_superuser }); // to keep waiting chats updated

  const assignAndGo = async () => {
    // Dispatch action to assign agent to ticket
    const result = await refetchAssignedChats();
    const data = (result as any)?.data;
    if (data && data.chats) {
      // Update assigned chats in the store
      dispatch(setAssignedChats(data.chats));
    }
    const waitingResult = await refetchWaitingChats();
    const waitingData = (waitingResult as any)?.data;
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
      await closeChat({ ticketId: assigningTicketId });
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
  const [ resolveChat, { isLoading: isClosingTicket } ] = useResolveChatMutation();
  const handleResolveChat = async () => {
    try {
      await resolveChat({ ticketId: assigningTicketId });
      const result = await refetchWaitingChats();
      const data = (result as any)?.data;
      if (data && data.chats) {
        // Update waiting chats in the store
        dispatch(setTickets(data.chats));
      }
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




  return {
    isTakingChat,
    handleAssign,
    deleteModalId,
    handleDelete,
    isClosing,
    closeDeleteTicketBntId,
    inboxSearchValue,
    setInboxSearchValue,
    filteredUnassignedTickets,
    closeTicketModalId,
    handleResolveChat,
    isClosingTicket,
    closeCloseTicketBntId,
    reopenTicketModalId,
    closeReopenTicketBntId
  }
}

export default useGeneralInbox
