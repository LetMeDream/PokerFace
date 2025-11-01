/* User slice */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ChatProfileState {
  chat_id: string | null;
  is_online: boolean | null;
  last_seen: string | null;
  full_name: string | null;
}

const initialState: ChatProfileState = {
  chat_id: null,
  is_online: null,
  last_seen: null,
  full_name: null,
};

export const chatProfileSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    setChatProfile: (state, action: PayloadAction<ChatProfileState>) => {
      state.chat_id = action.payload.chat_id;
      state.is_online = action.payload.is_online;
      state.last_seen = action.payload.last_seen;
      state.full_name = action.payload.full_name;
    },
    unsetChatProfile: (state) => {
      state.chat_id = null;
      state.is_online = null;
      state.last_seen = null;
      state.full_name = null;
    }
  },
});

export const { setChatProfile, unsetChatProfile } = chatProfileSlice.actions;

export default chatProfileSlice.reducer;