# Documentación Completa del Sistema de Chat

## Tabla de Contenidos
1. [Autenticación](#autenticación)
2. [Chats Públicos (Invitados)](#chats-públicos-invitados)
3. [Gestión de Chat Rooms (Agentes)](#gestión-de-chat-rooms-agentes)
4. [Mensajes](#mensajes)
5. [Notificaciones](#notificaciones)
6. [Agentes](#agentes)

---

## Autenticación

### Login de Agentes
**Endpoint:** `POST /api/auth/login/`

**Payload:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "token": "string",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string"
  },
  "agent": {
    "id": "integer",
    "user": "integer",
    "is_available": "boolean",
    "current_active_chats": "integer",
    "max_concurrent_chats": "integer"
  }
}
```

**Respuesta de Error (400 Bad Request):**
```json
{
  "username": ["Este campo es requerido."],
  "password": ["Este campo es requerido."]
}
```

### Logout de Agentes
**Endpoint:** `POST /api/auth/logout/`

**Headers:**
```
Authorization: Token <token>
```

**Respuesta Exitosa (200 OK):**
```json
{
  "message": "Successfully logged out"
}
```

---

## Chats Públicos (Invitados)

### Paso 1: Iniciar Chat
**Endpoint:** `POST /api/chat/start_chat/`

**Payload:**
```json
{
  "initial_message": "Hola, necesito ayuda"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "session_id": "uuid-string",
  "next_step": "complete_profile",
  "message": "Por favor completa tus datos de contacto",
  "expires_in": 1800
}
```

### Paso 2: Completar Chat
**Endpoint:** `POST /api/chat/complete_chat/`

**Payload:**
```json
{
  "session_id": "uuid-string",
  "email": "usuario@ejemplo.com",
  "full_name": "Nombre Completo",
  "phone_number": "+1234567890",
  "recaptcha_token": "string"
}
```

**Respuesta Exitosa (201 Created):**
```json
{
  "success": true,
  "chat_room_id": "uuid-string",
  "user_name": "Nombre Completo",
  "message": "Chat iniciado correctamente. Un agente te contactará pronto."
}
```

**Respuesta de Error (400 Bad Request):**
```json
{
  "error": "Sesión expirada. Por favor inicia el chat nuevamente."
}
```

**Respuesta de Rate Limit (429 Too Many Requests):**
```json
{
  "error": "Has creado demasiados chats recientemente. Por favor intenta más tarde."
}
```

### Validar Sesión
**Endpoint:** `POST /api/chat/validate_session/`

**Payload:**
```json
{
  "session_id": "uuid-string"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "valid": true,
  "has_message": true,
  "created_at": "2024-01-01T12:00:00Z"
}
```

**Respuesta de Sesión Expirada:**
```json
{
  "valid": false,
  "message": "Sesión expirada o no encontrada"
}
```

### Enviar Mensaje (Invitado)
**Endpoint:** `POST /api/chat/send_message/`

**Payload:**
```json
{
  "chat_room_id": "uuid-string",
  "content": "Mensaje del usuario"
}
```

**Respuesta Exitosa (201 Created):**
```json
{
  "id": "uuid-string",
  "chat_room": "uuid-string",
  "sender_type": "user",
  "content": "Mensaje del usuario",
  "message_type": "text",
  "is_read": false,
  "created_at": "2024-01-01T12:00:00Z"
}
```

### Obtener Estado del Chat
**Endpoint:** `GET /api/chat/get_chat_status/?chat_room_id=uuid-string`

**Respuesta Exitosa (200 OK):**
```json
{
  "chat_room_id": "uuid-string",
  "status": "waiting|active|resolved|closed",
  "agent_assigned": true,
  "agent_name": "Nombre del Agente",
  "created_at": "2024-01-01T12:00:00Z",
  "unread_messages": 3
}
```

---

## Gestión de Chat Rooms (Agentes)

### Lista de Chats Filtrados
**Endpoint:** `GET /api/chat-rooms/filtered_chats/?status=waiting&agent_id=1&page=1&page_size=20`

**Headers:**
```
Authorization: Token <token>
```

**Respuesta Exitosa (200 OK):**
```json
{
  "chats": [
    {
      "id": "uuid-string",
      "chat_user": {
        "id": "integer",
        "full_name": "string",
        "email": "string",
        "phone_number": "string"
      },
      "initial_message": "string",
      "status": "waiting",
      "agent": null,
      "created_at": "2024-01-01T12:00:00Z",
      "updated_at": "2024-01-01T12:00:00Z",
      "unread_messages_count": 3
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_chats": 95,
    "has_next": true,
    "has_previous": false
  }
}
```

### Chats en Espera
**Endpoint:** `GET /api/chat-rooms/waiting_chats/?page=1&page_size=50`

**Respuesta Exitosa (200 OK):**
```json
{
  "chats": [
    {
      "id": "uuid-string",
      "chat_user": {
        "full_name": "string",
        "email": "string"
      },
      "initial_message": "string",
      "created_at": "2024-01-01T12:00:00Z",
      "priority": "high|medium|low",
      "waiting_time_minutes": 15
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 3,
    "total_chats": 125,
    "has_next": true,
    "has_previous": false
  }
}
```

### Mis Chats
**Endpoint:** `GET /api/chat-rooms/my_chats/?status=active&page=1&page_size=20`

**Respuesta Exitosa (200 OK):**
```json
{
  "chats": [
    {
      "id": "uuid-string",
      "chat_user": {
        "id": "integer",
        "full_name": "string",
        "email": "string",
        "phone_number": "string"
      },
      "initial_message": "string",
      "status": "active",
      "agent": {
        "id": "integer",
        "user": {
          "first_name": "string",
          "last_name": "string"
        }
      },
      "messages": [
        {
          "id": "uuid-string",
          "sender_type": "user|agent|system",
          "content": "string",
          "message_type": "text|system",
          "is_read": true,
          "created_at": "2024-01-01T12:00:00Z"
        }
      ],
      "created_at": "2024-01-01T12:00:00Z",
      "updated_at": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 2,
    "total_chats": 35,
    "has_next": true,
    "has_previous": false
  },
  "agent": {
    "id": 1,
    "name": "Nombre Agente",
    "current_chats": 3
  }
}
```

### Todos los Chats (Solo Superusuarios)
**Endpoint:** `GET /api/chat-rooms/all_chats/?status=active&agent_id=1&page=1&page_size=50`

**Respuesta Exitosa (200 OK):**
```json
{
  "chats": [
    {
      "id": "uuid-string",
      "chat_user": {
        "id": "integer",
        "full_name": "string",
        "email": "string",
        "phone_number": "string"
      },
      "initial_message": "string",
      "status": "active",
      "agent": {
        "id": "integer",
        "user": {
          "first_name": "string",
          "last_name": "string"
        }
      },
      "messages": [...],
      "created_at": "2024-01-01T12:00:00Z",
      "updated_at": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "total_chats": 485,
    "has_next": true,
    "has_previous": false
  }
}
```

### Obtener Mensajes de un Chat
**Endpoint:** `GET /api/chat-rooms/{id}/messages/`

**Respuesta Exitosa (200 OK):**
```json
[
  {
    "id": "uuid-string",
    "sender_type": "user",
    "content": "Mensaje del usuario",
    "message_type": "text",
    "is_read": true,
    "created_at": "2024-01-01T12:00:00Z",
    "user_sender": {
      "full_name": "string",
      "email": "string"
    }
  }
]
```

### Enviar Mensaje (Agente)
**Endpoint:** `POST /api/chat-rooms/{id}/send_message/`

**Payload:**
```json
{
  "content": "Respuesta del agente",
  "message_type": "text"
}
```

**Respuesta Exitosa (201 Created):**
```json
{
  "id": "uuid-string",
  "chat_room": "uuid-string",
  "sender_type": "agent",
  "content": "Respuesta del agente",
  "message_type": "text",
  "is_read": false,
  "created_at": "2024-01-01T12:00:00Z",
  "agent_sender": {
    "id": "integer",
    "user": {
      "first_name": "string",
      "last_name": "string"
    }
  }
}
```

### Tomar Chat
**Endpoint:** `POST /api/chat-rooms/{id}/take_chat/`

**Respuesta Exitosa (200 OK):**
```json
{
  "id": "uuid-string",
  "chat_user": {...},
  "initial_message": "string",
  "status": "active",
  "agent": {
    "id": "integer",
    "user": {...}
  },
  "messages": [...],
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:05:00Z"
}
```

**Respuesta de Error (400 Bad Request):**
```json
{
  "error": "No puedes tomar más chats en este momento"
}
```

### Resolver Chat
**Endpoint:** `POST /api/chat-rooms/{id}/resolve/`

**Respuesta Exitosa (200 OK):**
```json
{
  "id": "uuid-string",
  "status": "resolved",
  // ... resto de campos del chat
}
```

### Cerrar Chat
**Endpoint:** `POST /api/chat-rooms/{id}/close/`

**Respuesta Exitosa (200 OK):**
```json
{
  "id": "uuid-string",
  "status": "closed",
  // ... resto de campos del chat
}
```

### Asignar Agente (Superusuarios)
**Endpoint:** `POST /api/chat-rooms/{id}/assign_agent/`

**Payload:**
```json
{
  "agent_id": 1
}
```

### Transferir Chat
**Endpoint:** `POST /api/chat-rooms/{id}/transfer_chat/`

**Payload:**
```json
{
  "agent_id": 2
}
```

### Desasignar Agente (Superusuarios)
**Endpoint:** `POST /api/chat-rooms/{id}/unassign_agent/`

---

## Mensajes

### Enviar Mensaje (Agente)
**Endpoint:** `POST /api/messages/`

**Payload:**
```json
{
  "chat_room_id": "uuid-string",
  "content": "Mensaje del agente",
  "message_type": "text",
  "attachment": null
}
```

### Marcar Mensaje como Leído
**Endpoint:** `POST /api/messages/{id}/mark_read/`

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Mensaje marcado como leído",
  "data": {
    "id": "uuid-string",
    "is_read": true,
    "read_at": "2024-01-01T12:00:00Z"
  }
}
```

### Marcar Múltiples Mensajes como Leídos
**Endpoint:** `POST /api/messages/mark_bulk_read/`

**Payload:**
```json
{
  "message_ids": ["uuid1", "uuid2", "uuid3"]
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "3 mensajes marcados como leídos",
  "updated_count": 3,
  "total_requested": 3,
  "valid_messages": 3
}
```

### Marcar Todo el Chat como Leído
**Endpoint:** `POST /api/messages/mark_chat_read/`

**Payload:**
```json
{
  "chat_room_id": "uuid-string"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "5 mensajes marcados como leídos",
  "updated_count": 5,
  "chat_room_id": "uuid-string",
  "user_type": "agent"
}
```

### Conteo de Mensajes No Leídos
**Endpoint:** `GET /api/messages/unread_count/?chat_room_id=uuid-string`

**Respuesta Exitosa (200 OK):**
```json
{
  "unread_count": 3
}
```

### Obtener Mensajes por Chat
**Endpoint:** `GET /api/messages/by_chat/?chat_room_id=uuid-string`

**Respuesta Exitosa (200 OK):**
```json
{
  "chat_room_id": "uuid-string",
  "messages": [...],
  "total_messages": 15,
  "auto_marked_read": 3,
  "chat_status": "active"
}
```

### Enviar Mensaje (Invitado)
**Endpoint:** `POST /api/messages/send_guest_message/`

**Payload:**
```json
{
  "chat_room_id": "uuid-string",
  "content": "Mensaje del usuario invitado"
}
```

### Mensajes Recientes
**Endpoint:** `GET /api/messages/recent_chats/?limit=10`

**Respuesta Exitosa (200 OK):**
```json
{
  "recent_messages": [...],
  "total_returned": 10
}
```

---

## Notificaciones

### Notificaciones de Agentes
**Endpoint:** `GET /api/notifications/`

**Respuesta Exitosa (200 OK):**
```json
{
  "notifications": [
    {
      "id": "uuid-string",
      "notification_type": "new_chat|new_message|chat_assigned|chat_transferred|chat_resolved",
      "title": "string",
      "message": "string",
      "chat_room": "uuid-string",
      "is_read": false,
      "created_at": "2024-01-01T12:00:00Z"
    }
  ],
  "unread_count": 5,
  "total_count": 15
}
```

### Marcar Notificaciones como Leídas
**Endpoint:** `POST /api/notifications/mark_read/`

**Payload:**
```json
{
  "notification_ids": ["uuid1", "uuid2"]
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "2 notificaciones marcadas como leídas",
  "updated_count": 2
}
```

### Marcar Todas como Leídas
**Endpoint:** `POST /api/notifications/mark_all_read/`

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Todas las notificaciones (5) marcadas como leídas",
  "updated_count": 5
}
```

### Conteo de No Leídas
**Endpoint:** `GET /api/notifications/unread_count/`

**Respuesta Exitosa (200 OK):**
```json
{
  "unread_count": 3
}
```

### Notificaciones de Usuarios Invitados
**Endpoint:** `GET /api/user-notifications/get_notifications/?chat_room_id=uuid-string`

**Respuesta Exitosa (200 OK):**
```json
{
  "notifications": [
    {
      "id": "uuid-string",
      "notification_type": "new_message|agent_joined|chat_resolved",
      "title": "string",
      "message": "string",
      "is_read": false,
      "created_at": "2024-01-01T12:00:00Z"
    }
  ],
  "unread_count": 2,
  "total_count": 8
}
```

### Marcar Notificaciones de Usuario como Leídas
**Endpoint:** `POST /api/user-notifications/mark_read/`

**Payload:**
```json
{
  "chat_room_id": "uuid-string",
  "notification_ids": ["uuid1", "uuid2"]
}
```

---

## Agentes

### Lista de Agentes Disponibles
**Endpoint:** `GET /api/agents/`

**Headers:**
```
Authorization: Token <token>
```

**Respuesta Exitosa (200 OK):**
```json
[
  {
    "id": 1,
    "user": {
      "id": 1,
      "first_name": "string",
      "last_name": "string",
      "email": "string"
    },
    "is_available": true,
    "current_active_chats": 2,
    "max_concurrent_chats": 5
  }
]
```

---

## Flujos Principales

### Flujo de Chat para Invitados
1. `POST /api/chat/start_chat/` → Obtener session_id
2. `POST /api/chat/complete_chat/` → Crear chat room
3. `GET /api/chat/get_chat_status/` → Verificar estado
4. `POST /api/chat/send_message/` → Enviar mensajes
5. (Opcional) `POST /api/chat/validate_session/` → Validar sesión

### Flujo de Agente
1. `POST /api/auth/login/` → Obtener token
2. `GET /api/chat-rooms/waiting_chats/` → Ver chats disponibles
3. `POST /api/chat-rooms/{id}/take_chat/` → Tomar chat
4. `GET /api/chat-rooms/{id}/messages/` → Ver mensajes
5. `POST /api/chat-rooms/{id}/send_message/` → Responder
6. `POST /api/chat-rooms/{id}/resolve/` → Resolver chat
7. `POST /api/auth/logout/` → Cerrar sesión

### Flujo de Superusuario
1. `GET /api/chat-rooms/all_chats/` → Ver todos los chats
2. `POST /api/chat-rooms/{id}/assign_agent/` → Asignar agentes
3. `POST /api/chat-rooms/{id}/unassign_agent/` → Desasignar agentes
4. `GET /api/agents/` → Gestionar agentes

Esta documentación cubre todos los endpoints, payloads y respuestas esperadas del sistema de chat completo.