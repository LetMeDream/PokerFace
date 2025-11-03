import Modal from '../Modal';
import InboxEntry from './InboxEntry';
import useGeneralInbox from '../../../hooks/useGeneralInbox';

const GeneralInbox = () => {
  const {
    isLoading,
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
  } = useGeneralInbox();


  return (
    <div className='flex flex-col items-center justify-center pb-14'>
      <div className=" h-full pt-6 text-white">
        <h1 className="!text-xl md:!text-3xl  font-bold mb-4">Gestión de Tickets</h1>
      </div>

      <div className=' rounded-xs md:max-w-4xl !w-[90vw] sm:!w-[70vw] mt-2'>
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
                {filteredUnassignedTickets.filter(ticket => !ticket.agent_assigned).length}
              </span>
            </li>
            
          </ul>
          <div className='basis-3/5  p-4 pb-2'>
            <input 
                type="text" 
                placeholder="Buscar..." 
                className="input input-bordered w-full caret-primary active:!ring-1 focus-within:!ring-1 focus-visible:!ring-1 focus:!ring-1 active:!outline-none focus-within:!outline-none focus-visible:!outline-none focus:!outline-none active:!border-none focus-within:!border-none focus-visible:!border-none focus:!border-none" 
                value={inboxSearchValue}
                onChange={(e) => setInboxSearchValue(e.target.value)}
            />
          </div>
        </div>

        {/* Ticket list */}
        <ul className="list bg-cyan-50 text-black rounded-none rounded-box shadow-md">
          {filteredUnassignedTickets.map(ticket => (
            <InboxEntry 
              key={ticket.id} 
              ticket={ticket} 
              deleteModalId={deleteModalId}
              closeTicketModalId={closeTicketModalId}
              reopenTicketModalId={reopenTicketModalId}
            />
          ))}
        </ul>

      </div>

      <Modal // Modal for auto-assign ticket and go to chat
        acceptFunction={handleAssign} 
        isLoading={isLoading}
        type='confirm'
        message='¿Desear auto-asignarse el ticket e ir a la conversación?'
        btnMessage='Asignar e Ir'
        id={'my_modal_1'}
      />
      <Modal // Modal for deleting ticket
        acceptFunction={handleDelete}
        isLoading={isDeleting}
        type='danger'
        message='¿Estás seguro de que deseas eliminar este ticket?'
        id={deleteModalId}
        btnMessage='Eliminar'
        closeBtnId={closeDeleteTicketBntId}
      />
      <Modal // Modal for closing ticket
        acceptFunction={handleCloseTicket}
        isLoading={isClosingTicket}
        type='info'
        message='¿Estás seguro de que deseas marcar este ticket como cerrado?'
        id={closeTicketModalId}
        btnMessage='Cerrar'
        closeBtnId={closeCloseTicketBntId}
      />
      <Modal // Modal for reopening ticket
        acceptFunction={handleReopenTicket}
        isLoading={isReopeningTicket}
        type='info'
        message='¿Estás seguro de que deseas marcar este ticket como reabierto?'
        id={reopenTicketModalId}
        btnMessage='Reabrir'
        closeBtnId={closeReopenTicketBntId}
      />
    </div>
  )
}

export default GeneralInbox