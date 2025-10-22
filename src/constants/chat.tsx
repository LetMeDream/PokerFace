export const messages = [
  {
    type: 'guest',
    content: "Hola! Creo que necesito ayuda."
  }, 
  {
    type: 'agent',
    content: "¡Hola! ¿Cómo puedo ayudarte?"
  }, 
  {
    type: 'guest',
    content: "¡Me encanta el sitio web!"
  },
]

/* Message for Service Agent */
export const agentMessage = (message: string) => (<>
  <div className="flex items-start gap-2.5 mb-4 ">
    <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0" title="Guest"></div>

    <div className="flex flex-col gap-1">
      <div className="bg-gray-100 p-2 rounded-lg max-w-[160px] break-words">
        <p className="text-sm text-gray-700 max-w-[160px]">{message}</p>
      </div>
    </div>
  </div>

</>)

/* Message for visitor */
export const guestMessage = (message: string) => (<>
  <div className="flex justify-end gap-2.5 mb-4 ">
    <div className="flex flex-col gap-1">
      <div className="bg-green-500 text-white p-2 rounded-lg max-w-[160px] break-words">
          <p className="text-sm max-w-[160px]">{message}</p>
      </div>

    </div>
    
    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" title="Dev"></div>
  </div>
</>)