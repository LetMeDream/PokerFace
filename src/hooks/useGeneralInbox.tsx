import { useSelector } from 'react-redux';
import { assignTicketToAgent } from '../store/slices/base';
import { useAssignTicketMutation } from '../services/service';
import { useDeleteTicketMutation } from "../services/service";
import { deleteTicket } from '../store/slices/base';
import { useDispatch } from "react-redux";
import { selectTicketsArray, selectFilteredUnassignedTickets } from '../utils/selectors';
import type { RootState } from '../store/store';
import { useState } from 'react';

const useGeneralInbox = () => {
  const tickets = useSelector((state: RootState) => selectTicketsArray(state.base));
  const dispatch = useDispatch();
  const { assigningTicketId } = useSelector((state: RootState) => state.base);
  const { chat_id } = useSelector((state: RootState) => state.chatProfile);
  const { first_name, last_name } = useSelector((state: RootState) => state.user);
  const [ assignTicket, { isLoading } ] = useAssignTicketMutation();
  const [ deleteTicketCallToApi, { isLoading: isDeleting } ] = useDeleteTicketMutation();
  const [inboxSearchValue, setInboxSearchValue] = useState<string>('');
  const filteredUnassignedTickets = useSelector((state: RootState) => selectFilteredUnassignedTickets(state.base, inboxSearchValue));
  
  const assignAndGo = async () => {
    // Dispatch action to assign agent to ticket
    dispatch(assignTicketToAgent({ ticketId: assigningTicketId, agentChatId: chat_id, agentName: `${first_name} ${last_name}` }));
    // Close modal
    const closeModalButton = document.getElementById('close_modal') as HTMLButtonElement | null;
    if (closeModalButton) closeModalButton.click();
  }  

  const handleAssign = async () => {
    await assignTicket({ ticketId: assigningTicketId, agentId: chat_id });
    assignAndGo();
  }

  /* 
  * In order to re-use the Modal component for deleting tickets, we need to create a unique ID for the delete button within the modal.
  * as well as a unique modal ID.
  */
  const modalId = 'delete_ticket_modal'
  const deleteTicketBtnId = `delete_ticket_btn_${assigningTicketId}`;
  const handleDelete = async () => {
    try {
      await deleteTicketCallToApi({ ticketId: assigningTicketId });
      dispatch(deleteTicket({ ticketId: assigningTicketId! }));
      // Close modal
      const closeModalButton = document.getElementById(deleteTicketBtnId) as HTMLButtonElement | null;
      if (closeModalButton) closeModalButton.click();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  }


  return {
    tickets,
    isLoading,
    handleAssign,
    modalId,
    handleDelete,
    isDeleting,
    deleteTicketBtnId,
    inboxSearchValue,
    setInboxSearchValue,
    filteredUnassignedTickets
  }
}

export default useGeneralInbox