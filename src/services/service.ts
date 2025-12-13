// api/tribet_api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { sleep } from '../utils/helpers';
import { endpoints } from '../constants/envSettings';
import type { LOGINJWTSuccess, guestMessage, LoginResponse, CreateAgentPayload, Notifications } from '../types/Slices';
import type { RootState } from '../store/store';
import type { ContactFormValues } from '../types/Chat';


/* Base Query */
const baseQuery = fetchBaseQuery({ 
  baseUrl: endpoints.API_BASE_URL, 
  /* Auth headers */
  prepareHeaders: (headers, { getState, endpoint  }) => {

    if (endpoint === 'login' || endpoint === 'initiateChat' || endpoint === 'completeChat' || endpoint === 'getToken' || endpoint === 'guestSendMessage' || endpoint === 'getGuestChatStatus') {
      return headers; // No auth header for login
    }

    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token.access}`);
    }
    return headers;
  },
})

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const state = api.getState() as RootState;
  const token = state.auth.token;
  if (result.error && result.error.status === 401) {
    if (!token.refresh || !token.access) {
      api.dispatch({type: 'auth/logout'});
      return {
        error: {
          status: 401,
          data: 'No refresh token',
        },
      };
    }
    

    // Here you would normally attempt to refresh the token
    const refreshResult = await baseQuery(
      {
        url: endpoints.REFRESH_TOKEN,
        method: 'POST',
        body: { refresh: token.refresh },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newTokens = refreshResult.data as LOGINJWTSuccess;
      // store the new tokens
      api.dispatch({
        type: 'auth/setToken',
        payload: newTokens,
      });
      // Retry the original query with new token
      return await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({type: 'auth/logout'});
      return {
        error: {
          status: 401,
          data: 'Unable to refresh token',
        },
      };
    }

  } else { 
    return result;
  }
}


export const tribet_api = createApi({
  // declare known tag types so providesTags/invalidatesTags accept string literals
  tagTypes: ['WaitingChats', 'AssignedChats', 'AdminAgents', 'Notifications'],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({

    // `POST /api/token/`
    getToken: builder.mutation<LOGINJWTSuccess, { username: string; password: string }>({
      query: (credentials) => ({ url: endpoints.LOGINJWT, method: 'POST', body: credentials }),
    }),
    // POST 'api/auth/login/'
    login: builder.mutation<LoginResponse, { username: string; password: string }>({
      query: (credentials) => ({ url: endpoints.LOGIN, method: 'POST', body: credentials }),
      invalidatesTags: ['WaitingChats', 'AssignedChats', 'AdminAgents', 'Notifications'],
    }),
    // `POST /api/auth/logout/`
    logout: builder.mutation<void, void>({
      query: () => ({ url: endpoints.LOGOUT, method: 'POST' }),
    }),
    // GET /api/chat-rooms/waiting_chats/?page=1&page_size=50
    // * Obtain all waiting (unassigned) chats for agent
    getWaitingChats: builder.query<void, void>({
      query: () => ({ url: endpoints.WAITING_CHATS, method: 'GET' }),
      providesTags: ['WaitingChats'],
    }),

    // * Obtain all assigned chats for agent
    // `GET /api/chat-rooms/my_chats/
    getAssignedChats: builder.query<void, void>({
      query: () => ({ url: endpoints.ASSIGNED_CHATS, method: 'GET' }),
      providesTags: ['AssignedChats'],
    }),
    
    // `POST /api/chat-rooms/{id}/take_chat/` (assign ticket/chat to agent)
    takeChat: builder.mutation<boolean, { ticketId: string | null | undefined}>({
      query: ({ ticketId }) => ({ url: endpoints.TAKE_CHAT(ticketId), method: 'POST' }),
      invalidatesTags: ['WaitingChats', 'AssignedChats'],
    }),

    // `POST /api/chat-rooms/{id}/resolve/` Resolve Chat
    resolveChat: builder.mutation<boolean, { ticketId: string | null | undefined }>({
      query: ({ ticketId }) => ({ url:endpoints.RESOLVE_CHAT(ticketId), method: 'POST' }),
      invalidatesTags: ['WaitingChats', 'AssignedChats']
    }),

    // `POST /api/chat-rooms/{id}/unassign_agent/` Unassign Agent from Chat
    unassignAgent: builder.mutation<boolean, { ticketId: string | null | undefined }>({
      query: ({ ticketId }) => ({ url: endpoints.UNASSING_AGENT(ticketId), method: 'POST' }),
      invalidatesTags: ['WaitingChats', 'AssignedChats']
    }),

    // `POST /api/chat-rooms/{id}/close/` Close Chat
    closeChat: builder.mutation<boolean, { ticketId: string | null | undefined }>({
      query: ({ ticketId }) => ({ url: endpoints.CLOSE_CHAT(ticketId), method: 'POST' }),
      invalidatesTags: ['WaitingChats', 'AssignedChats']
    }),

    // `POST /api/chat-rooms/{id}/send_message/` Agent Send Message
    agentSendMessage: builder.mutation<void, { chatRoomId: string | null ; payload: { content: string, message_type: string }; }>({
      query: ({ chatRoomId, payload }) => ({
        url: endpoints.AGENT_SEND_MESSAGE(chatRoomId),
        method: 'POST',
        body: {
          content: payload.content,
          message_type: payload.message_type,
          attachment: null
        }
      }),
      invalidatesTags: ['AssignedChats']
    }),





    // * Guest Initiating conversation.
    // POST  `api/chat/start_chat/`
    initiateChat: builder.mutation<{ session_id: string }, { initialMessage: string }>({
      query: ({ initialMessage }) => ({ url: endpoints.INITIAL_MESSAGE, method: 'POST', body: { initial_message: initialMessage } }),
    }),

    // POST /api/chat/complete_chat/`
    completeChat: builder.mutation<void, ContactFormValues>({
      query: ({ 
        session_id,
        phone_number
       }) => ({ url: endpoints.COMPLETE_CHAT, method: 'POST', body: { session_id, phone_number } }),
    }),

    // `POST /api/chat/send_message/`
    guestSendMessage: builder.mutation<void, guestMessage>({
      query: ({ 
        chat_room_id, 
        content, 
        user_data 
      }) => ({ 
        url: endpoints.GUEST_SEND_MESSAGE, 
        method: 'POST', 
        body: { chat_room_id, content, user_data } 
      }),
    }),
    
    // `GET /api/chat/get_chat_status/?chat_room_id=uuid-string`
    getGuestChatStatus: builder.query<void, { chat_room_id: string }>({
      query: ({ chat_room_id }) => ({ url: endpoints.GUEST_CHAT_STATUS(chat_room_id), method: 'GET' }),
    }),

    // GET /api/admin-agents/
    getAdminAgents: builder.query<void, void>({
      query: () => ({ url: endpoints.ADMIN_AGENTS, method: 'GET' }),
      providesTags: ['AdminAgents'],
    }),

    // POST /api/admin-agents/` 
    createAgent: builder.mutation<void, CreateAgentPayload>({
      query: (agentData) => ({ url: endpoints.ADMIN_AGENTS, method: 'POST', body: agentData }),
    }),

    // DELETE /api/admin-agents/{id}/ 
    deleteAgent: builder.mutation<void, { id: string | number }>({
      query: ({ id }) => ({ url: endpoints.DELETE_ADMIN_AGENT(id), method: 'DELETE' }),
      invalidatesTags: ['AdminAgents'],
    }),

    // `PUT /api/admin-agents/{id}/`
    updateAgent: builder.mutation<void, { id: string | number; agentData: Partial<CreateAgentPayload> }>({
      query: ({ id, agentData }) => ({ url: endpoints.DELETE_ADMIN_AGENT(id), method: 'PUT', body: agentData }),
      invalidatesTags: ['AdminAgents'],
    }),

    // * NOTIFICATIONS
    // `GET /api/notifications/`
    getNotifications: builder.query<Notifications, void>({
      query: () => ({ url: endpoints.NOTIFICATIONS, method: 'GET' }),
      providesTags: ['Notifications'],
    }),

    // POST /api/notifications/mark_read/`
    markNotificationRead: builder.mutation<boolean, { notificationIds: number[] }>({
      query: ({ notificationIds }) => ({ url: endpoints.MARK_NOTIFICATION_READ(), method: 'POST', body: { notification_ids: notificationIds } }),
      invalidatesTags: ['Notifications'],
    }),













    /* 
      TODO: MOCK UP DATA DOWN HERE
    */
    // Assign ticket to agent
    assignTicket: builder.mutation<boolean, { ticketId: number | null | undefined; agentId: number | null }>({
      async queryFn({ ticketId, agentId }) {
        await sleep(1500); // Simula un retardo
        // Aquí podrías agregar lógica para asignar el ticket en tu mock
        console.log(`Ticket ${ticketId} asignado al agente ${agentId}`);
        return { data: true };
      },
    }),

    // Unassign ticket from agent
    unassignTicket: builder.mutation<boolean, { ticketId: number | null | undefined }>({
      async queryFn({ ticketId }) {
        await sleep(1000); // Simulate delay
        // Here you could add logic to unassign the ticket in your mock
        console.log(`Ticket ${ticketId} unassigned`);
        return { data: true };
      },
    }),

    // Delete Ticket
    deleteTicket: builder.mutation<boolean, { ticketId: number | null | undefined }>({
      async queryFn({ ticketId }) {
        await sleep(1000); // Simula un retardo
        // Aquí podrías agregar lógica para eliminar el ticket en tu mock
        console.info(`Ticket ${ticketId} eliminado`);
        console.log(typeof ticketId);
        return { data: true, success: true};
      }
    }),


  }),
});

export const { 
  useGetTokenMutation,
  useLoginMutation,
  useLogoutMutation,
  useInitiateChatMutation,
  useCompleteChatMutation,
  useGuestSendMessageMutation,
  useTakeChatMutation,
  useResolveChatMutation,
  useGetAssignedChatsQuery,
  useGetWaitingChatsQuery,
  useUnassignAgentMutation,
  useCloseChatMutation,
  useAgentSendMessageMutation,
  useGetGuestChatStatusQuery,
  useGetAdminAgentsQuery,
  useCreateAgentMutation,
  useDeleteAgentMutation,
  useUpdateAgentMutation,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,

  /* 
  TODO: MOCKUP HOOKS DOWN HERE THAT NEED TO BE REPLACED
  */
  useAssignTicketMutation,
  useUnassignTicketMutation,
  useDeleteTicketMutation,
} = tribet_api;