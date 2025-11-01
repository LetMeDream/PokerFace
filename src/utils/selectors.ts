import { createSelector } from "@reduxjs/toolkit";
import type { AllTickets, NormalizedTickets } from "../types/Slices";
/* 
* SELECTORS!!!
*/

type RootState = { tickets: NormalizedTickets };
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
  (state: RootState) => state.tickets.byId,
  (state: RootState) => state.tickets.allIds,
  (byId, allIds) => allIds.map(id => byId[id]).filter((t): t is Ticket => t !== undefined)
);

/* Selector for filtering tickets */
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


/* Selector for getting a specific ticket by ID */
export const selectTicketById = createSelector(
  (state: RootState) => state.tickets.byId,
  (_, ticketId: string) => ticketId,
  (byId, ticketId) => byId[ticketId]
);


/* Selector for getting all unassigned tickets */
export const selectUnassignedTickets = createSelector(
  selectTicketsArray,
  (tickets) => tickets.filter(ticket => !ticket.agent_assigned)
);

/* Selector for getting all tickets with the given chat_room_id */
export const selectTicketsByChatRoomId = createSelector(
  selectTicketsArray,
  (_, chatRoomId: string | null) => chatRoomId,
  (tickets: Ticket[], chatRoomId: string | null) => tickets.filter((ticket: Ticket) => ticket.chat_room_id === chatRoomId)
);

/* Selector for getting and filtering all tickets with the given chat_room_id */
export const selectFilteredTicketsByChatRoomId = createSelector(
  selectTicketsArray,
  (_, searchValue) => searchValue?.toLowerCase(),
  (_, __, chatRoomId) => chatRoomId,
  (tickets: Ticket[], searchLower: string, chatRoomId: string) => {

    return searchLower
      ? tickets.filter((ticket: Ticket) =>
          ticket.nickname?.toLowerCase().includes(searchLower)
        ).filter((ticket: Ticket) => ticket.chat_room_id === chatRoomId)
      : tickets.filter((ticket: Ticket) => ticket.chat_room_id === chatRoomId);
    }
);