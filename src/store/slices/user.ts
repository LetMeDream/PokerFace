/* User slice */
import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from '../../types/Slices';

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  first_name: null,
  last_name: null,
  is_active: null,
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
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.first_name = null;
      state.last_name = null;
      state.is_active = null;
    }
    
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;