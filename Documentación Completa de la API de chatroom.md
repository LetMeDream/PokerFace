# 🚀 Documentación Completa de la API de Chat

## 📋 Tabla de Contenidos
1. [🔐 Autenticación](#-autenticación)
2. [👤 Gestión de Usuarios](#-gestión-de-usuarios)
3. [💬 Chat Rooms](#-chat-rooms)
4. [👥 Funcionalidad para Invitados](#-funcionalidad-para-invitados)
5. [🔔 Notificaciones](#-notificaciones)
6. [🎯 Gestión de Agentes](#-gestión-de-agentes)
7. [📝 Mensajes](#-mensajes)

---

## 🔐 Autenticación

### 1. **Login de Usuario**
**¿Qué hace?** Autentica a un usuario existente y devuelve un token de acceso.

**Endpoint:** `POST /api/auth/login/`

**Payload:**
```json
{
  "username": "usuario123",
  "password": "contraseña123"
}
```

**Respuesta esperada:**
```json
{
  "token": "abc123token456",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com",
    "first_name": "Juan",
    "last_name": "Pérez",
    "is_active": true
  },
  "chat_profile": {
    "id": 1,
    "is_online": true,
    "last_seen": "2024-01-15T10:30:00Z",
    "full_name": "Juan Pérez"
  }
}
```

### 2. **Registro de Usuario**
**¿Qué hace?** Crea una nueva cuenta de usuario y perfil de chat.

**Endpoint:** `POST /api/auth/register/`

**Payload:**
```json
{
  "username": "nuevo_usuario",
  "email": "nuevo@ejemplo.com",
  "first_name": "María",
  "last_name": "García",
  "password": "contraseñaSegura123",
  "password_confirm": "contraseñaSegura123"
}
```

**Respuesta:** Similar a login, con datos del nuevo usuario.

### 3. **Logout**
**¿Qué hace?** Cierra la sesión del usuario y marca como offline.

**Endpoint:** `POST /api/auth/logout/`

**Headers:** `Authorization: Token abc123token456`

**Respuesta:**
```json
{
  "message": "Successfully logged out"
}
```

---

## 👤 Gestión de Usuarios

### 4. **Obtener Perfil de Chat**
**¿Qué hace?** Obtiene el perfil de chat del usuario autenticado.

**Endpoint:** `GET /api/chatusers/me/`

**Headers:** `Authorization: Token abc123token456`

**Respuesta:**
```json
{
  "id": 1,
  "user": {...},
  "username": "usuario123",
  "phone_number": "+123456789",
  "avatar": "/avatars/foto.jpg",
  "is_online": true,
  "last_seen": "2024-01-15T10:30:00Z",
  "full_name": "Juan Pérez"
}
```

### 5. **Actualizar Estado en Línea**
**¿Qué hace?** Actualiza el estado de conexión del usuario.

**Endpoint:** `POST /api/chatusers/update_status/`

**Headers:** `Authorization: Token abc123token456`

**Payload:**
```json
{
  "is_online": false
}
```

---

## 💬 Chat Rooms

### 6. **Crear Chat Room (Usuario Autenticado)**
**¿Qué hace?** Crea una nueva sala de chat para usuarios registrados.

**Endpoint:** `POST /api/chatrooms/`

**Headers:** `Authorization: Token abc123token456`

**Payload:**
```json
{
  "subject": "Problema con mi pedido",
  "description": "No he recibido el pedido #12345",
  "priority": "high",
  "tags": "pedido,problema,envío"
}
```

**Respuesta esperada:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "waiting",
  "priority": "high",
  "subject": "Problema con mi pedido",
  "message_count": 1,
  "last_message": {
    "content": "Chat room created. Waiting for agent assignment...",
    "sender": "system"
  },
  "unread_count": 0
}
```

### 7. **Listar Chat Rooms del Usuario**
**¿Qué hace?** Obtiene todas las salas de chat del usuario autenticado.

**Endpoint:** `GET /api/chatrooms/`

**Headers:** `Authorization: Token abc123token456`

### 8. **Asignar Agente a Chat Room**
**¿Qué hace?** Asigna un agente disponible a una sala de chat.

**Endpoint:** `POST /api/chatrooms/{id}/assign_agent/`

**Headers:** `Authorization: Token abc123token456`

**Payload:**
```json
{
  "agent_id": 2
}
```

### 9. **Resolver Chat**
**¿Qué hace?** Marca un chat como resuelto y libera al agente.

**Endpoint:** `POST /api/chatrooms/{id}/resolve/`

**Headers:** `Authorization: Token abc123token456`

### 10. **Cerrar Chat**
**¿Qué hace?** Cierra permanentemente una sala de chat.

**Endpoint:** `POST /api/chatrooms/{id}/close/`

**Headers:** `Authorization: Token abc123token456`

---

## 👥 Funcionalidad para Invitados

### 11. **Iniciar Chat como Invitado**
**¿Qué hace?** Permite a usuarios no registrados iniciar un chat sin crear cuenta.

**Endpoint:** `POST /api/chatrooms/start_guest_chat/`

**Payload:**
```json
{
  "nickname": "Invitado123",
  "subject": "Consulta sobre productos",
  "description": "Quiero información sobre precios",
  "recaptcha_token": "test_token",
  "priority": "medium"
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "guest_session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "nickname": "Invitado123",
  "status": "waiting",
  "message": "Chat de invitado iniciado correctamente"
}
```

### 12. **Enviar Mensaje como Invitado**
**¿Qué hace?** Permite a invitados enviar mensajes usando su session ID.

**Endpoint:** `POST /api/messages/send_guest_message/`

**Headers:** `Guest-Session-ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Payload:**
```json
{
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "content": "Hola, tengo una pregunta",
  "message_type": "text"
}
```

### 13. **Obtener Mensajes de Invitado**
**¿Qué hace?** Recupera todos los mensajes de un chat de invitado.

**Endpoint:** `GET /api/messages/guest_messages/?chat_room_id={chat_room_id}`

**Headers:** `Guest-Session-ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Respuesta:**
```json
{
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "nickname": "Invitado123",
  "status": "active",
  "unread_count": 2,
  "agent_assigned": true,
  "agent_name": "Ana López",
  "messages": [...]
}
```

### 14. **Editar Mensaje de Invitado**
**¿Qué hace?** Permite editar mensajes propios (hasta 5 minutos después).

**Endpoint:** `PUT /api/messages/{message_id}/edit_guest_message/`

**Headers:** `Guest-Session-ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Payload:**
```json
{
  "content": "Mensaje corregido"
}
```

### 15. **Marcar Mensajes como Leídos (Invitado)**
**¿Qué hace?** Marca mensajes del agente como leídos.

**Endpoint:** `POST /api/messages/mark_all_guest_messages_read/`

**Headers:** `Guest-Session-ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Payload:**
```json
{
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012"
}
```

---

## 🔔 Notificaciones

### 16. **Obtener Notificaciones de Invitado**
**¿Qué hace?** Recupera notificaciones del sistema para el invitado.

**Endpoint:** `GET /api/notifications/guest_notifications/`

**Headers:** `Guest-Session-ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Respuesta:**
```json
{
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "notifications": [
    {
      "id": "notif123",
      "notification_type": "agent_assigned",
      "title": "Agente Asignado",
      "message": "Agente Ana López ha sido asignado a tu chat",
      "is_read": false,
      "created_at": "2024-01-15T10:40:00Z"
    }
  ],
  "total_unread": 3
}
```

### 17. **Marcar Notificación como Leída (Invitado)**
**¿Qué hace?** Marca una notificación específica como leída.

**Endpoint:** `POST /api/notifications/mark_guest_notification_read/`

**Headers:** `Guest-Session-ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Payload:**
```json
{
  "notification_id": "notif123"
}
```

### 18. **Marcar Todas las Notificaciones como Leídas**
**¿Qué hace?** Marca todas las notificaciones no leídas como leídas.

**Endpoint:** `POST /api/notifications/mark_all_guest_notifications_read/`

**Headers:** `Guest-Session-ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### 19. **Contar Notificaciones No Leídas**
**¿Qué hace?** Obtiene el número de notificaciones y mensajes no leídos.

**Endpoint:** `GET /api/notifications/guest_unread_count/`

**Headers:** `Guest-Session-ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Respuesta:**
```json
{
  "unread_notifications_count": 2,
  "unread_messages_count": 3,
  "total_unread": 5
}
```

---

## 🎯 Gestión de Agentes

### 20. **Listar Agentes Disponibles**
**¿Qué hace?** Obtiene lista de agentes disponibles para asignar chats.

**Endpoint:** `GET /api/agents/available/`

**Headers:** `Authorization: Token abc123token456`

**Respuesta:**
```json
[
  {
    "id": 2,
    "employee_id": "AGT001",
    "full_name": "Ana López",
    "department": "Customer Support",
    "is_available": true,
    "current_active_chats": 2,
    "max_concurrent_chats": 5,
    "rating": "4.85",
    "can_take_chat": true
  }
]
```

### 21. **Alternar Disponibilidad del Agente**
**¿Qué hace?** Permite a un agente cambiar su estado disponible/no disponible.

**Endpoint:** `POST /api/agents/{id}/toggle_availability/`

**Headers:** `Authorization: Token abc123token456`

---

## 📝 Mensajes

### 22. **Enviar Mensaje (Usuario Autenticado)**
**¿Qué hace?** Envía un mensaje desde un usuario autenticado.

**Endpoint:** `POST /api/messages/`

**Headers:** `Authorization: Token abc123token456`

**Payload:**
```json
{
  "chat_room_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "content": "Este es mi mensaje",
  "message_type": "text"
}
```

### 23. **Obtener Mensajes de una Sala**
**¿Qué hace?** Recupera todos los mensajes de una sala específica.

**Endpoint:** `GET /api/chatrooms/{id}/messages/`

**Headers:** `Authorization: Token abc123token456`

### 24. **Marcar Mensaje como Leído**
**¿Qué hace?** Marca un mensaje específico como leído.

**Endpoint:** `POST /api/messages/{id}/mark_read/`

**Headers:** `Authorization: Token abc123token456`

### 25. **Editar Mensaje**
**¿Qué hace?** Permite editar el contenido de un mensaje propio.

**Endpoint:** `PUT /api/messages/{id}/edit/`

**Headers:** `Authorization: Token abc123token456`

**Payload:**
```json
{
  "content": "Mensaje editado"
}
```

---

## ⚠️ Manejo de Errores

### Errores Comunes:

**Validación fallida:**
```json
{
  "error": "Campo requerido",
  "detail": {
    "username": ["Este campo es requerido."]
  }
}
```

**Sin permisos:**
```json
{
  "error": "Permission denied"
}
```

**Sesión de invitado inválida:**
```json
{
  "error": "Chat no encontrado o session inválida"
}
```

**Agente no disponible:**
```json
{
  "error": "Agent is not available or has reached maximum concurrent chats"
}
```

---

## 🔐 Resumen de Headers Requeridos

| Tipo de Usuario | Header | Ejemplo |
|----------------|--------|---------|
| **Usuario Autenticado** | `Authorization` | `Token abc123token456` |
| **Invitado** | `Guest-Session-ID` | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| **Ambos** | `Content-Type` | `application/json` |

---

## 🎯 Flujos Principales

### Flujo de Usuario Registrado:
1. Login → Obtener token
2. Crear chat room → Recibir ID de sala
3. Enviar mensajes → Comunicarse con agente
4. Recibir notificaciones → Estar informado

### Flujo de Invitado:
1. Iniciar chat → Obtener session ID y chat room ID
2. Enviar mensajes → Usando headers de sesión
3. Consultar mensajes → Mantener conversación
4. Recibir notificaciones → Updates del sistema

