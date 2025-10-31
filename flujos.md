# Documentación Completa de Flujos - Sistema de Chat

## Índice de Flujos
1. [Flujo de Chat para Usuarios Invitados](#flujo-de-chat-para-usuarios-invitados)
2. [Flujo de Autenticación de Agentes](#flujo-de-autenticación-de-agentes)
3. [Flujo de Gestión de Chats por Agentes](#flujo-de-gestión-de-chats-por-agentes)
4. [Flujo de Mensajería](#flujo-de-mensajería)
5. [Flujo de Notificaciones](#flujo-de-notificaciones)
6. [Flujo de Resolución de Chats](#flujo-de-resolución-de-chats)
7. [Flujo de Gestión de Usuarios Invitados](#flujo-de-gestión-de-usuarios-invitados)

---

## Flujo de Chat para Usuarios Invitados

### Diagrama de Secuencia:
```
Usuario → Iniciar Chat → Completar Perfil → Chat Activo → Enviar/Recibir Mensajes → Cierre
```

### Pasos Detallados:

#### 1. Inicio de Sesión de Chat
```javascript
// Paso 1: Iniciar sesión de chat
POST /api/chat/start_chat/
{
  "initial_message": "Hola, necesito ayuda con mi pedido"
}

// Respuesta
{
  "success": true,
  "session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "next_step": "complete_profile",
  "message": "Por favor completa tus datos de contacto",
  "expires_in": 1800
}
```

#### 2. Completar Perfil
```javascript
// Paso 2: Completar información de contacto
POST /api/chat/complete_chat/
{
  "session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "usuario@ejemplo.com",
  "full_name": "Juan Pérez",
  "phone_number": "+1234567890",
  "recaptcha_token": "abc123def456"
}

// Respuesta exitosa
{
  "success": true,
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "user_name": "Juan Pérez",
  "message": "Chat iniciado correctamente. Un agente te contactará pronto."
}
```

#### 3. Validar Sesión (opcional, para recuperar)
```javascript
// Validar si la sesión sigue activa (útil al recargar página)
POST /api/chat/validate_session/
{
  "session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}

// Respuesta
{
  "valid": true,
  "has_message": true,
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### 4. Enviar Mensajes
```javascript
// Enviar mensaje como usuario invitado
POST /api/chat/send_message/
{
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "content": "Mi número de orden es 12345"
}

// O alternativamente
POST /api/messages/send_guest_message/
{
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "content": "Mi número de orden es 12345"
}
```

#### 5. Verificar Estado del Chat
```javascript
// Consultar estado del chat periódicamente
GET /api/chat/get_chat_status/?chat_room_id=b2c3d4e5-f6g7-8901-bcde-f23456789012

// Respuesta
{
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "status": "active",
  "agent_assigned": true,
  "agent_name": "María García",
  "created_at": "2024-01-15T10:32:00Z",
  "unread_messages": 2
}
```

#### 6. Recibir Notificaciones (Usuario)
```javascript
// Obtener notificaciones del usuario
GET /api/user-notifications/get_notifications/?chat_room_id=b2c3d4e5-f6g7-8901-bcde-f23456789012

// Marcar notificaciones como leídas
POST /api/user-notifications/mark_read/
{
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "notification_ids": ["n1", "n2"] // opcional
}
```

---

## Flujo de Autenticación de Agentes

### Diagrama de Secuencia:
```
Agente → Login → Obtener Token → Usar en Requests → Logout
```

### Pasos Detallados:

#### 1. Login
```javascript
// Autenticación del agente
POST /api/auth/login/
{
  "username": "agente1",
  "password": "password123"
}

// Respuesta exitosa
{
  "token": "abc123token456def789",
  "user": {
    "id": 1,
    "username": "agente1",
    "email": "agente1@empresa.com",
    "first_name": "Carlos",
    "last_name": "López"
  },
  "agent": {
    "id": "agent-uuid-123",
    "is_available": true,
    "specialty": "soporte_general"
    // ... más campos del agente
  }
}
```

#### 2. Usar Token en Requests
```javascript
// Incluir en headers de todas las requests autenticadas
Headers: {
  "Authorization": "Token abc123token456def789",
  "Content-Type": "application/json"
}
```

#### 3. Logout
```javascript
// Cerrar sesión
POST /api/auth/logout/
// Headers: Authorization: Token abc123token456def789

// Respuesta
{
  "message": "Successfully logged out"
}
```

---

## Flujo de Gestión de Chats por Agentes

### Diagrama de Secuencia:
```
Agente → Ver Lista Chats → Filtrar/Ordenar → Seleccionar Chat → Gestionar Mensajes → Resolver/Cerrar
```

### Pasos Detallados:

#### 1. Listar Chats Disponibles
```javascript
// Obtener lista de chats con filtros
GET /api/chatrooms/filtered_chats/?status=waiting&page=1&page_size=20

// Respuesta
{
  "chats": [
    {
      "id": "chat-uuid-1",
      "subject": "Chat de Juan Pérez",
      "status": "waiting",
      "chat_user": {
        "full_name": "Juan Pérez",
        "email": "juan@email.com"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "unread_messages_count": 3,
      "last_message": "Hola, necesito ayuda...",
      "last_message_at": "2024-01-15T10:31:00Z"
    }
    // ... más chats
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_chats": 95,
    "has_next": true,
    "has_previous": false
  },
  "filters": {
    "status": "waiting",
    "page": 1,
    "page_size": 20
  }
}
```

#### 2. Ver Detalles de Chat Específico
```javascript
// Obtener detalles completos de un chat
GET /api/chatrooms/chat-uuid-1/

// Respuesta con detalles extendidos
{
  "id": "chat-uuid-1",
  "subject": "Chat de Juan Pérez",
  "status": "active",
  "chat_user": {
    "full_name": "Juan Pérez",
    "email": "juan@email.com",
    "phone_number": "+1234567890"
  },
  "agent": {
    "id": "agent-uuid-123",
    "user": {
      "first_name": "Carlos",
      "last_name": "López"
    }
  },
  "created_at": "2024-01-15T10:30:00Z",
  "initial_message": "Hola, necesito ayuda con mi pedido"
}
```

---

## Flujo de Mensajería

### Diagrama de Secuencia:
```
Usuario/Agente → Enviar Mensaje → Notificación → Marcar como Leído → Historial
```

### Pasos Detallados:

#### 1. Enviar Mensaje como Agente
```javascript
// Opción 1: Desde el endpoint de chatrooms
POST /api/chatrooms/chat-uuid-1/send_message/
{
  "content": "Hola Juan, soy Carlos. ¿En qué puedo ayudarte?",
  "message_type": "text"
}

// Opción 2: Desde el endpoint general de mensajes
POST /api/messages/
{
  "chat_room_id": "chat-uuid-1",
  "content": "Hola Juan, soy Carlos. ¿En qué puedo ayudarte?",
  "message_type": "text"
}
```

#### 2. Obtener Mensajes de un Chat
```javascript
// Obtener historial de mensajes (auto-marca como leídos)
GET /api/chatrooms/chat-uuid-1/messages/

// O alternativamente
GET /api/messages/by_chat/?chat_room_id=chat-uuid-1

// Respuesta
[
  {
    "id": "msg-1",
    "content": "Hola, necesito ayuda con mi pedido",
    "sender_type": "user",
    "message_type": "text",
    "created_at": "2024-01-15T10:30:00Z",
    "is_read": true,
    "read_at": "2024-01-15T10:35:00Z"
  },
  {
    "id": "msg-2",
    "content": "Hola Juan, soy Carlos. ¿En qué puedo ayudarte?",
    "sender_type": "agent",
    "message_type": "text",
    "created_at": "2024-01-15T10:35:00Z",
    "is_read": true,
    "read_at": "2024-01-15T10:36:00Z",
    "agent_sender": {
      "user": {
        "first_name": "Carlos",
        "last_name": "López"
      }
    }
  }
]
```

#### 3. Gestión de Estados de Lectura
```javascript
// Marcar mensaje específico como leído
POST /api/messages/msg-1/mark_read/

// Marcar múltiples mensajes como leídos
POST /api/messages/mark_bulk_read/
{
  "message_ids": ["msg-1", "msg-2", "msg-3"]
}

// Marcar todo un chat como leído
POST /api/messages/mark_chat_read/
{
  "chat_room_id": "chat-uuid-1"
}

// Ver conteo de no leídos
GET /api/messages/unread_count/?chat_room_id=chat-uuid-1
// Respuesta: {"unread_count": 3}
```

---

## Flujo de Notificaciones

### Diagrama de Secuencia:
```
Evento → Crear Notificación → Listar Notificaciones → Marcar como Leídas → Actualizar Contador
```

### Pasos para Agentes:

#### 1. Obtener Notificaciones
```javascript
GET /api/notifications/

// Respuesta
{
  "notifications": [
    {
      "id": "notif-1",
      "type": "new_chat",
      "title": "Nuevo chat asignado",
      "message": "Tienes un nuevo chat de Juan Pérez",
      "chat_room_id": "chat-uuid-1",
      "is_read": false,
      "created_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": "notif-2",
      "type": "new_message",
      "title": "Nuevo mensaje",
      "message": "Juan Pérez ha enviado un mensaje",
      "chat_room_id": "chat-uuid-1",
      "is_read": true,
      "read_at": "2024-01-15T10:35:00Z",
      "created_at": "2024-01-15T10:32:00Z"
    }
  ],
  "unread_count": 1,
  "total_count": 2
}
```

#### 2. Gestionar Estados de Notificaciones
```javascript
// Marcar notificaciones específicas como leídas
POST /api/notifications/mark_read/
{
  "notification_ids": ["notif-1", "notif-2"]
}

// Marcar todas como leídas
POST /api/notifications/mark_all_read/

// Ver solo el contador
GET /api/notifications/unread_count/
// Respuesta: {"unread_count": 5}
```

---

## Flujo de Resolución de Chats

### Diagrama de Secuencia:
```
Agente → Revisar Chat → Resolver/Cerrar → Notificación → Historial
```

### Pasos Detallados:

#### 1. Resolver Chat (marcar como completado)
```javascript
POST /api/chatrooms/chat-uuid-1/resolve/

// Respuesta con chat actualizado
{
  "id": "chat-uuid-1",
  "status": "resolved",
  "resolved_at": "2024-01-15T11:00:00Z",
  // ... otros campos
}
```

#### 2. Cerrar Chat (definitivo)
```javascript
POST /api/chatrooms/chat-uuid-1/close/

// Respuesta con chat actualizado
{
  "id": "chat-uuid-1",
  "status": "closed",
  "closed_at": "2024-01-15T11:00:00Z",
  // ... otros campos
}
```

---

## Flujo de Gestión de Usuarios Invitados

### Diagrama de Secuencia:
```
Usuario → Iniciar Chat → Crear Perfil → Historial → Notificaciones
```

### Pasos Detallados:

#### 1. Gestión de Notificaciones de Usuario
```javascript
// Obtener notificaciones del usuario invitado
GET /api/user-notifications/get_notifications/?chat_room_id=chat-uuid-1

// Respuesta
{
  "notifications": [
    {
      "id": "user-notif-1",
      "type": "agent_joined",
      "title": "Agente asignado",
      "message": "Carlos López se ha unido al chat",
      "is_read": false,
      "created_at": "2024-01-15T10:35:00Z"
    },
    {
      "id": "user-notif-2",
      "type": "new_message",
      "title": "Nuevo mensaje",
      "message": "Carlos López ha enviado un mensaje",
      "is_read": true,
      "created_at": "2024-01-15T10:36:00Z"
    }
  ],
  "unread_count": 1,
  "total_count": 2
}
```

#### 2. Marcar Notificaciones como Leídas
```javascript
// Marcar notificaciones específicas
POST /api/user-notifications/mark_read/
{
  "chat_room_id": "chat-uuid-1",
  "notification_ids": ["user-notif-1", "user-notif-2"]
}

// Marcar todas las notificaciones del chat
POST /api/user-notifications/mark_read/
{
  "chat_room_id": "chat-uuid-1"
}
```

---

## Flujos de Error y Casos Especiales

### 1. Sesión Expirada
```javascript
// Al intentar completar chat con sesión expirada
POST /api/chat/complete_chat/
{
  "session_id": "session-expirada"
}

// Respuesta de error
{
  "error": "Sesión expirada. Por favor inicia el chat nuevamente."
}
// Status: 400 Bad Request
```

### 2. Rate Limit Excedido
```javascript
// Al crear demasiados chats desde una IP
{
  "error": "Has creado demasiados chats recientemente. Por favor intenta más tarde."
}
// Status: 429 Too Many Requests
```

### 3. Chat Cerrado
```javascript
// Intentar enviar mensaje a chat cerrado
{
  "error": "No se pueden enviar mensajes en un chat cerrado"
}
// Status: 400 Bad Request
```

### 4. Sin Permisos
```javascript
// Agente intentando acceder a chat no asignado
{
  "error": "No tienes permisos para enviar mensajes en este chat"
}
// Status: 403 Forbidden
```

---

