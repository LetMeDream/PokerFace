
const Modal = ({ 
    isLoading,
    type,
    message,
    acceptFunction,
    id,
    closeBtnId = 'close_modal',
    btnMessage
  }: { 
    isLoading: boolean,
    type?: 'confirm' | 'info' | 'danger',
    message?: string,
    acceptFunction?: (e: React.MouseEvent<HTMLDivElement>) => void,
    id: string,
    closeBtnId?: string
    btnMessage?: string
  }) => {

  let typeClass
  switch (type) {
    case 'confirm':
      typeClass = 'bg-green-500'
      break;
    case 'info':
      typeClass = 'bg-blue-500'
      break;
    case 'danger':
      typeClass = 'bg-red-500'
      break;
    default:
      typeClass = 'bg-secondary'
  }

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document!.getElementById('my_modal_1')!.showModal()}>open modal</button> */}
      <dialog id={id} className="modal">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          <p className="py-4">{message}</p>
          <div className="modal-action mt-1">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className={`btn ${typeClass} mr-2 relative`} onClick={acceptFunction}>

                {/* text toggled during animation */}
                <span 
                  className={`transition-opacity duration-75 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}
                >
                  {btnMessage}
                </span>
                {/* spinner shown while animating */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-75 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
                </div>

              </div>
              
              <button className="btn" id={closeBtnId}>Cancelar</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Modal