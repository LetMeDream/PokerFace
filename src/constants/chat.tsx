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
    "id": 1,  /* Unique ID */
    "chat_room_id": "a9b8c7d6-e5f4-3210-aaaa-666666666666", /* 'Foreign key' for chat */
    /* User info */
    "nickname": "Carlos M.",
    "status": "active",
    "unread_count": 1,
    "avatarSrc": "",
    /* Agent info */
    "agent_assigned": true,
    "agent_name": "Luis Ramos",
    "messages": [
      { "message_type": "guest", "content": "No puedo acceder a mi cuenta, me pide código." },
      { "message_type": "agent", "content": "¿Has intentado restablecer la contraseña desde el enlace?" },
      { "message_type": "guest", "content": "Sí, pero no llega el correo de verificación." }
    ]
  },
  {
    "id": 2,
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
    "id": 3,
    "chat_room_id": "",
    "nickname": "Invitado987",
    "status": "closed",
    "unread_count": 0,
    "agent_assigned": false,
    "agent_name": "",
    "avatarSrc": "",
    "messages": [
      { "message_type": "guest", "content": "Reporto un problema con mi pedido #4521." },
      { "message_type": "agent", "content": "Ya se resolvió y se reembolsó el importe. ¿Todo correcto?" },
      { "message_type": "guest", "content": "Perfecto, muchas gracias." }
    ]
  },
  {
    "id": 4,
    "chat_room_id": "",
    "nickname": "SoporteTest",
    "status": "on_hold",
    "unread_count": 3,
    "agent_assigned": false,
    "agent_name": "",
    "avatarSrc": "https://i.pravatar.cc/150?img=1",
    "messages": [
      { "message_type": "guest", "content": "Mi pago aparece como pendiente desde ayer." },
      { "message_type": "agent", "content": "Lo escalamos al equipo de pagos, te aviso cuando tenga respuesta." },
      { "message_type": "guest", "content": "Gracias, quedo atento." }
    ]
  },
  {
    "id": 5,
    "chat_room_id": "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    "nickname": "ClienteVIP",
    "status": "active",
    "unread_count": 5,
    "agent_assigned": true,
    "agent_name": "Marcos A.",
    "avatarSrc": "https://i.pravatar.cc/150?img=6",
    "messages": [
      { "message_type": "guest", "content": "Necesito asistencia urgente con mi factura." },
      { "message_type": "guest", "content": "El importe no coincide con lo acordado." },
      { "message_type": "guest", "content": "¿Pueden revisarlo por favor?" }
    ]
  }, {
    "id": 6,
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
    "id": 7,
    "chat_room_id": "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    "nickname": "UsuarioAnon",
    "status": "pending",
    "unread_count": 0,
    "agent_assigned": true,
    "agent_name": "Marcos A.",
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

export const allTickets24 = [
  {
    id: 101,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "AnaC",
    status: "active",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=2",
    messages: [
      { message_type: "guest", content: "No puedo aplicar mi cupón en la compra." },
      { message_type: "agent", content: "¿Cuál es el código del cupón?" }
    ]
  },
  {
    id: 102,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "DiegoR",
    status: "pending",
    unread_count: 0,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Puedo cambiar la dirección de envío?" },
      { message_type: "agent", content: "Sí, hasta que el pedido esté en preparación." }
    ]
  },
  {
    id: 103,
    chat_room_id: "b1c2d3e4-f5g6-7788-zzzz-999999999999",
    nickname: "LuciaS",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=3",
    messages: [
      { message_type: "guest", content: "Tengo un problema con la app en iPhone." }
    ]
  },
  {
    id: 104,
    chat_room_id: "",
    nickname: "TestUser",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Solo probando el chat." },
      { message_type: "agent", content: "Gracias por probar, cerrado." }
    ]
  },
  {
    id: 105,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "RobertoM",
    status: "on_hold",
    unread_count: 4,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=8",
    messages: [
      { message_type: "guest", content: "Mi pedido aparece retrasado, ¿qué pasa?" },
      { message_type: "agent", content: "Lo consulto con logística y te actualizo." }
    ]
  },
  {
    id: 106,
    chat_room_id: "c3d4e5f6-a7b8-9012-llll-333333333333",
    nickname: "SaraV",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Ofrecen factura electrónica?" },
      { message_type: "agent", content: "Sí, te la enviamos por email al confirmar pedido." }
    ]
  },
  {
    id: 107,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "MiguelT",
    status: "active",
    unread_count: 3,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=12",
    messages: [
      { message_type: "guest", content: "Recibí un artículo equivocado." },
      { message_type: "agent", content: "Lo siento. ¿Puedes enviarme foto del paquete?" }
    ]
  },
  {
    id: 108,
    chat_room_id: "",
    nickname: "Anonimo",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Gracias por la ayuda." },
      { message_type: "agent", content: "Un placer, cierre de conversación." }
    ]
  },
  {
    id: 109,
    chat_room_id: "d4e5f6g7-h8i9-0123-kkkk-444444444444",
    nickname: "ClaraP",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=5",
    messages: [
      { message_type: "guest", content: "¿Tienen tallas grandes?" },
      { message_type: "agent", content: "Sí, indicame la prenda y tallas que buscas." }
    ]
  },
  {
    id: 110,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "PabloQ",
    status: "active",
    unread_count: 6,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=9",
    messages: [
      { message_type: "guest", content: "Cobro duplicado en mi tarjeta." },
      { message_type: "agent", content: "Lo reviso con pagos y te doy respuesta pronto." }
    ]
  },
  {
    id: 111,
    chat_room_id: "e5f6g7h8-i9j0-3456-zzzz-555555555555",
    nickname: "NuriaL",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Ofrecen atención en horario nocturno?" }
    ]
  },
  {
    id: 112,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "FernandoG",
    status: "on_hold",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Necesito actualizar mi suscripción." },
      { message_type: "agent", content: "Puedo ayudarte con eso. ¿Qué plan quieres?" }
    ]
  },
  {
    id: 113,
    chat_room_id: "",
    nickname: "SoniaB",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "https://i.pravatar.cc/150?img=4",
    messages: [
      { message_type: "guest", content: "Todo correcto, gracias." }
    ]
  },
  {
    id: 114,
    chat_room_id: "f6g7h8i9-j0k1-6789-xxxx-666666666666",
    nickname: "VictorN",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Tienen tiendas físicas en Barcelona?" },
      { message_type: "agent", content: "Sí, tienes la dirección en la sección 'Tiendas'." }
    ]
  },
  {
    id: 115,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "EstherK",
    status: "active",
    unread_count: 0,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=7",
    messages: [
      { message_type: "guest", content: "¿Pueden cambiar el método de pago después de comprar?" },
      { message_type: "agent", content: "Depende del estado del pedido; dime el número de pedido." }
    ]
  },
  {
    id: 116,
    chat_room_id: "g7h8i9j0-k1l2-9012-yyyy-777777777777",
    nickname: "UsuarioDemo",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Cómo puedo dar de baja mi cuenta?" }
    ]
  },
  {
    id: 117,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "MarcosV",
    status: "active",
    unread_count: 5,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=10",
    messages: [
      { message_type: "guest", content: "Mi código de descuento no aplica en ciertos productos." },
      { message_type: "agent", content: "Algunos artículos están excluidos, reviso tu carrito." }
    ]
  },
  {
    id: 118,
    chat_room_id: "",
    nickname: "AlejandroH",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Gracias por la aclaración." }
    ]
  },
  {
    id: 119,
    chat_room_id: "h8i9j0k1-l2m3-2345-zzzz-888888888888",
    nickname: "PaulaD",
    status: "active",
    unread_count: 2,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=13",
    messages: [
      { message_type: "guest", content: "¿Cómo funciona la garantía de 2 años?" },
      { message_type: "agent", content: "Cubre fallos de fabricación, revisamos caso por caso." }
    ]
  },
  {
    id: 120,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "RocioS",
    status: "pending",
    unread_count: 1,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "No puedo subir archivos en el formulario." },
      { message_type: "agent", content: "¿Qué error te aparece al intentar adjuntar?" }
    ]
  },
  {
    id: 121,
    chat_room_id: "i9j0k1l2-m3n4-5678-zzzz-999999999999",
    nickname: "GonzaloF",
    status: "active",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=15",
    messages: [
      { message_type: "guest", content: "¿Puedo reservar en tienda y recoger hoy?" },
      { message_type: "agent", content: "Depende de disponibilidad, dime el código del producto." }
    ]
  },
  {
    id: 122,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "IreneZ",
    status: "active",
    unread_count: 3,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=16",
    messages: [
      { message_type: "guest", content: "¿Pueden emitir factura a empresa?" },
      { message_type: "agent", content: "Sí, necesitamos los datos fiscales de la empresa." }
    ]
  },
  {
    id: 123,
    chat_room_id: "",
    nickname: "ClienteNuevo",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Tienen envío internacional?" }
    ]
  },
  {
    id: 124,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "OlgaY",
    status: "on_hold",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=18",
    messages: [
      { message_type: "guest", content: "Mi reembolso tarda más de lo esperado." },
      { message_type: "agent", content: "Lo escalo y te informo del estado." }
    ]
  }
];

