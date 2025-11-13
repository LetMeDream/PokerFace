export const endpoints = {
  API_BASE_URL: import.meta.env.VITE_API_URL,
  LOGIN: '/auth/login/',
  LOGINJWT: '/token/',
  REFRESH_TOKEN: '/token/refresh/',
  LOGOUT: '/auth/logout/',
  WAITING_CHATS: `/chat-rooms/waiting_chats/`,
  INITIAL_MESSAGE: `/chat/start_chat/`,
  COMPLETE_CHAT: `/chat/complete_chat/`,
  GUEST_SEND_MESSAGE: `/chat/send_message/`,
  ASSIGNED_CHATS: `/chat-rooms/my_chats/`,
  TAKE_CHAT: (id: number | string | null | undefined) => `/chat-rooms/${id}/take_chat/`,
  UNASSING_AGENT: (id: number | string | null | undefined) => `/chat-rooms/${id}/unassign_agent/`,
  RESOLVE_CHAT: (id: number | string | null | undefined) => `/chat-rooms/${id}/resolve/`
}