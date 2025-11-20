import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateAgentMutation } from '../../../services/service';
import toast from 'react-hot-toast';
import { useGetAdminAgentsQuery } from '../../../services/service';

const agentSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required')
});

const CreateAgentModal = ({ id, isLoading }: 
  {
    id: string,
    isLoading: boolean,
  }
) => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    },
    resolver: yupResolver(agentSchema)
  })

  const { register, handleSubmit, formState: { errors }, reset } = methods;
  const [createAgent, { isLoading: isAgentCreationLoading }] = useCreateAgentMutation();
  const { refetch: refetchAdminAgents } = useGetAdminAgentsQuery();

  const onSubmit = (data: any) => {
    console.log(data);
    try {
      createAgent(data);
      toast.success('Agente creado con éxito!');
      // Close modal
      const closeModalButton = document.getElementById('close-agent-modal') as HTMLButtonElement | null;
      if (closeModalButton) closeModalButton.click();
      setTimeout(() => {
        refetchAdminAgents();
      }, 2000);
      reset();
    } catch (error) {
      console.error('Error creating agent:', error);
      toast.error('Error creating agent. Please try again.');
    }
  }

  const baseInputClass = `
    input input-sm w-full !outline-transparent    
  `;
  const errorClass = '!outline-1 !outline-red-200 border-red-200'

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document!.getElementById('my_modal_1')!.showModal()}>open modal</button> */}
      <dialog id={id} className="modal">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          <p className="py-4 text-center">
            Creación de Agente.
          </p>
          <form id='agent-form' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Username</legend>
                <input type="text" className={`${baseInputClass} ${errors.username ? errorClass : ''}`} placeholder="Nombre de usuario" {...register('username')} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Correo</legend>
                <input type="text" placeholder="Correo electrónico" className={`${baseInputClass} ${errors.email ? errorClass : ''}`} {...register('email')} autoComplete='off' />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Contraseña</legend>
                <input type="password" placeholder="Contraseña" className={`${baseInputClass} ${errors.password ? errorClass : ''}`} {...register('password')} autoComplete='new-password' />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Confirmar Contraseña</legend>
                <input type="password" placeholder="Confirmar Contraseña" className={`${baseInputClass} ${errors.confirmPassword ? errorClass : ''}`} {...register('confirmPassword')} autoComplete='new-password' />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Primer Nombre</legend>
                <input type="text" placeholder="Primer Nombre" className={`${baseInputClass} ${errors.firstName ? errorClass : ''}`} {...register('firstName')} autoComplete='new-password' />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Apellido</legend>
                <input type="text" placeholder="Apellido" className={`${baseInputClass} ${errors.lastName ? errorClass : ''}`} {...register('lastName')} autoComplete='new-password' />
              </fieldset>
            </div>
          </form>

          <div className="modal-action mt-1">
            <form method="dialog">
 
              {/* if there is a button in form, it will close the modal */}
              <div className={`!btn mr-2 relative btn-info`}
                onClick={() => {
                    const form = document.getElementById('agent-form');
                    if (form) {
                      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                    }
                  }}
              >

                {/* text toggled during animation */}
                <span 
                  className={`transition-opacity duration-75 ${!isAgentCreationLoading ? 'opacity-100' : 'opacity-0'}`}
                >
                  Crear
                </span>
                {/* spinner shown while animating */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-75 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
                </div>

              </div>
              
              <button className="btn !bg-secondary" id='close-agent-modal'>Cancelar</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default CreateAgentModal