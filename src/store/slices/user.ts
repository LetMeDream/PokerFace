/* User slice */
import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from '../../types/Slices';
import { normalizeAgents } from '../../utils/helpers';

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  first_name: null,
  last_name: null,
  is_active: null,
  is_superuser: false,
  assigned_agents: {
    byId: {},
    allIds: []
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.is_active = action.payload.is_active;
      state.is_superuser = action.payload.is_superuser; 
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.first_name = null;
      state.last_name = null;
      state.is_active = null;
      state.is_superuser = false;
      state.assigned_agents = {
        byId: {},
        allIds: []
      };
    },
    setAppAgents: (state, action) => {
      const normalizedAgents = normalizeAgents(action.payload);
      state.assigned_agents = normalizedAgents;
    }
  },
});

export const { setUser, clearUser, setAppAgents } = userSlice.actions;

export default userSlice.reducer;