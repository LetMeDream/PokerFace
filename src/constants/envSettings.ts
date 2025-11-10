export const endpoints = {
  API_BASE_URL: import.meta.env.VITE_API_URL,
  LOGIN: '/auth/login/',
  LOGOUT: '/auth/logout/',
  WAITING_CHATS: `/chat-rooms/waiting_chats/`,
  INITIAL_MESSAGE: `/chat/start_chat/`
}