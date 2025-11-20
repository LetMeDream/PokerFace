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
  status?: string;
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
  status: undefined
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
    setGuestStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    unsetGuest: () => {
      return initialState;
    }
  },
});

export const { setGuestProfile, setGuestSessionId, setIsUserConected, setGuestMessages, setGuestStatus, unsetGuest } = guestSlice.actions;
export default guestSlice.reducer;