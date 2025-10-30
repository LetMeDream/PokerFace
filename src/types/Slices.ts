/* For user */
export interface UserState {
  id: number | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean | null;
}

/* For base */
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

export interface ChatTicket {
  chat_room_id: string;
  nickname: string;
  status: TicketStatus;
  unread_count: number;
  agent_assigned: boolean;
  agent_name?: string | null;
  avatarSrc?: string | null;
  messages: ChatMessage[];
}

export type AllTickets = ChatTicket[];