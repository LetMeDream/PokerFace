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

/* Classnames for errors on inputs */
export const inputErrors = '!border-transparent !ring-1 !ring-red-400 focus-visible:!ring-red-400 focus:!ring-red-400 placeholder:text-red-400'

/* Messages for Demo in Dashboard 
* These are only for presentation purposes
  But in here we will have several conversations
  to show how the dashboard will look like.
*/

export const individualChatDemo = {
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "nickname": "Invitado123",
  "status": "active",
  "unread_count": 2,
  "agent_assigned": true,
  "agent_name": "Ana López",
  "messages": [
    {
      message_type: 'guest',
      content: "Hola! Tengo una pregunta sobre mi cuenta."
    },
    {
      message_type: 'agent',
      content: "¡Claro! Estoy aquí para ayudar."
    },
    {
      message_type: 'guest',
      content: "Gracias, eso sería genial."
    },
  ]
}

export const allTickets = [
  {
    "chat_room_id": "a1b2c3d4-e5f6-7890-abcd-111111111111",
    "nickname": "Carlos M.",
    "status": "active",
    "unread_count": 1,
    "agent_assigned": true,
    "agent_name": "Luis Ramos",
    "avatarSrc": "",
    "messages": [
      { "message_type": "guest", "content": "No puedo acceder a mi cuenta, me pide código." },
      { "message_type": "agent", "content": "¿Has intentado restablecer la contraseña desde el enlace?" },
      { "message_type": "guest", "content": "Sí, pero no llega el correo de verificación." }
    ]
  },
  {
    "chat_room_id": "f2e3d4c5-b6a7-8901-cccc-222222222222",
    "nickname": "María G.",
    "status": "pending",
    "unread_count": 0,
    "agent_assigned": false,
    "agent_name": null,
    "avatarSrc": "",
    "messages": [
      { "message_type": "guest", "content": "¿Cuánto tarda el envío a Madrid?" },
      { "message_type": "guest", "content": "¿Tienen número de seguimiento disponibles?" }
    ]
  },
  {
    "chat_room_id": "c3d4e5f6-7890-abcd-3333-333333333333",
    "nickname": "Invitado987",
    "status": "closed",
    "unread_count": 0,
    "agent_assigned": true,
    "agent_name": "Sofía Núñez",
    "avatarSrc": "https://i.pravatar.cc/150?img=2",
    "messages": [
      { "message_type": "guest", "content": "Reporto un problema con mi pedido #4521." },
      { "message_type": "agent", "content": "Ya se resolvió y se reembolsó el importe. ¿Todo correcto?" },
      { "message_type": "guest", "content": "Perfecto, muchas gracias." }
    ]
  },
  {
    "chat_room_id": "d4e5f6a7-8901-bcde-4444-444444444444",
    "nickname": "SoporteTest",
    "status": "on_hold",
    "unread_count": 3,
    "agent_assigned": true,
    "agent_name": "Diego P.",
    "avatarSrc": "https://i.pravatar.cc/150?img=1",
    "messages": [
      { "message_type": "guest", "content": "Mi pago aparece como pendiente desde ayer." },
      { "message_type": "agent", "content": "Lo escalamos al equipo de pagos, te aviso cuando tenga respuesta." },
      { "message_type": "guest", "content": "Gracias, quedo atento." }
    ]
  },
  {
    "chat_room_id": "e5f6a7b8-9012-cdef-5555-555555555555",
    "nickname": "ClienteVIP",
    "status": "active",
    "unread_count": 5,
    "agent_assigned": false,
    "agent_name": null,
    "avatarSrc": "https://i.pravatar.cc/150?img=6",
    "messages": [
      { "message_type": "guest", "content": "Necesito asistencia urgente con mi factura." },
      { "message_type": "guest", "content": "El importe no coincide con lo acordado." },
      { "message_type": "guest", "content": "¿Pueden revisarlo por favor?" }
    ]
  }, {
    "chat_room_id": "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    "nickname": "Laura P.",
    "status": "active",
    "unread_count": 2,
    "agent_assigned": true,
    "agent_name": "Marcos A.",
    "avatarSrc": "https://i.pravatar.cc/150?img=11",
    "messages": [
      { "message_type": "guest", "content": "Hola, tengo un cargo desconocido en mi tarjeta." },
      { "message_type": "agent", "content": "Hola Laura, ¿puedes compartir la fecha y el importe del cargo?" },
      { "message_type": "guest", "content": "Ayer, 29/10, por 49.99€." },
      { "message_type": "agent", "content": "Gracias. Estoy comprobando el historial de pagos y autorizaciones." },
      { "message_type": "agent", "content": "Veo una orden pendiente a nombre de 'Suscripción Pro'. ¿Eres tú quien la autorizó?" },
      { "message_type": "guest", "content": "No, no reconozco esa suscripción." },
      { "message_type": "agent", "content": "Lo bloquearemos y gestionaremos reembolso si procede. Te aviso en cuanto tenga confirmación." }
    ]
  },
  {
    "chat_room_id": "b1c2d3e4-f5g6-7890-bbbb-777777777777",
    "nickname": "UsuarioAnon",
    "status": "pending",
    "unread_count": 0,
    "agent_assigned": false,
    "agent_name": null,
    "avatarSrc": "https://i.pravatar.cc/150?img=14",
    "messages": [
      { "message_type": "guest", "content": "¿Cómo instalo la app en mi SmartTV?" },
      { "message_type": "guest", "content": "En la tienda no aparece disponible para mi modelo." },
      { "message_type": "agent", "content": "¿Qué modelo de televisor tienes?" },
      { "message_type": "guest", "content": "Samsung UE55NU7100." },
      { "message_type": "agent", "content": "Entendido. Para ese modelo la app está en la sección 'Apps' -> Buscar -> 'PokerFace'." },
      { "message_type": "guest", "content": "Lo intento pero me sale error al descargar." },
      { "message_type": "agent", "content": "Prueba reiniciar el televisor y verificar la conexión a internet. Si persiste, envíame el código de error." },
      { "message_type": "guest", "content": "Perfecto, lo reinicié y ya aparece. Gracias!" }
    ]
  }
];