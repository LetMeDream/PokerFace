import type { Agent } from '../../../types/Slices'
import { FaUserTie } from "react-icons/fa6";
import { CgDetailsMore } from "react-icons/cg";

const AgentsCRUDEntry = ({ agent } : { agent: Agent }) => {
  return (
    <>
          <div className=" border-b border-gray-300">
              <div 
                className="flex items-center gap-3 px-3 py-0.5 bg-cyan-50 hover:bg-indigo-100 duration-300 text-secondary transition-colors cursor-pointer" 
                // onClick={showOptions}
                // data-custom-id={ticket.id}
              >
                {/* Avatar + Name */}
                <div className=" border-r border-r-gray-300 p-1 basis-2/6 md:basis-2/6 truncate">
    
                    <div className="rounded-l-sm self-stretch flex justify-center group-hover:!bg-slate-600">
                      <FaUserTie className="text-secondary w-12 h-12" />
                    </div>
    
                    {/* Columna: Nombre y Status */}
                  <div className="flex flex-col flex-1 basis-1/5 md:basis-1/6 truncate text-center">
                    <div className="md:px-2 text-xs font-medium truncate">
                      {agent?.user.username || 'Usuario Anónimo'}
                    </div>
                    <div className="md:px-2 !text-xs uppercase font-semibold opacity-60">
                      {agent?.is_available ? 'Disponible' : 'No disponible'}
                    </div>
                  </div>
                  
                </div>
    
                {/* Actions */}
                <div className="flex-1 min-w-0 flex gap-2 max-h-[60px] basis-3/6 md:basis-4/6">
                  <button className='ml-auto mr-10 !bg-transparent hover:!bg-amber-300 transition'>
                    <CgDetailsMore className="w-6 h-6 text-gray-500  "/>
                  </button>
                </div>
    
              </div>
          </div>
        </>
  )
}

export default AgentsCRUDEntry