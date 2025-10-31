import type { AllTickets, NormalizedTickets } from "../types/Slices";
import { createSelector } from "@reduxjs/toolkit";

/**
 * Normaliza un array de tickets a { byId, allIds }
 * Usa 'chat_room_id' como clave única
 */
export const normalizeTickets = (tickets: AllTickets = []) => {
  return tickets.reduce<NormalizedTickets>(
    (acc, ticket) => {
      const id = ticket.chat_room_id;
      if (id) {
        acc.byId[id] = ticket;
        acc.allIds.push(id);
      }
      return acc;
    },
    { byId: {}, allIds: [] }
  );
};


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