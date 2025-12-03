// * HERE WE ACTUALLY HAVE TYPES FOR SLICES AND SERVICES
/* 
* For user 
*/
import type { AgentState } from "../store/slices/agent";
export interface UserState {
  id: number | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean | null;
  is_superuser: boolean;
  assigned_agents:  {
    byId: Record<number, AgentState>,
    allIds: number[]
  };
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
  id: string;
  chat_room_id: string | null;
  chat_user_info: ChatUser;
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

export type NormalizedAgents = {
    byId: Record<number, AgentState>,
    allIds: number[]
}

export type NormalizedNotifications = {
    byId: Record<number, any>,
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

/* Previous LOGIN type */
export type LoginSuccess = {
  token: string;
  agent: Agent;
  user: ExtendedUser;
};

/* We will use JWT now */
export type LOGINJWTSuccess = {
  access: string;
  refresh: string;
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
    phone_number: string;
    is_temporary: boolean;
  }
}


export interface ReceivedChatMessage {
  agent: Agent;
  chat_user_info: {
    is_temporary: boolean;
    phone_number: string;
  };
  created_at: string;
  id: number;
  initial_message: string;
  messages: any []; // needs to be typed better
  priority: number;
  status: string;
  subject: string;
  tags: string; // probably should be array
  updated_at: string;
}


/* Type for Agents Creation */
export interface CreateAgentPayload {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  employee_id?: string | number;
  department?: string;
  is_available?: boolean;
  max_concurrent_chats?: number;
}



/* Type for NOTIFICATIONS GET endpoint */
export interface Notifications {
  notifications: NotificationItem[];
  total_count: number;
  unread_count: number;
}

export interface NotificationItem {
  id: number;
  chat_room_id: string;
  chat_room_subject: string;
  created_at: string; // ISO 8601
  is_read: boolean;
  message: string;
  // "notification_type": "new_chat|new_message|chat_assigned|chat_transferred|chat_resolved",
  notification_type: 'new_chat' | 'agent_assigned' | 'new_message' | 'chat_resolved' | 'chat_closed' | 'agent_unassigned' ;
  read_at: string | null; // ISO 8601 or null
  title: string;
}