export const allTickets48 = [
  {
    id: 201,
    chat_room_id: "a1b2c3d4-e5f6-7890-aaaa-111111111111",
    nickname: "LuisP",
    status: "active",
    unread_count: 1,
    agent_assigned: true,
    agent_name: "Laura G.",
    avatarSrc: "https://i.pravatar.cc/150?img=19",
    messages: [
      { message_type: "guest", content: "¿Puedo cancelar mi pedido de ayer?" },
      { message_type: "agent", content: "Sí, si aún no ha sido enviado. ¿Cuál es el número?" }
    ]
  },
  {
    id: 202,
    chat_room_id: "b2c3d4e5-f6g7-8901-bbbb-222222222222",
    nickname: "MartaK",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Cuánto tarda el envío a Baleares?" }
    ]
  },
  {
    id: 203,
    chat_room_id: "c3d4e5f6-g7h8-9012-cccc-333333333333",
    nickname: "JavierM",
    status: "active",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Carlos R.",
    avatarSrc: "https://i.pravatar.cc/150?img=20",
    messages: [
      { message_type: "guest", content: "El tracking no actualiza desde hace 3 días." },
      { message_type: "agent", content: "Verifico con la transportista, te aviso en 1h." }
    ]
  },
  {
    id: 204,
    chat_room_id: "",
    nickname: "DemoUser2",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Solo era una prueba del chat." },
      { message_type: "agent", content: "Perfecto, todo funciona. Cerrado." }
    ]
  },
  {
    id: 205,
    chat_room_id: "d4e5f6g7-h8i9-0123-dddd-444444444444",
    nickname: "ElenaT",
    status: "on_hold",
    unread_count: 3,
    agent_assigned: true,
    agent_name: "Laura G.",
    avatarSrc: "https://i.pravatar.cc/150?img=21",
    messages: [
      { message_type: "guest", content: "Quiero cambiar el color del vestido que compré." },
      { message_type: "agent", content: "¿Tienes el número de pedido? Lo reviso." }
    ]
  },
  {
    id: 206,
    chat_room_id: "e5f6g7h8-i9j0-1234-eeee-555555555555",
    nickname: "RaúlS",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Hay descuentos para estudiantes?" }
    ]
  },
  {
    id: 207,
    chat_room_id: "f6g7h8i9-j0k1-2345-ffff-666666666666",
    nickname: "CarmenL",
    status: "active",
    unread_count: 4,
    agent_assigned: true,
    agent_name: "Carlos R.",
    avatarSrc: "https://i.pravatar.cc/150?img=22",
    messages: [
      { message_type: "guest", content: "El producto llegó dañado en la caja." },
      { message_type: "agent", content: "Por favor, envía fotos del daño y del paquete." }
    ]
  },
  {
    id: 208,
    chat_room_id: "",
    nickname: "PruebaBot",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Hola, ¿funciona el chat?" },
      { message_type: "agent", content: "Sí, todo OK. Cerrado." }
    ]
  },
  {
    id: 209,
    chat_room_id: "g7h8i9j0-k1l2-3456-gggg-777777777777",
    nickname: "SergioN",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=23",
    messages: [
      { message_type: "guest", content: "¿Puedo pagar con Bizum?" },
      { message_type: "agent", content: "Sí, está disponible en el checkout." }
    ]
  },
  {
    id: 210,
    chat_room_id: "h8i9j0k1-l2m3-4567-hhhh-888888888888",
    nickname: "IsabelR",
    status: "active",
    unread_count: 5,
    agent_assigned: true,
    agent_name: "Laura G.",
    avatarSrc: "https://i.pravatar.cc/150?img=24",
    messages: [
      { message_type: "guest", content: "No recibo confirmación de compra." },
      { message_type: "agent", content: "Reviso el estado del pago. ¿Correo usado?" }
    ]
  },
  {
    id: 211,
    chat_room_id: "i9j0k1l2-m3n4-5678-iiii-999999999999",
    nickname: "PedroH",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Tienen devoluciones gratuitas?" }
    ]
  },
  {
    id: 212,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "LauraM",
    status: "on_hold",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=25",
    messages: [
      { message_type: "guest", content: "Quiero un reembolso parcial por un artículo defectuoso." },
      { message_type: "agent", content: "Necesito fotos del defecto para procesarlo." }
    ]
  },
  {
    id: 213,
    chat_room_id: "",
    nickname: "TestFinal",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Gracias por todo, muy buena atención." }
    ]
  },
  {
    id: 214,
    chat_room_id: "j0k1l2m3-n4o5-6789-jjjj-000000000000",
    nickname: "AliciaV",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=26",
    messages: [
      { message_type: "guest", content: "¿Puedo recoger en tienda hoy?" },
      { message_type: "agent", content: "Sí, si está en stock. ¿Ciudad?" }
    ]
  },
  {
    id: 215,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "TomásB",
    status: "active",
    unread_count: 3,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "El cupón no se aplica al carrito." },
      { message_type: "agent", content: "Verifico las condiciones del cupón. ¿Código?" }
    ]
  },
  {
    id: 216,
    chat_room_id: "k1l2m3n4-o5p6-7890-kkkk-111111111111",
    nickname: "BeatrizG",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=27",
    messages: [
      { message_type: "guest", content: "¿Tienen envío a Canarias sin aduanas?" }
    ]
  },
  {
    id: 217,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "HugoF",
    status: "active",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Carlos R.",
    avatarSrc: "https://i.pravatar.cc/150?img=28",
    messages: [
      { message_type: "guest", content: "El pedido dice 'entregado' pero no lo tengo." },
      { message_type: "agent", content: "Abro incidencia con la mensajería. ¿Fotos del timbre?" }
    ]
  },
  {
    id: 218,
    chat_room_id: "",
    nickname: "ClienteVIP",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Todo perfecto, gracias." }
    ]
  },
  {
    id: 219,
    chat_room_id: "l2m3n4o5-p6q7-8901-llll-222222222222",
    nickname: "SilviaP",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=29",
    messages: [
      { message_type: "guest", content: "¿Puedo usar dos cupones a la vez?" },
      { message_type: "agent", content: "No, solo uno por pedido." }
    ]
  },
  {
    id: 220,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "DanielC",
    status: "on_hold",
    unread_count: 4,
    agent_assigned: true,
    agent_name: "Laura G.",
    avatarSrc: "https://i.pravatar.cc/150?img=30",
    messages: [
      { message_type: "guest", content: "El pago falló pero me descontaron el dinero." },
      { message_type: "agent", content: "Es un error de autorización. Te devuelvo en 24h." }
    ]
  },
  {
    id: 221,
    chat_room_id: "m3n4o5p6-q7r8-9012-mmmm-333333333333",
    nickname: "VerónicaL",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Tienen atención en inglés?" }
    ]
  },
  {
    id: 222,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "AndrésT",
    status: "active",
    unread_count: 3,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=31",
    messages: [
      { message_type: "guest", content: "Quiero cambiar el tamaño de las zapatillas." },
      { message_type: "agent", content: "Envíame el número de pedido y talla actual." }
    ]
  },
  {
    id: 223,
    chat_room_id: "",
    nickname: "SoportePrueba",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Gracias, todo claro." }
    ]
  },
  {
    id: 224,
    chat_room_id: "n4o5p6q7-r8s9-0123-nnnn-444444444444",
    nickname: "MarinaR",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=32",
    messages: [
      { message_type: "guest", content: "¿Puedo pagar a plazos sin intereses?" },
      { message_type: "agent", content: "Sí, con Klarna o Aplazame." }
    ]
  },
  {
    id: 225,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "ÓscarM",
    status: "active",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Carlos R.",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "El producto no coincide con la foto." },
      { message_type: "agent", content: "Lo siento, ¿puedes enviarme una foto del recibido?" }
    ]
  },
  {
    id: 226,
    chat_room_id: "o5p6q7r8-s9t0-1234-oooo-555555555555",
    nickname: "JuliaN",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=33",
    messages: [
      { message_type: "guest", content: "¿Tienen tienda en Valencia?" }
    ]
  },
  {
    id: 227,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "RubénS",
    status: "on_hold",
    unread_count: 3,
    agent_assigned: true,
    agent_name: "Laura G.",
    avatarSrc: "https://i.pravatar.cc/150?img=34",
    messages: [
      { message_type: "guest", content: "Quiero devolver un regalo." },
      { message_type: "agent", content: "Necesito el número de pedido o email del comprador." }
    ]
  },
  {
    id: 228,
    chat_room_id: "",
    nickname: "GraciasChat",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Muy buena atención, gracias." }
    ]
  },
  {
    id: 229,
    chat_room_id: "p6q7r8s9-t0u1-2345-pppp-666666666666",
    nickname: "LolaP",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=35",
    messages: [
      { message_type: "guest", content: "¿Puedo usar el cupón en outlet?" },
      { message_type: "agent", content: "No, los cupones no aplican en outlet." }
    ]
  },
  {
    id: 230,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "GabrielV",
    status: "active",
    unread_count: 4,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=36",
    messages: [
      { message_type: "guest", content: "El pedido está atascado en 'procesando'." },
      { message_type: "agent", content: "Lo reviso con almacén, te aviso en 10 min." }
    ]
  },
  {
    id: 231,
    chat_room_id: "q7r8s9t0-u1v2-3456-qqqq-777777777777",
    nickname: "ClaraM",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Tienen atención los domingos?" }
    ]
  },
  {
    id: 232,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "MateoL",
    status: "active",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Carlos R.",
    avatarSrc: "https://i.pravatar.cc/150?img=37",
    messages: [
      { message_type: "guest", content: "Quiero facturar a mi empresa." },
      { message_type: "agent", content: "Perfecto, envíame los datos fiscales." }
    ]
  },
  {
    id: 233,
    chat_room_id: "",
    nickname: "CerradoOk",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Todo resuelto, gracias." }
    ]
  },
  {
    id: 234,
    chat_room_id: "r8s9t0u1-v2w3-4567-rrrr-888888888888",
    nickname: "InésG",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=38",
    messages: [
      { message_type: "guest", content: "¿Puedo usar PayPal?" },
      { message_type: "agent", content: "Sí, está disponible en el checkout." }
    ]
  },
  {
    id: 235,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "DavidR",
    status: "on_hold",
    unread_count: 3,
    agent_assigned: true,
    agent_name: "Laura G.",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "El envío dice 'devuelto al remitente'." },
      { message_type: "agent", content: "Lo investigo con la mensajería. ¿Dirección completa?" }
    ]
  },
  {
    id: 236,
    chat_room_id: "s9t0u1v2-w3x4-5678-ssss-999999999999",
    nickname: "LucíaP",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=39",
    messages: [
      { message_type: "guest", content: "¿Tienen talla infantil?" }
    ]
  },
  {
    id: 237,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "AdriánM",
    status: "active",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "https://i.pravatar.cc/150?img=40",
    messages: [
      { message_type: "guest", content: "Quiero cambiar el email de mi cuenta." },
      { message_type: "agent", content: "Necesito verificar tu identidad. ¿DNI?" }
    ]
  },
  {
    id: 238,
    chat_room_id: "",
    nickname: "Finalizado",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Gracias, todo claro." }
    ]
  },
  {
    id: 239,
    chat_room_id: "t0u1v2w3-x4y5-6789-tttt-000000000000",
    nickname: "ValeriaS",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=41",
    messages: [
      { message_type: "guest", content: "¿Tienen envío exprés?" },
      { message_type: "agent", content: "Sí, 24h por 5,99€." }
    ]
  },
  {
    id: 240,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "NicolásF",
    status: "active",
    unread_count: 3,
    agent_assigned: true,
    agent_name: "Carlos R.",
    avatarSrc: "https://i.pravatar.cc/150?img=42",
    messages: [
      { message_type: "guest", content: "El producto llegó sin accesorios." },
      { message_type: "agent", content: "Lo siento, te envío los accesorios hoy mismo." }
    ]
  },
  {
    id: 241,
    chat_room_id: "u1v2w3x4-y5z6-7890-uuuu-111111111111",
    nickname: "SofíaR",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "¿Tienen atención por WhatsApp?" }
    ]
  },
  {
    id: 242,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "EmilioG",
    status: "on_hold",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Laura G.",
    avatarSrc: "https://i.pravatar.cc/150?img=43",
    messages: [
      { message_type: "guest", content: "Quiero cancelar un artículo del pedido." },
      { message_type: "agent", content: "Dime el número de pedido y el artículo." }
    ]
  },
  {
    id: 243,
    chat_room_id: "",
    nickname: "Resuelto",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Todo OK, gracias." }
    ]
  },
  {
    id: 244,
    chat_room_id: "v2w3x4y5-z6a7-8901-vvvv-222222222222",
    nickname: "PilarT",
    status: "active",
    unread_count: 1,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=44",
    messages: [
      { message_type: "guest", content: "¿Puedo pagar con tarjeta regalo?" },
      { message_type: "agent", content: "Sí, en el paso de pago." }
    ]
  },
  {
    id: 245,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "JorgeL",
    status: "active",
    unread_count: 4,
    agent_assigned: true,
    agent_name: "Marcos A.",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "El pedido no llega y ya pasaron 5 días." },
      { message_type: "agent", content: "Abro incidencia urgente con mensajería." }
    ]
  },
  {
    id: 246,
    chat_room_id: "w3x4y5z6-a7b8-9012-wwww-333333333333",
    nickname: "CeliaN",
    status: "pending",
    unread_count: 0,
    agent_assigned: false,
    agent_name: null,
    avatarSrc: "https://i.pravatar.cc/150?img=45",
    messages: [
      { message_type: "guest", content: "¿Tienen tienda en Sevilla?" }
    ]
  },
  {
    id: 247,
    chat_room_id: "a9b8c7d6-e5f4-3210-aaaa-666666666666",
    nickname: "IkerP",
    status: "active",
    unread_count: 2,
    agent_assigned: true,
    agent_name: "Carlos R.",
    avatarSrc: "https://i.pravatar.cc/150?img=46",
    messages: [
      { message_type: "guest", content: "Quiero un cambio de talla." },
      { message_type: "agent", content: "Perfecto, envíame el pedido y talla deseada." }
    ]
  },
  {
    id: 248,
    chat_room_id: "",
    nickname: "UltimoTicket",
    status: "closed",
    unread_count: 0,
    agent_assigned: false,
    agent_name: "",
    avatarSrc: "",
    messages: [
      { message_type: "guest", content: "Gracias por la ayuda, todo resuelto." }
    ]
  }
];