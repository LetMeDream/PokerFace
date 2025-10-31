import { createSlice } from '@reduxjs/toolkit'
import type { ChatTicket } from '../../types/Slices'
import { normalizeTickets } from '../../utils/helpers';

export interface BaseState {
  tickets: {
    byId: Record<string, ChatTicket>,
    allIds: string[]
  };
  selectedTicketId: string | null
  hasAutoOpened: boolean
}

const initialState: BaseState = {
  selectedTicketId: null,
  hasAutoOpened: false,
  /* Normalizing tickets */
  tickets: {
    byId: {},
    allIds: []
  },
}

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setSelectedTicket(state, action) {
      state.selectedTicketId = action.payload
    },
    setHasAutoOpened(state, action) {
      state.hasAutoOpened = action.payload
    },
    unsetBase (state) {
      state.selectedTicketId = null
      state.hasAutoOpened = false
    },
    // Set all tickets (on login, mainly)
    setTickets(state, action) {
      const { byId, allIds } = normalizeTickets(action.payload);
      state.tickets.byId = byId;
      state.tickets.allIds = allIds;
    },



    // Add message to a ticket
    addMessageToTicket(state, action) {
      const { chatRoomId, message } = action.payload;
      const ticket = state.tickets.byId[chatRoomId];
      if (ticket) {
        ticket.messages.push(message);
      }
    }
  }
})

export const { setSelectedTicket, unsetBase, setHasAutoOpened, setTickets, addMessageToTicket } = baseSlice.actions
export default baseSlice.reducer
