import { createSelector } from "@reduxjs/toolkit";
import type { AllTickets, NormalizedTickets } from "../types/Slices";
import type { RootState } from "../store/store";

/* 
* SELECTORS!!!
*/
type BaseState = { tickets: NormalizedTickets };
type AgentState = { assigned_chats: NormalizedTickets };
type Ticket = AllTickets[number];

/* Selector for 'de-normalizing' the normalized Tickets
 *
 * Ejemplo — "ANTES" (estado normalizado en el store):
 * {
 *   tickets: {
 *     byId: {
 *       "r1": { chat_room_id: "r1", nickname: "Alice", messages: [...] },
 *       "r2": { chat_room_id: "r2", nickname: "Bob", messages: [...] }
 *     },
 *     allIds: ["r1", "r2"]
 *   }
 * }
 *
 * Ejemplo — "DESPUÉS" (resultado de selectTicketsArray):
 *  tickets: [
 *   { chat_room_id: "r1", nickname: "Alice", messages: [...] },
 *   { chat_room_id: "r2", nickname: "Bob", messages: [...] }
 * ]
 *
 * Observaciones:
 * - El orden de salida sigue el array allIds.
 * - Tickets sin entrada en byId se filtran (no aparecen en el resultado).
 */
export const selectTicketsArray = createSelector(
  (state: BaseState) => state.tickets.byId,
  (state: BaseState) => state.tickets.allIds,
  (byId, allIds) => allIds.map(id => byId[id]).filter((t): t is Ticket => t !== undefined)
);

/* Selector for filtering ALL tickets */
export const selectFilteredTickets = createSelector(
  selectTicketsArray,
  (_, searchValue) => searchValue.toLowerCase(), // parámetro externo
  /* Output function; where out actual params called go to */
  (tickets: Ticket[], searchLower: string) =>
    searchLower // Does a search value exist?
      ? tickets.filter((ticket: any) => // filter by nickname
          ticket.nickname?.toLowerCase().includes(searchLower)
        )
      : tickets // if no search value, return all tickets
);

/* Selector for getting a specific ticket by ID (FROM LOCAL STATE) */
export const selectTicketById = createSelector(
  (state: BaseState) => state.tickets.byId,
  (_, ticketId: string) => ticketId,
  (byId, ticketId) => byId[ticketId]
);

/* Selector from getting a specific ticket by ID (FROM REDUX'S AGENT.ASSIGNED_CHATS) */
export const selectAssignedChatById = createSelector(
  (state: AgentState) => state.assigned_chats.byId,
  (_, ticketId: number) => ticketId,
  (byId, ticketId) => byId[ticketId]
);

/* Selector for getting all unassigned tickets */
export const selectUnassignedTickets = createSelector(
  selectTicketsArray,
  (tickets) => tickets.filter(ticket => !ticket.agent_assigned)
);

/* Selector for filtering unassigned tickets */
export const selectFilteredUnassignedTickets = createSelector(
  selectUnassignedTickets,
  (_, searchValue) => searchValue.toLowerCase(),
  (tickets: Ticket[], searchLower: string) =>
    searchLower
      ? tickets.filter((ticket: Ticket) =>
          ticket.chat_user_info?.phone_number?.includes(searchLower)
        )
      : tickets 
)


/* Selector for getting all tickets with the given chat_room_id */
export const selectTicketsByChatRoomId = createSelector(
  selectTicketsArray,
  (_, chatRoomId: number | null) => chatRoomId,
  (tickets: Ticket[], chatRoomId: number | null) => tickets.filter((ticket: Ticket) => ticket.chat_room_id === chatRoomId)
);

// !DEPRECATED
// !Since it was previously used to filter the assigned tickets out of the local state and we will query the API for that
/* Selector for getting and filtering all tickets with the given chat_room_id */
export const selectFilteredTicketsByChatRoomId = createSelector(
  selectTicketsArray,
  (_, searchValue) => searchValue?.toLowerCase(),
  (_, __, chatRoomId) => chatRoomId,
  (tickets: Ticket[], searchLower: string, chatRoomId: string) => {

    return searchLower
      ? tickets.filter((ticket: Ticket) =>
          ticket.chat_user_info.full_name?.toLowerCase().includes(searchLower)
        ).filter((ticket: Ticket) => ticket.chat_room_id === chatRoomId)
      : tickets.filter((ticket: Ticket) => ticket.chat_room_id === chatRoomId);
    }
);

export const selectPersonalChatsArray = createSelector(
  (state: AgentState) => state.assigned_chats.byId,
  (state: AgentState) => state.assigned_chats.allIds,
  (byId, allIds) => allIds.map(id => byId[id]).filter((t): t is Ticket => t !== undefined)
)

/* Selector for getting the personal assigned chat from agent.assigned_chats */
export const selectFilteredPersonalAssignedChat = createSelector(
  selectPersonalChatsArray,
  (_, searchValue) => searchValue?.toLowerCase(),
  (tickets: Ticket[], searchLower: string) => {
    return searchLower
      ? tickets.filter((ticket: Ticket) =>
          ticket.chat_user_info.phone_number?.includes(searchLower)
        )
      : tickets;
  },
  { 
    memoizeOptions: {
      resultEqualityCheck: (_a, _b) => { void _a; void _b; return false; },
    } 
  }
);



/* Selector for getting all of the required info, from the Guest slice, to be sent in the 
** GuessSendMessage API call.
**Payload:**
```json
{
  "chat_room_id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "content": "No puedo acceder a mi cuenta, me dice contraseña incorrecta",
  "user_data": {
    "id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
    "phone_number": "+573001234567",
    "is_temporary": true
  }
}
*/
export const selectGuestMessagePayload = createSelector(
  (state: RootState) => state.guest.id,
  (state: RootState) => state.guest.phone_number,
  (_, messageContent: string) => messageContent,
  (id, phoneNumber, content) => ({
    chat_room_id:  id,
    content,
    user_data: {
      id,
      phone_number: phoneNumber,
      is_temporary: true
    }
  })
);




/* De-normalize received Agents */
export const selectAgentsArray = createSelector(
  (state: RootState) => state.user.assigned_agents.byId,
  (state: RootState) => state.user.assigned_agents.allIds,
  (byId, allIds) => allIds.map(id => byId[id]).filter((a): a is any => a !== undefined)
);