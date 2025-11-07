// api/mockApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { allTickets48 } from '../constants/chat';
import { sleep } from '../utils/helpers';
import { envSettings } from '../constants/envSettings';

// Tipos
type User = {
  id: number;
  username: string;
  email: string;
};

type ExtendedUser = User & {
  first_name: string;
  last_name: string;
};

export type Agent = {
  can_take_chat: boolean;
  current_active_chats: number;
  id: string;
  department: string | null;
  employee_id: string;
  full_name: string;
  is_available: boolean;
  max_concurrent_chats: number;
  rating: number;
  total_resolved_chats: number;
  user: User;
}

export type LoginSuccess = {
  token: string;
  agent: Agent;
  user: ExtendedUser;
};


type LoginFailure = {
  success: false;
  error: string;
};

export type LoginResponse = LoginSuccess | LoginFailure;

type ticketsSuccess = {
  success: true;
  data: any[];
}

type ticketsFailure = {
  success: false;
  error: string;
}
type TicketsResponse = ticketsSuccess | ticketsFailure;

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
  baseQuery: fetchBaseQuery({ baseUrl: envSettings.API_BASE_URL }),
  endpoints: (builder) => ({

    // `POST /api/auth/login/`
    login: builder.mutation<LoginResponse, { username: string; password: string }>({
      query: (credentials) => ({ url: envSettings.LOGIN, method: 'POST', body: credentials }),
    }),

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
  useLoginMutation, useGetTicketsQuery, useAssignTicketMutation, useDeleteTicketMutation, 
  useCloseTicketMutation, useOpenTicketMutation, useUnassignTicketMutation 
} = mockApi;