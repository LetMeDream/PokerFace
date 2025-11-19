import React from 'react'
import { useSelector } from 'react-redux'
import { selectAgentsArray } from '../../../utils/selectors';
import AgentsCRUDEntry from './AgentsCRUDEntry';

const AgentsCRUD = () => {

  const agents = useSelector(selectAgentsArray);  
  console.log(agents)

  return (
      <div className='flex flex-col items-center justify-center pb-14'>
      <div className=" h-full pt-6 text-white">
        <h1 className="!text-xl md:!text-3xl  font-bold mb-4">Gestión de Agentes</h1>
      </div>

      <div className=' rounded-xs md:max-w-4xl !w-[90vw] sm:!w-[70vw] mt-2'>
        <div className=" text-xs md:text-lg text-center text-gray-800 rounded-t-md px-4 py-6 bg-cyan-50 border-b border-gray-300">
          <p>
            Aquí puedes ver y gestionar todos los agentes. 
          </p>
          <p>
            Haz clic en un agente para editar su información o eliminarlo.
          </p>
        </div>
 
        {/* --- BARRA DE HERRAMIENTAS: CONTADOR, BUSCADOR Y BOTÓN --- */}
        <div className='flex flex-col md:flex-row items-center justify-between bg-cyan-50 px-4 py-2 gap-4'>
          
          {/* 1. Agent count (Alineado a la izquierda) */}
          <div className="text-black text-xs opacity-60 tracking-wide whitespace-nowrap">
              Total de Agentes:
              <span className="font-medium badge text-white ml-2 bg-gray-600 border-none">
                {agents.length}
              </span>
          </div>

          {/* Contenedor derecho: Buscador + Botón */}
          <div className='flex items-center gap-2 w-full md:w-auto flex-1 md:justify-end'>
            
            <button 
              className="btn h-10 min-h-0 bg-blue-600 hover:bg-blue-700 text-white border-none flex items-center gap-2 px-4 shadow-sm transition-transform active:scale-95"
              onClick={() => console.log("Crear agente clickeado")} 
            >
              {/* Icono Plus SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="hidden sm:inline font-medium">Crear</span>
            </button>

          </div>
        </div>

        {/* Ticket list */}
        <ul className="list bg-cyan-50 text-black rounded-none rounded-box shadow-md">
          {/* {paginatedTickets.map(ticket => (
            <InboxEntry 
              key={ticket.id} 
              ticket={ticket} 
              deleteModalId={deleteModalId}
              closeTicketModalId={closeTicketModalId}
              reopenTicketModalId={reopenTicketModalId}
            />
          ))} */}

          {agents.length === 0 && (
            <li className="p-4 text-center text-gray-600">
              No hay agentes disponibles.
            </li>
          )}

          {agents.length > 0 && agents.map(agent => (
            <li key={agent.id} className="p-4 border-b border-gray-300">
              <AgentsCRUDEntry agent={agent} />
            </li>
          ))}

        </ul>

      </div>

      {/* Pagination Component */}
      {(
        <div className='fixed bottom-20 md:bottom-4'>
          {/* <Pagination
            totalPages={totalPages}
            goToPage={goToPage}
            currentPage={currentPage}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPreviousPage}
          /> */}
        </div>
      )}

      {/* <Modal // Modal for auto-assign ticket and go to chat
        acceptFunction={handleAssign} 
        isLoading={isTakingChat}
        type='confirm'
        message='¿Desear auto-asignarse el ticket e ir a la conversación?'
        btnMessage='Asignar e Ir'
        id={'my_modal_1'}
      /> */}
      {/* <Modal // Modal for deleting ticket
        acceptFunction={handleDelete}
        isLoading={isClosing}
        type='danger'
        message='¿Estás seguro de que deseas eliminar este ticket?'
        id={deleteModalId}
        btnMessage='Eliminar'
        closeBtnId={closeDeleteTicketBntId}
      /> */}
      {/* <Modal // Modal for closing ticket
        acceptFunction={handleResolveChat}
        isLoading={isClosingTicket}
        type='info'
        message='¿Estás seguro de que deseas marcar este ticket como cerrado?'
        id={closeTicketModalId}
        btnMessage='Cerrar'
        closeBtnId={closeCloseTicketBntId}
      /> */}
      {/* <Modal // Modal for reopening ticket
        acceptFunction={handleReopenTicket}
        isLoading={isReopeningTicket}
        type='info'
        message='¿Estás seguro de que deseas marcar este ticket como reabierto?'
        id={reopenTicketModalId}
        btnMessage='Reabrir'
        closeBtnId={closeReopenTicketBntId}
      /> */}
    </div>
  )
}

export default AgentsCRUD