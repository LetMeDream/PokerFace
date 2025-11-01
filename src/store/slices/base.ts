import { createSlice } from '@reduxjs/toolkit'
import type { ChatTicket } from '../../types/Slices'
import { normalizeTickets } from '../../utils/helpers';

export interface BaseState {
  tickets: {
    byId: Record<number, ChatTicket>,
    allIds: number[]
  };
  selectedTicketId: string | null // Id for the currently established conversation/ticket
  assigningTicketId?: string | null // Id for the ticket being assigned right now
  hasAutoOpened: boolean
}

const initialState: BaseState = {
  selectedTicketId: null,
  assigningTicketId: null,
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
    /* Set the currently selected ticket */
    setSelectedTicketId(state, action) {
      state.selectedTicketId = action.payload
    },
    /* Unset the currently selected ticket */
    unsetSelectedTicketId(state) {
      state.selectedTicketId = null
    },
    /* Set the currently assigning ticket */
    setAssigningTicketId(state, action) {
      state.assigningTicketId = action.payload
    },
    /* Unset the currently assigning ticket */
    unsetAssigningTicketId(state) {
      state.assigningTicketId = null
    },
    /* Set whether the chat has auto-opened */
    setHasAutoOpened(state, action) {
      state.hasAutoOpened = action.payload
    },
    // Unset base state (on logout, mainly)
    unsetBase (state) {
      state.selectedTicketId = null
      state.assigningTicketId = null
      state.hasAutoOpened = false
      state.tickets = { byId: {}, allIds: [] }
    },
    // Set all tickets (on login, mainly)
    setTickets(state, action) {
      const { byId, allIds } = normalizeTickets(action.payload);
      state.tickets.byId = byId;
      state.tickets.allIds = allIds;
    },

    // Assign agent to ticket
    assignAgentToTicket(state, action) {
      const { ticketId, agentChatId } = action.payload;
      const ticket = state.tickets.byId[ticketId];
      if (ticket) {
        ticket.agent_assigned = true;
        ticket.chat_room_id = agentChatId;
      }
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

export const { setSelectedTicketId, unsetBase, setHasAutoOpened, setTickets, addMessageToTicket, unsetSelectedTicketId, assignAgentToTicket, setAssigningTicketId } = baseSlice.actions
export default baseSlice.reducer
