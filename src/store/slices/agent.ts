/* User slice */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { normalizeTickets, normalizeNotifications } from '../../utils/helpers';
import type { NotificationItem } from '../../types/Slices';

export interface AgentState {
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
  /* Normalized Notifications */
  notifications: {
    byId: Record<string, NotificationItem>,
    allIds: (string | number)[];
  },
  current_notification: null | NotificationItem;
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
  assigned_chats: { byId: {}, allIds: [] },
  notifications: { byId: {}, allIds: []  },
  current_notification: null,
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
    },
    setNotifications: (state, action) => {
      const { byId, allIds } = normalizeNotifications(action.payload);
      state.notifications = { byId, allIds };
    },
    removeNotification: (state, action) => {
      const idToRemove = action.payload;
      delete state.notifications.byId[idToRemove];
      state.notifications.allIds = state.notifications.allIds.filter(
        (id) => id !== idToRemove
      );
    },
    setCurrentNotification: (state, action: PayloadAction<NotificationItem | null>) => {
      state.current_notification = action.payload;
    },

    setAssignedChatMessage: (state, action) => {
      const payload = action.payload;
      const chatId = payload.chat_room_id;
      if (chatId && state.assigned_chats.byId[chatId]) {
        const oldChat = state.assigned_chats.byId[chatId];
        state.assigned_chats.byId[chatId] = {
          ...oldChat,
          messages: [
            ...oldChat.messages,
            payload.message,
          ],
        };
      }
    },
  },
});

export const { setChatProfile, unsetChatProfile, setAssignedChats, setNotifications, setCurrentNotification, removeNotification, setAssignedChatMessage } = agentSlice.actions;
export default agentSlice.reducer;