import type { AllTickets, NormalizedTickets } from "../types/Slices";

/**
 * Normaliza un array de tickets a { byId, allIds }
 * Usa 'chat_room_id' como clave única
 */
export const normalizeTickets = (tickets: AllTickets = []) => {
  return tickets.reduce<NormalizedTickets>(
    (acc, ticket) => {
      const id = ticket.id;
      if (id) {
        acc.byId[id] = ticket;
        acc.allIds.push(id);
      }
      return acc;
    },
    { byId: {}, allIds: [] }
  );
};

/** Utility function that returns a Promise that resolves after a specified delay in milliseconds */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
