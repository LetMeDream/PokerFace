// api/mockApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { allTickets } from '../constants/chat';

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
      id: number;
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

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
            "id": 1,
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
    data: allTickets
  } as ticketsSuccess
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
    })
    
  }),
});

export const { useLoginMutation, useGetTicketsQuery } = mockApi;