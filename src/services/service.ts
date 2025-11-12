// api/tribet_api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { allTickets48 } from '../constants/chat';
import { sleep } from '../utils/helpers';
import { endpoints } from '../constants/envSettings';
import type { LOGINJWTSuccess, TicketsResponse, ticketsSuccess, guestMessage, LoginResponse } from '../types/Slices';
import type { RootState } from '../store/store';
import type { ContactFormValues } from '../types/Chat';

// Datos mockeados (puedes cambiarlos o hacerlos dinámicos)
const mockData = {
  
  /* Mocks para tickets */
  tickets: {
    success: true,
    data: allTickets48
  } as ticketsSuccess,

  /* Mock for closing tickets */
  closeTicket: async () => {
    await sleep(1500); // Simula un retardo
    return { success: true };
  },

  /* Mock for opening tickets */
  openTicket: async () => {
    await sleep(1500); // Simula un retardo
    return { success: true };
  }
};


/* Base Query */
const baseQuery = fetchBaseQuery({ 
  baseUrl: endpoints.API_BASE_URL, 
  /* Auth headers */
  prepareHeaders: (headers, { getState, endpoint  }) => {

    if (endpoint === 'login' || endpoint === 'initiateChat' || endpoint === 'completeChat' || endpoint === 'getToken') {
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
        body: { access: token.refresh },
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
  tagTypes: ['WaitingChats', 'assignedChats'],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({

    // `POST /api/token/`
    getToken: builder.mutation<LOGINJWTSuccess, { username: string; password: string }>({
      query: (credentials) => ({ url: endpoints.LOGINJWT, method: 'POST', body: credentials }),
    }),
    // POST 'api/auth/login/'
    login: builder.mutation<LoginResponse, { username: string; password: string }>({
      query: (credentials) => ({ url: endpoints.LOGIN, method: 'POST', body: credentials }),
      invalidatesTags: ['WaitingChats', 'assignedChats'],
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
      providesTags: ['assignedChats'],
    }),

    // `POST /api/chat-rooms/{id}/take_chat/` (assign ticket/chat to agent)
    takeChat: builder.mutation<boolean, { ticketId: number | null | undefined}>({
      query: ({ ticketId }) => ({ url: endpoints.TAKE_CHAT(ticketId), method: 'POST' }),
      invalidatesTags: ['WaitingChats', 'assignedChats'],
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
        phone_number,
        recaptcha_token
       }) => ({ url: endpoints.COMPLETE_CHAT, method: 'POST', body: { session_id, phone_number, recaptcha_token } }),
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
    


















    /* 
    TODO: MOCK UP DATA DOWN HERE
     */
    // `GET /api/tickets/`
    getTickets: builder.query<TicketsResponse, void>({
      async queryFn() {
        await sleep(800); // 800ms delay
        const result = mockData.tickets as TicketsResponse;
        if (result && result.success) {
          return { data: result };
        } else {
          return { error: { status: 500, data: 'Error al obtener los tickets' } };
        }
      }
    }),
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

    // Close Ticket (mark as resolved)
    closeTicket: builder.mutation<boolean, { ticketId: number | null | undefined }>({
      async queryFn({ ticketId }) {
        // Aquí podrías agregar lógica para cerrar el ticket en tu mock
        const response = await mockData.closeTicket();
        if (!response.success) {
          return { error: { status: 500, data: 'Error al cerrar el ticket' } };
        }
        console.info(`Ticket ${ticketId} cerrado`);
        return { data: true, success: true };
      }
    }),

    // Re-open Ticket
    openTicket: builder.mutation<boolean, { ticketId: number | null | undefined }>({
      async queryFn({ ticketId }) {
        // Here we could add logic to reopen the ticket in your mock
        const response = await mockData.openTicket();
        if (!response.success) {
          return { error: { status: 500, data: 'Error al reabrir el ticket' } };
        }
        console.info(`Ticket ${ticketId} reabierto`);
        return { data: true, success: true };
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

  /* 
  TODO: MOCKUP HOOKS DOWN HERE THAT NEED TO BE REPLACED
  */
  useGetTicketsQuery,
  useAssignTicketMutation,
  useUnassignTicketMutation,
  useDeleteTicketMutation,
  useCloseTicketMutation,
  useOpenTicketMutation
} = tribet_api;