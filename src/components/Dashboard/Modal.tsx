
const Modal = ({ 
    handleAssign, 
    isLoading 
  }: { 
    handleAssign: (e: React.MouseEvent<HTMLDivElement>) => void, 
    isLoading: boolean 
  }) => {
 
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document!.getElementById('my_modal_1')!.showModal()}>open modal</button> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          <p className="py-4">¿Desea auto-asignarse el ticket e ir a la conversación?</p>
          <div className="modal-action mt-1">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="btn btn-primary mr-2 relative" onClick={handleAssign}>

                {/* text toggled during animation */}
                <span 
                  className={`transition-opacity duration-75 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}
                >
                  Sí, asignarme e ir
                </span>
                {/* spinner shown while animating */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-75 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
                </div>

              </div>
              
              <button className="btn" id='close_modal'>Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Modal