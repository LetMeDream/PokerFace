/* User slice */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AgentState {
  can_take_chat: boolean;
  currentl_active_chats: number;
  department: string | null;
  employee_id: string;
  full_name: string | null;
  id: number;
  is_available: boolean;
  mex_concurrent_chats: number;
  rating: string | null;
  total_resolved_chats: number;
}

const initialState: AgentState = {
  can_take_chat: false,
  currentl_active_chats: 0,
  department: null,
  employee_id: '',
  full_name: null,
  id: 0,
  is_available: false,
  mex_concurrent_chats: 0,
  rating: null,
  total_resolved_chats: 0,
};
  
export const agentSlice = createSlice({
  name: 'agent',
  initialState, 
  reducers: {
    setChatProfile: (state, action: PayloadAction<AgentState>) => {
      return { ...state, ...action.payload };
    },
    unsetChatProfile: () => {
      return { ...initialState };
    }
  },
});

export const { setChatProfile, unsetChatProfile } = agentSlice.actions;

export default agentSlice.reducer;