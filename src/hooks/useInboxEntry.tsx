import React from 'react'
import type { ChatTicket } from '../types/Slices';
import { useDispatch } from 'react-redux';
import { setAssigningTicketId } from '../store/slices/base';

const useInboxEntry = ({ticket}: {ticket: ChatTicket}) => {
    const [imgError, setImgError] = React.useState(false);
  
    const lastMessage = (ticket.messages && ticket.messages.length > 0)
      ? ticket.messages[ticket.messages.length - 1].content
      : 'No hay mensajes aún.';
  
    const lastRemitent = (ticket.messages && ticket.messages.length > 0)
      ? ticket.messages[ticket.messages.length - 1].message_type
      : 'Desconocido';
  
    const dispatch = useDispatch();
    const showModal = (e: React.MouseEvent) => {
      e.stopPropagation();
      const dialog = document.getElementById('my_modal_1') as HTMLDialogElement | null;
      dispatch(setAssigningTicketId(ticket.id));
      
      if (dialog) dialog.showModal();
    }
  
    const showOptions = (e: React.MouseEvent) => {
      e.stopPropagation();
      const optionsButton = document.getElementById(`options-button-${ticket.id}`);
      if (!optionsButton) return;
      // DaisyUI's dropdowns are triggered by focus, so we focus the button to open the menu
      optionsButton.focus();
    }


  return {
    imgError,
    lastMessage,
    lastRemitent,
    showModal,
    showOptions,
    setImgError
  }
}

export default useInboxEntry