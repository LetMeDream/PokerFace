import { useSelector } from 'react-redux'
import { selectAgentsArray } from '../../../utils/selectors';
import { AgentsCRUDEntry } from './AgentsCRUDEntry';
import CreateAgentModal from './CreateAgentModal';

const AgentsCRUD = () => {

  const agents = useSelector(selectAgentsArray);  

  const handleCreateAgent = () => {
    const modal = document.getElementById('my_create_agent_modal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

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
        <div className='flex flex-row items-center justify-between bg-cyan-50 px-4 py-2 gap-4'>
          
          {/* 1. Agent count (Alineado a la izquierda) */}
          <div className="text-black text-xs opacity-60 tracking-wide whitespace-nowrap">
              Total de Agentes:
              <span className="font-medium badge text-white ml-2 bg-gray-600 border-none">
                {agents.length}
              </span>
          </div>

          {/* Contenedor derecho: Buscador + Botón */}
          <div className='flex gap-2 flex-1 justify-end'>
            
            <button 
              className="btn h-10 min-h-0 bg-secondary! hover:bg-secondary/90 text-white border-none flex items-center gap-2 px-4 shadow-sm transition-transform active:scale-95"
              onClick={handleCreateAgent}
            >
              {/* Icono Plus SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="hidden sm:inline font-medium">Crear</span>
            </button>

          </div>
        </div>

        {/* Agent list */}
        <ul className="list bg-cyan-50 text-black rounded-none rounded-box shadow-md">

          {agents.length === 0 && (
            <li className="p-4 text-center text-gray-600">
              No hay agentes disponibles.
            </li>
          )}

          {agents.length > 0 && agents.map(agent => (
            <li key={agent.id} className=" pt-2 border-b border-gray-300">
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

      <CreateAgentModal // Modal for CREATING AGENT
        isLoading={false}
        id={'my_create_agent_modal'}
      />

    </div>
  )
}

export default AgentsCRUD