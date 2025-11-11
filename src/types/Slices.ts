// * HERE WE ACTUALLY HAVE TYPES FOR SLICES AND SERVICES
/* 
* For user 
*/
export interface UserState {
  id: number | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean | null;
}

/* 
* For base 
*/
export type MessageType = 'guest' | 'agent' | 'system';

export interface ChatMessage {
  message_type: MessageType;
  content: string;
  type: string; 
  // campos opcionales útiles
  timestamp?: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export type TicketStatus = 'active' | 'pending' | 'closed' | 'on_hold' | string;

interface ChatUser {
  id: number;
  email: string;
  full_name: string;
  phone_number: string | null;
  created_at: string; // ISO 8601
}
export interface ChatTicket {
  id: number;
  chat_room_id: string | null;
  chat_user: ChatUser;
  status: TicketStatus;
  priority: string;
  subject: string;
  initial_message: string;
  messages: ChatMessage[];
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
  agent_assigned: boolean;
  agent_name: string | null;
}

export type AllTickets = ChatTicket[];

export type NormalizedTickets = {
    byId: Record<number, AllTickets[number]>,
    allIds: number[]
}

/* For 
* Service
*/
// Tipos
type User = {
  id: number;
  username: string;
  email: string;
};

type ExtendedUser = User & {
  first_name: string;
  last_name: string;
};

export type Agent = {
  can_take_chat: boolean;
  currently_active_chats: number;
  id: number;
  department: string | null;
  employee_id: string;
  full_name: string;
  is_available: boolean;
  max_concurrent_chats: number;
  rating: string | null;
  total_resolved_chats: number;
  user: User;
}

export type LoginSuccess = {
  token: string;
  agent: Agent;
  user: ExtendedUser;
};


type LoginFailure = {
  success: false;
  error: string;
};

export type LoginResponse = LoginSuccess | LoginFailure;

export type ticketsSuccess = {
  success: true;
  data: any[];
}

type ticketsFailure = {
  success: false;
  error: string;
}
export type TicketsResponse = ticketsSuccess | ticketsFailure;

// Guest message
export interface guestMessage {
  chat_room_id: string;
  content: string;
  user_data: {
    id: string;
    phoner_number: string;
    is_temporary: boolean;
  }
}