// api/mockApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { allTickets48 } from '../constants/chat';
import { sleep } from '../utils/helpers';
import { endpoints } from '../constants/envSettings';
import type { LoginResponse, TicketsResponse, ticketsSuccess } from '../types/Slices';
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

export const mockApi = createApi({
  // declare known tag types so providesTags/invalidatesTags accept string literals
  tagTypes: ['WaitingChats'],
  baseQuery: fetchBaseQuery(
    { 
      baseUrl: endpoints.API_BASE_URL, 
      /* Auth headers */
      prepareHeaders: (headers, { getState, endpoint  }) => {

        if (endpoint === 'login' || endpoint === 'initiateChat' || endpoint === 'completeChat') {
          return headers; // No auth header for login
        }

        const token = (getState() as RootState).auth.token;
        if (token) {
          headers.set('Authorization', `Token ${token}`);
        }
        return headers;
  },
    }),
  endpoints: (builder) => ({

    // `POST /api/auth/login/`
    login: builder.mutation<LoginResponse, { username: string; password: string }>({
      query: (credentials) => ({ url: endpoints.LOGIN, method: 'POST', body: credentials }),
      invalidatesTags: ['WaitingChats'],
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
    // `POST /api/chat-rooms/{id}/take_chat/`
    /* assignTicket: builder.mutation<boolean, { ticketId: number | null | undefined; agentId: number | null }>({
      query: ({ ticketId, agentId }) => ({ url: endpoints.ASSIGN_TICKET(ticketId), method: 'POST', body: { agent_id: agentId } }),
    }), */


    // Guest Initiation conversation.
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
  useLoginMutation,
  useLogoutMutation,
  useInitiateChatMutation,
  useCompleteChatMutation,
  /* 
  TODO: MOCKUP HOOKS DOWN HERE THAT NEED TO BE REPLACED
  */
  useGetTicketsQuery,
  useAssignTicketMutation,
  useUnassignTicketMutation,
  useDeleteTicketMutation,
  useCloseTicketMutation,
  useOpenTicketMutation
} = mockApi;