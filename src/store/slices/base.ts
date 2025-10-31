import { createSlice } from '@reduxjs/toolkit'
import type { ChatTicket } from '../../types/Slices'
import { normalizeTickets } from '../../utils/helpers';

export interface BaseState {
  tickets: {
    byId: Record<string, ChatTicket>,
    allIds: string[]
  };
  selectedTicket: ChatTicket | null
  hasAutoOpened: boolean
}

const initialState: BaseState = {
  selectedTicket: null,
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
      state.selectedTicket = action.payload
    },
    setHasAutoOpened(state, action) {
      state.hasAutoOpened = action.payload
    },
    unsetBase (state) {
      state.selectedTicket = null
      state.hasAutoOpened = false
    },
    // Set all tickets (on login, mainly)
    setTickets(state, action) {
      const { byId, allIds } = normalizeTickets(action.payload);
      state.tickets.byId = byId;
      state.tickets.allIds = allIds;
    },

  }
})

export const { setSelectedTicket, unsetBase, setHasAutoOpened, setTickets } = baseSlice.actions
export default baseSlice.reducer
