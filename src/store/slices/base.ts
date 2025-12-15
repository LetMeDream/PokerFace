import { createSlice } from '@reduxjs/toolkit'
import type { ChatTicket } from '../../types/Slices'
import { normalizeTickets } from '../../utils/helpers';

export interface BaseState {
  tickets: {
    byId: Record<number, ChatTicket>,
    allIds: number[]
  };
  selectedTicketId: string | null  | undefined// Id for the currently established conversation/ticket
  assigningTicketId?: string | null  | undefined// Id for the ticket being assigned right now
  hasAutoOpened: boolean
  hasNotificationsSoundPlayed?: boolean
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
  hasNotificationsSoundPlayed: false
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
    assignTicketToAgent(state, action) {
      const { ticketId, agentChatId, agentName } = action.payload;
      const ticket = state.tickets.byId[ticketId];
      if (ticket) {
        ticket.agent_assigned = true;
        ticket.agent_name = agentName
        ticket.chat_room_id = agentChatId;
      }
    },

    // Unassign agent from ticket
    unassignAgentFromTicket(state, action) {
      const { ticketId } = action.payload;
      const ticket = state.tickets.byId[ticketId];
      if (ticket) {
        ticket.agent_assigned = false;
        ticket.chat_room_id = null;
        ticket.agent_name = null;
      }
      state.selectedTicketId = null;
    },

    // Delete ticket
    deleteTicket(state, action) {
      const { ticketId } = action.payload;
      state.tickets.allIds = state.tickets.allIds.filter(id => id !== ticketId);
      delete state.tickets.byId[ticketId];
    },

    // Add message to a ticket
    addMessageToTicket(state, action) {
      const { chatRoomId, message } = action.payload;
      const ticket = state.tickets.byId[chatRoomId];
      if (ticket) {
        ticket.messages.push(message);
      }
    },

    // Close ticket (previously used)
    closeTicket(state, action) {
      const { ticketId } = action.payload;
      const ticket = state.tickets.byId[ticketId];
      if (ticket) {
        ticket.status = 'closed';
      }
    },

    // Re-open ticket
    reopenTicket(state, action) {
      const { ticketId } = action.payload;
      const ticket = state.tickets.byId[ticketId];
      if (ticket) {
        ticket.status = 'pending';
      }
    },

    // Set notifications sound played
    setHasNotificationsSoundPlayed(state, action) {
      state.hasNotificationsSoundPlayed = action.payload
    }
  }
})

export const { 
  setSelectedTicketId, unsetBase, setHasAutoOpened, setTickets, addMessageToTicket, 
  unsetSelectedTicketId, assignTicketToAgent, setAssigningTicketId, unassignAgentFromTicket, 
  deleteTicket, closeTicket, reopenTicket, setHasNotificationsSoundPlayed
} = baseSlice.actions

export default baseSlice.reducer
