import { selectTicketsArray, selectUnassignedTickets } from '../../../utils/selectors'
import type { RootState } from '../../../store/store';
import Modal from '../Modal';
import InboxEntry from './InboxEntry';
import { useSelector } from 'react-redux';
import { sleep } from '../../../utils/helpers';
import { useDispatch } from 'react-redux';
import { assignAgentToTicket } from '../../../store/slices/base';

const GeneralInbox = () => {
  const tickets = useSelector((state: RootState) => selectTicketsArray(state.base));
  const unassignedTickets = useSelector((state: RootState) => selectUnassignedTickets(state.base));
  const dispatch = useDispatch();
  const { assigningTicketId } = useSelector((state: RootState) => state.base);
  const { chat_id } = useSelector((state: RootState) => state.chatProfile);

  const assignAndGo = async () => {
    // Dispatch action to assign agent to ticket
    // TODO: Here we could await, pretending to await for the API response
    await sleep(1500);
    dispatch(assignAgentToTicket({ ticketId: assigningTicketId, agentChatId: chat_id }));
  
    // Close modal
    const closeModalButton = document.getElementById('close_modal') as HTMLButtonElement | null;
    if (closeModalButton) closeModalButton.click();

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
 
        {/* Ticket count */}
        <ul className="list bg-cyan-50 text-black rounded-none rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Tickets sin asignar:
            <span className="font-medium badge text-white ml-1">
              {tickets.filter(ticket => !ticket.agent_assigned).length}
            </span>
          </li>
        </ul>
      

        {/* Ticket list */}
        <ul className="list bg-cyan-50 text-black rounded-none rounded-box shadow-md">
          {unassignedTickets.map(ticket => (
            <InboxEntry 
              key={ticket.id} 
              ticket={ticket} 
            />
          ))}
        </ul>

      </div>

      <Modal 
        assignAndGo={assignAndGo}
      />
    </div>
  )
}

export default GeneralInbox