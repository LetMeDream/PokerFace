import { selectTicketsArray, selectUnassignedTickets } from '../../../utils/selectors'
import type { RootState } from '../../../store/store';
import Modal from '../Modal';
import InboxEntry from './InboxEntry';
import { useSelector } from 'react-redux';
import { assignTicketToAgent } from '../../../store/slices/base';
import { useAssignTicketMutation } from '../../../services/service';
import { useDeleteTicketMutation } from "../../../services/service";
import { deleteTicket } from "../../../store/slices/base";
import { useDispatch } from "react-redux";

const GeneralInbox = () => {
  const tickets = useSelector((state: RootState) => selectTicketsArray(state.base));
  const unassignedTickets = useSelector((state: RootState) => selectUnassignedTickets(state.base));
  const dispatch = useDispatch();
  const { assigningTicketId } = useSelector((state: RootState) => state.base);
  const { chat_id } = useSelector((state: RootState) => state.chatProfile);
  const { first_name, last_name } = useSelector((state: RootState) => state.user);
  const [ assignTicket, { isLoading } ] = useAssignTicketMutation();
  const [ deleteTicketCallToApi, { isLoading: isDeleting } ] = useDeleteTicketMutation();
  
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

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className=" h-full pt-6 text-white">
        <h1 className="!text-xl md:!text-3xl  font-bold mb-4">Gestión de Tickets</h1>
      </div>

      <div className=' rounded-xs md:max-w-4xl !max-w-[90vw] sm:!max-w-[70vw] mt-2'>
        <div className=" text-xs md:text-lg text-center text-gray-800 rounded-t-md px-4 py-6 bg-cyan-50 border-b border-gray-300">
          <p>
            Aquí puedes ver y gestionar todos los tickets sin asignar. 
          </p>
          <p>
            Haz clic en un ticket para asignarlo y comenzar a interactuar con el usuario.
          </p>
        </div>
 
        <div className='flex items-center bg-cyan-50'>
          {/* Ticket count */}
          <ul className="list basis-2/5 text-black rounded-none rounded-box items-center">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              Tickets sin asignar:
              <span className="font-medium badge text-white ml-1">
                {tickets.filter(ticket => !ticket.agent_assigned).length}
              </span>
            </li>
            
          </ul>
          <div className='basis-3/5  p-4 pb-2'>
            <input 
                type="text" 
                placeholder="Buscar..." 
                className="input input-bordered w-full caret-primary active:!ring-1 focus-within:!ring-1 focus-visible:!ring-1 focus:!ring-1 active:!outline-none focus-within:!outline-none focus-visible:!outline-none focus:!outline-none active:!border-none focus-within:!border-none focus-visible:!border-none focus:!border-none" 
                /* value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} */
            />
          </div>
        </div>

        {/* Ticket list */}
        <ul className="list bg-cyan-50 text-black rounded-none rounded-box shadow-md">
          {unassignedTickets.map(ticket => (
            <InboxEntry 
              key={ticket.id} 
              ticket={ticket} 
              modalId={modalId}
            />
          ))}
        </ul>

      </div>

      <Modal 
        acceptFunction={handleAssign} 
        isLoading={isLoading}
        type='confirm'
        message='Sí, asignarme e ir'
        id={'my_modal_1'}
      />
      <Modal 
        acceptFunction={handleDelete}
        isLoading={isDeleting}
        type='danger'
        message='¿Estás seguro de que deseas eliminar este ticket?'
        id={modalId}
        closeBtnId={deleteTicketBtnId}
      />
    </div>
  )
}

export default GeneralInbox