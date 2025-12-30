import type { Agent } from '../../../types/Slices'
import { FaUserTie } from "react-icons/fa6";
/* import { CgDetailsMore } from "react-icons/cg"; */
import { TbEdit } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDeleteAgentMutation, useGetAdminAgentsQuery, useUpdateAgentMutation } from '../../../services/service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

export const AgentsCRUDEntry = ({ agent } : { agent: Agent }) => {
  const [deleteAgent, { isLoading: isAgentDeleting }] = useDeleteAgentMutation();
  const { refetch: refetchAdminAgents } = useGetAdminAgentsQuery();
  

  const handleDelete = async () => {
    if (agent?.id) {
      try {
        await deleteAgent({ id: agent.id }).unwrap();
        toast.success('Agente eliminado con éxito');
        setTimeout(() => {
          refetchAdminAgents();
        }, 20);
      } catch (error) {
        const { data } = error as { data?: { error?: string }, error?: string };
        console.error('Failed to delete the agent:', data?.error);
        toast.error(typeof data?.error === 'string' ? data.error : 'Error deleting agent. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="">
          <div 
            className="flex items-center gap-3 px-3 py-0.5 bg-cyan-50 hover:bg-indigo-100 duration-300 text-secondary transition-colors cursor-pointer" 
            // onClick={showOptions}
            // data-custom-id={ticket.id}
          >
            {/* Avatar + Name */}
            <div className=" border-r border-r-gray-300 basis-2/6 md:basis-2/6 truncate">

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
              <button 
                className='ml-auto !bg-transparent hover:!bg-secondary !transition-colors !p-2'
                onClick={() => (document.getElementById(`modal_edit_agent_${agent.id}`) as HTMLDialogElement)?.showModal()}
              >
                <TbEdit className="w-6 h-6 text-gray-500  "/>
              </button>
              <button 
                onClick={() => (document.getElementById(`modal_delete_agent_${agent.id}`) as HTMLDialogElement)?.showModal()}
                className=' !bg-transparent hover:!bg-secondary !transition-colors !p-2'
              >
                <AiTwotoneDelete 
                  className="w-6 h-6 text-gray-500" 
                />
              </button>
            </div>

          </div>
      </div>
      <div>
        <DeleteAgentModal 
          agent={agent} 
          handleDelete={handleDelete}
          isAgentDeleting={isAgentDeleting}
        />
        <EditAgentModal 
          agent={agent} 
        />
      </div>
    </>
  )
}

const DeleteAgentModal = ({ agent, handleDelete, isAgentDeleting }: { agent: Agent, handleDelete: () => void, isAgentDeleting: boolean }) => {
  return (
    <dialog id={`modal_delete_agent_${agent.id}`} className="modal">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">Cuidado</h3>
        <p className="pt-4">
          ¿Estás seguro de que deseas eliminar al agente <strong>{agent.user.username}</strong>? 
        </p>
        <p className="pb-4">
          Esta acción no se puede deshacer.
        </p>
        <form method="dialog" className="flex justify-end gap-2">
          <div className='btn btn-error relative'
            onClick={() => handleDelete()}
          >
            {/* text toggled during animation */}
            <span 
              className={`transition-opacity duration-75 ${!isAgentDeleting ? 'opacity-100' : 'opacity-0'}`}
            >
                Eliminar
            </span>
            {/* spinner shown while animating */}
            <div className={`!absolute !inset-0 !flex !items-center !justify-center !transition-opacity !duration-75 ${isAgentDeleting ? '!opacity-100' : '!opacity-0'}`}>
                <div className="!border-2 !border-white !border-t-transparent !rounded-full !w-6 !h-6 !animate-spin"></div>
            </div>
          </div>

          <button className='!btn !btn-ghost' type='button'
            onClick={() => {
              const modal = document.getElementById(`modal_delete_agent_${agent.id}`) as HTMLDialogElement | null;
              if (modal) modal.close();
            }}
          >
            Cerrar
          </button>
        </form>
      </div>
    </dialog>
  )
}


const EditAgentModal = ({
  agent
}: { agent: Agent }) => {

  const agentSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    department: yup.string().required('Department is required'),
    is_available: yup.boolean(),
    max_concurrent_chats: yup.number().required('Maximum concurrent chats is required').min(1, 'Must be at least 1'),
  });
  const baseInputClass = `
    input input-sm w-full !outline-transparent    
  `;
  const errorClass = '!outline-1 !outline-red-200 border-red-200'
  const methods = useForm({
    resolver: yupResolver(agentSchema),
    defaultValues: {
      username: agent.user.username || '',
      email: agent.user.email || '',
      firstName: agent.full_name?.split(' ')[0] || '', 
      lastName: agent.full_name?.split(' ')[1] || '',
      department: agent.department || '',
      is_available: agent.is_available || true,
      max_concurrent_chats: agent.max_concurrent_chats || 4,
    }
  })  

  const { register, formState: { errors }, handleSubmit } = methods;
  
  const [updateAgent, /* { isLoading: isAgentUpdating } */] = useUpdateAgentMutation();
  const onSubmit = (data: any) => {
    // Handle form submission here
    try {
      updateAgent({ id: agent.id, agentData: {
        username: data.username,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        department: data.department,
        is_available: data.is_available,
        max_concurrent_chats: data.max_concurrent_chats,
      } });
      toast.success('Agente Actualizado Con Éxito!');
      // Close modal
      const closeModalButton = document.getElementById(`close_edit_agent_modal_${agent.id}`) as HTMLButtonElement | null;
      if (closeModalButton) closeModalButton.click();
    } catch (error) {
      console.error('Failed to update the agent:', error);
      toast.error('Error updating agent. Please try again.');
    }
    console.log(data);
  }

  return (
    <dialog id={`modal_edit_agent_${agent.id}`} className="modal text-white placeholder:text-white">
      <div className="modal-box bg-slate-100 text-secondary">
        <h3 className="font-bold text-lg">Editar Información de Agente</h3>
        <p className="pt-4">
          Aquí puedes editar la información del agente.
        </p>

        <form id={`edit-agent-form_${agent.id}`} autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Username</legend>
              <input type="text" className={`${baseInputClass} ${errors.username ? errorClass : ''}`} placeholder="Nombre de usuario" {...register('username')}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Correo</legend>
              <input type="text" placeholder="Correo electrónico" className={`${baseInputClass} ${errors.email ? errorClass : ''}`} {...register('email')} autoComplete='off' />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Primer Nombre</legend>
              <input type="text" placeholder="Primer Nombre" className={`${baseInputClass} ${errors.firstName ? errorClass : ''}`} {...register('firstName')} autoComplete='new-password' />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Apellido</legend>
              <input type="text" placeholder="Apellido" className={`${baseInputClass} ${errors.lastName ? errorClass : ''}`} {...register('lastName')} autoComplete='new-password' />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Departamento</legend>
              <select 
                {...register('department')}
                className={"select select-neutral" + baseInputClass + (errors.department ? errorClass : '')}>
                <option disabled={true}>Elija</option>
                <option value='valor_2'>EU west</option>
                <option value='Soporte Premium'>Soporte Premium</option>
                <option value='Customer Support'>Customer Support</option>
              </select>
            </fieldset>
            <div className="fieldset !flex !flex-row items-center gap-4">
              <legend className="fieldset-legend">Disponible</legend>
              <input type="checkbox" defaultChecked className="checkbox" {...register('is_available')} />              
            </div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Número máximo de chats</legend>
              <input type="number" placeholder="" className={`${baseInputClass} ${errors.lastName ? errorClass : ''}`} {...register('max_concurrent_chats')} autoComplete='new-password' />
            </fieldset>
          </div>

        </form>

        {/* Mensaje preguntando si desea cambiar contraseña */}
        <p className="pt-4 hover:underline cursor-pointer text-blue-400">
          ¿Cambiar contraseña?
        </p>

        <form method="dialog" className="flex justify-end gap-2 mt-2">
          <div className='!btn !btn-info'
            onClick={() => {
              const form = document.getElementById(`edit-agent-form_${agent.id}`);
              if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }}
          >
            Guardar Cambios
          </div>
          <button 
            className='!btn !btn-ghost' type='button'
            id={`close_edit_agent_modal_${agent.id}`}
            onClick={() => {
              const modal = document.getElementById(`modal_edit_agent_${agent.id}`) as HTMLDialogElement | null;
              if (modal) modal.close();
            }}
          >
            Cerrar
          </button>
        </form>
      </div>
      {/* <div className="modal-box bg-black opacity-50">
          Another
      </div> */}
    </dialog>
  )
}