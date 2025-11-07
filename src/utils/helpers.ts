import type { AllTickets, NormalizedTickets } from "../types/Slices";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { SerializedError } from "@reduxjs/toolkit"

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


/* 
* Function for getting error out of the RTK Query result without typescript fucking screaming at us 
*/
export const getApiErrorMessage = (result: any): string => {
  // Type guard manual: ¿tiene 'status'? → FetchBaseQueryError
      const isApiError = (error: any): error is FetchBaseQueryError => 
        error && typeof error === 'object' && 'status' in error;
  
      let message = "Logout failed";
  
      if (isApiError(result.error)) {
        // Seguro: tiene .data
        const data = result.error.data as { detail?: string } | undefined;
        message = data?.detail || message;
      } else {
        // Seguro: es SerializedError → tiene .message
        const serialized = result.error as SerializedError;
        message = serialized.message || message;
      }
      return message;
}