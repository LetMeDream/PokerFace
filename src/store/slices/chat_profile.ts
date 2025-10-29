/* User slice */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ChatProfileState {
  id: number | null;
  is_online: boolean | null;
  last_seen: string | null;
  full_name: string | null;
}

const initialState: ChatProfileState = {
  id: null,
  is_online: null,
  last_seen: null,
  full_name: null,
};

export const chatProfileSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    setChatProfile: (state, action: PayloadAction<ChatProfileState>) => {
      state.id = action.payload.id;
      state.is_online = action.payload.is_online;
      state.last_seen = action.payload.last_seen;
      state.full_name = action.payload.full_name;
    }
  },
});

export const { setChatProfile } = chatProfileSlice.actions;

export default chatProfileSlice.reducer;