// api/mockApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { allTickets24 } from '../constants/chat';
import { sleep } from '../utils/helpers';

// Tipos
type User = {
  id: number;
  name: string;
  email: string;
};

export type LoginSuccess = {
  success: true
  data: {
    token: string;
    user: {
      id: number;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      is_active: boolean;
    };
    chat_profile: {
      chat_id: string;
      is_online: boolean;
      last_seen: string;
      full_name: string;
    };
  };
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
  users: [
    { id: 1, name: 'Juan', email: 'juan@example.com' },
    { id: 2, name: 'María', email: 'maria@example.com' },
  ] as User[],

  /* Mocks up login */
  login: (credentials: { pk_username: string; pk_password: string }): LoginResponse => {
    if (credentials.pk_username === 'usuario123' && credentials.pk_password === 'contraseña123') {
      return {
        success: true,
        data: {
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
            "chat_id": "a9b8c7d6-e5f4-3210-aaaa-666666666666",
            "is_online": true,
            "last_seen": "2024-01-15T10:30:00Z",
            "full_name": "Juan Pérez"
          }
        }
      };
    }
    return { success: false, error: 'Credenciales inválidas' };
  },

  /* Mocks para tickets */
  tickets: {
    success: true,
    data: allTickets24
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
  baseQuery: fakeBaseQuery(), // ¡Aquí está la magia!
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn() {
        // Simula una respuesta exitosa
        return { data: mockData.users };
      },
    }),
    // `POST /api/auth/login/`
    login: builder.mutation<LoginResponse, { pk_username: string; pk_password: string }>({
      async queryFn(credentials) {
        await sleep(800); // 800ms delay

        const result = mockData.login(credentials);
        if (result.success) {
          return { data: result };
        } else {
          return { error: { status: 401, data: result.error } };
        }
      },
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
    assignTicket: builder.mutation<boolean, { ticketId: number | null | undefined; agentId: string | null }>({
      async queryFn({ ticketId, agentId }) {
        await sleep(1500); // Simula un retardo
        // Aquí podrías agregar lógica para asignar el ticket en tu mock
        console.log(`Ticket ${ticketId} asignado al agente ${agentId}`);
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

    // Close Ticket
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

export const { useLoginMutation, useGetTicketsQuery, useAssignTicketMutation, useDeleteTicketMutation, useCloseTicketMutation, useOpenTicketMutation } = mockApi;