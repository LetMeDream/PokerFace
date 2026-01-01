/* 
* Messages for PRESENTATION ONLY 
*/
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
export const agentMessage = (message: string, createdAt?: string) => {
  // Formatea la hora si existe createdAt
  let time = '';
  if (createdAt) {
    const date = new Date(createdAt);
    // Formato HH:mm, 24h
    time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return (
    <>
      <div className="flex justify-end gap-2.5 mb-4 ">
        <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0" title="Agente"></div>
        <div className="flex flex-col gap-1 items-end">
          <div className="bg-gray-100 p-2 rounded-lg max-w-[160px] break-words">
            <p className="text-sm text-gray-700 max-w-[160px]">{message}</p>
          </div>
          {time && (
            <span className="text-xs text-gray-500 mt-0.5">{time}</span>
          )}
        </div>
      </div>
    </>
  );
};

/* Message for visitor */
export const guestMessage = (message: string, createdAt?: string) => {
  let time = '';
  if (createdAt) {
    const date = new Date(createdAt);
    time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return (
    <>
      <div className="flex gap-2.5 mb-4 ">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" title="Visitante"></div>
        <div className="flex flex-col gap-1 items-start">
          <div className="bg-green-500 text-white p-2 rounded-lg max-w-[160px] break-words">
            <p className="text-sm max-w-[160px]">{message}</p>
          </div>
          {time && (
            <span className="text-xs text-gray-500 mt-0.5">{time}</span>
          )}
        </div>
      </div>
    </>
  );
};

/* Classnames for errors on inputs */
export const inputErrors = '!border-transparent !ring-1 !ring-red-400 focus-visible:!ring-red-400 focus:!ring-red-400 placeholder:text-red-400'


/* Status Messages */
export const notificationStatusMessages = {
  new_message: 'Mensaje Nuevo!',
  agent_assigned: 'Has sido asignado a un chat.',
  agent_unassigned: 'Has sido desvinculado de un chat.',
  new_chat: 'Nuevo chat iniciado!',
  chat_resolved: 'Chat resuelto.',
  chat_closed: 'Chat cerrado.'
} as const

export type notificationStatusKey = keyof typeof notificationStatusMessages;



