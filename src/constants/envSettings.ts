export const envSettings = {
  API_BASE_URL: import.meta.env.VITE_API_URL,
  LOGIN: '/auth/login/',
  LOGOUT: '/auth/logout/',
  WAITING_CHATS: ({ page, pageSize }: { page: number; pageSize: number }) => `/chat-rooms/waiting_chats/?page=${page}&page_size=${pageSize}`,
}