const Modal = ({ assignAndGo }: { assignAndGo: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
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
              <div className="btn btn-primary mr-2" onClick={assignAndGo}>Sí, asignarme e ir</div>
              <button className="btn" id='close_modal'>Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Modal