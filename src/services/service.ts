// api/mockApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

// Tipos
type User = {
  id: number;
  name: string;
  email: string;
};

type LoginSuccess = {
  success: true;
  user: { id: number; name: string };
};

type LoginFailure = {
  success: false;
  error: string;
};

type LoginResponse = LoginSuccess | LoginFailure;

// Datos mockeados (puedes cambiarlos o hacerlos dinámicos)
const mockData = {
  users: [
    { id: 1, name: 'Juan', email: 'juan@example.com' },
    { id: 2, name: 'María', email: 'maria@example.com' },
  ] as User[],
  login: (credentials: { email: string; password: string }): LoginResponse => {
    if (credentials.email === 'test@test.com' && credentials.password === '123') {
      return { success: true, user: { id: 1, name: 'Test User' } };
    }
    return { success: false, error: 'Credenciales inválidas' };
  },
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
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      queryFn(credentials) {
        const result = mockData.login(credentials);
        if (result.success) {
          return { data: result };
        } else {
          return { error: { status: 401, data: result.error } };
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useLoginMutation } = mockApi;