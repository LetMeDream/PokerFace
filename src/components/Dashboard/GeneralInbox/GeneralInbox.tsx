import { selectTicketsArray } from '../../../utils/helpers'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import Modal from '../Modal';
import InboxEntry from './InboxEntry';

const GeneralInbox = () => {
  const tickets = useSelector((state: RootState) => selectTicketsArray(state.base));

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className=" h-full pt-6 text-white">
        <h1 className="!text-xl md:!text-3xl  font-bold mb-4">Gestión de Tickets</h1>
      </div>

      <div className=' rounded-xs md:max-w-4xl !max-w-[90vw] sm:!max-w-[80vw]'>
        <p className="text-lg text-center text-gray-800 rounded-t-md p-6 bg-cyan-50 border-b border-gray-300">
          Elige una conversación de la barra lateral para ver los mensajes aquí.
        </p>
        {/* List */}
        {
        /* <ul className="list bg-cyan-50 text-black rounded-tr-none rounded-tl-none rounded-box shadow-md">
          
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Tickets sin asignar:
            <span className="font-medium badge text-white ml-1">
              {tickets.length}
            </span>
          </li>


          {/* List-row /}
          <li className="list-row px-0 md:px-[unser]">
            {/* img /}
            <div className=''>
              <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/>
            </div>

            {/* Name/Description  + Last Message /}
            <div className='flex gap-2 max-h-[60px]'>
              <div className='care-for basis-1/5 md:basis-2/6 flex flex-col truncate'>
                <div className='md:px-2 max-h-[60%] truncate'>Dio LupaDio LupaDio LupaDio LupaDio Lupasadasdasdas</div>
                <div className="md:px-2 text-xs uppercase font-semibold opacity-60">Status</div>
              </div>
              <div className='not-care basis-4/5 md:basis-4/6'>
                <p className="list-col-wrap text-xs overflow-hidden max-h-full">

                  {isMobile ? (
                    <>
                      {longText}
                    </>
                  ) : (
                  <>
                    {truncateText(longText, 40)}
                  </>)}

                </p>
              </div>
            </div>
          
            {/* Actions /}
            <div className="flex justify-center items-center cursor-pointer">

              {/* Ícono para representar acción de Asignar Tickets e Ir a conversación /}
              <HiUserAdd
                title='Asignar e Ir a conversación'
                role="button"
                tabIndex={0}
                aria-label="Asignar ticket y abrir conversación"
                className="!w-5 !h-5 text-indigo-700 hover:text-indigo-900 mr-2"
                onClick={() => {
                  // TODO: implementar lógica para asignar ticket y navegar a la conversación
                  const dialog = document.getElementById('my_modal_1') as HTMLDialogElement | null;
                  if (dialog) dialog.showModal();
                }}
              />
              <div className="dropdown dropdown-bottom dropdown-end">
                <SlOptionsVertical role='button' tabIndex={0} className="!w-5 !h-5 text-indigo-700 hover:text-indigo-900 focus:text-indigo-900" />
                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li>
                    <a>
                      Asignar 
                    </a>
                  </li>
                  <li>
                    <a>
                      Marcar como Resuelto
                    </a>
                  </li>
                  <li>
                    <a>
                      Eliminar
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>

        </ul> 
        */}

        <ul className="list bg-cyan-50 text-black rounded-none rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Tickets sin asignar:
            <span className="font-medium badge text-white ml-1">
              {tickets.length}
            </span>
          </li>
        </ul>
      

      {/* 
      // TODO: Iterate over tickets and render InboxEntry for each ticket 
      */}
        <InboxEntry />


      </div>

      <Modal />
    </div>
  )
}

export default GeneralInbox