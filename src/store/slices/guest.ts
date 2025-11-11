/* User slice */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GuesstState {
  id: string;
  session_id: string;
  chatRoomId: string;
  email: string;
  full_name: string;
  phone_number: string;
  is_temporary: boolean;
  messages: { type: string; content: string; }[];
  isUserConected: boolean;
  created_at: string;
}

const initialState: GuesstState = {
  id: '',
  session_id: '', 
  chatRoomId: '',
  email: '',
  full_name: '',
  phone_number: '',
  is_temporary: true,
  messages: [],
  isUserConected: false,
  created_at: '',
};
  
export const guestSlice = createSlice({
  name: 'guest',
  initialState, 
  reducers: {
    setGuestProfile: (state, action: PayloadAction<GuesstState>) => {
      return { ...state, ...action.payload };
    },
    setGuestSessionId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setIsUserConected: (state, action: PayloadAction<boolean>) => {
      state.isUserConected = action.payload;
    },
    setGuestMessages: (state, action: PayloadAction<{ type: string; content: string; }[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { setGuestProfile, setGuestSessionId, setIsUserConected, setGuestMessages } = guestSlice.actions;
export default guestSlice.reducer;