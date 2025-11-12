/* User slice */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { normalizeTickets } from '../../utils/helpers';

interface AgentState {
  can_take_chat: boolean;
  currently_active_chats: number;
  department: string | null;
  employee_id: string;
  full_name: string | null;
  id: number;
  is_available: boolean;
  max_concurrent_chats: number;
  rating: string | null;
  total_resolved_chats: number;
  /* Normalized chats */
  assigned_chats: {
    byId: Record<string, any>,
    allIds: string[] | number[];
  }
}

const initialState: AgentState = {
  can_take_chat: false,
  currently_active_chats: 0,
  department: null,
  employee_id: '',
  full_name: null,
  id: 0,
  is_available: false,
  max_concurrent_chats: 0,
  rating: null,
  total_resolved_chats: 0,
  assigned_chats: { byId: {}, allIds: [] }
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
    },
    setAssignedChats: (state, action) => {
      const { byId, allIds } = normalizeTickets(action.payload);
      state.assigned_chats = { byId, allIds };
    }
  },
});

export const { setChatProfile, unsetChatProfile, setAssignedChats } = agentSlice.actions;

export default agentSlice.reducer;