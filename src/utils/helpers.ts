import type { AllTickets, NormalizedTickets, NormalizedAgents, NormalizedNotifications } from "../types/Slices";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { SerializedError } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

/**
 * Normalizando un array de tickets a { byId, allIds }
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

/**
 * Normalizando un array de Agents a { byId, allIds }
 */
export const normalizeAgents = (agents: any[] = []) => {
  return agents.reduce<NormalizedAgents>(
    (acc, agent) => {
      const id = agent.id;
      if (id) {
        acc.byId[id] = agent;
        acc.allIds.push(id);
      }
      return acc;
    },
    { byId: {}, allIds: [] }
  );
};


/* Normalizing a Notifications Array to a { byId, allIds } form */
export const normalizeNotifications = (notifications: any[] = []) => {
  return notifications.reduce<NormalizedNotifications>(
    (acc, notification) => {
      const id = notification.id;
      if (id) {
        acc.byId[id] = notification;
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

/* Function for handling errors from the complete chat API */
export const handleCompleteChatError = (errors: any) => {
    console.log('Raw API Error:', errors);

    // Asegúrate de que errors.data existe
    if (!errors?.data || typeof errors.data !== 'object') {
      toast.error('Error desconocido. Por favor, intenta de nuevo.');
      return;
    }

    const data = errors.data;

    // Mapea los campos posibles a mensajes amigables
    const fieldErrors: Record<string, string> = {
      session_id: data.session_id?.[0] || '',
      email: data.email?.[0] || '',
      full_name: data.full_name?.[0] || '',
      phone_number: data.phone_number?.[0] || '',
      recaptcha_token: data.recaptcha_token?.[0] || '',
      // Para errores no específicos del campo
      non_field_errors: data.non_field_errors?.[0] || '',
      detail: data.detail || '',
    };

    // Filtra solo los que tienen mensaje
    const activeErrors = Object.entries(fieldErrors)
      .filter(([, msg]) => msg)
      .map(([field, msg]) => {
        // Opcional: humanizar el nombre del campo
        const fieldName = {
          session_id: 'Sesión',
          email: 'Correo',
          full_name: 'Nombre',
          phone_number: 'Teléfono',
          recaptcha_token: 'reCAPTCHA',
          non_field_errors: 'Error general',
          detail: 'Detalle',
        }[field] || field;

        return `${fieldName}: ${msg}`;
    });

  const errorMessage = activeErrors.length > 0
    ? activeErrors.join(' | ')
    : 'Error en el formulario. Por favor, revisa los campos.';

  console.log('Handled Errors:', errorMessage);
  toast.error(errorMessage);
};