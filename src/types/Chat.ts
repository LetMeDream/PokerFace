type ChatMessage = {
  type?: 'guest' | 'agent' | 'contactForm';
  sender_type?: 'user' | 'system' | 'agent';
  attachment?: string | null;
  can_mark_read?: boolean;
  content: string;
  created_at?: string;
  id?: string;
  is_edited: boolean;
  is_read: boolean;
  read_status: {
    status: 'read' | 'delivered' | 'sent';
    read_at: string | null;
  };
  sender_info: {
    type: 'system' | 'guest' | 'agent';
    name: string;
  }
};

export type MessagesProps = {
  chatMessages: ChatMessage[];
  isSending?: boolean;
  setIsSending?: (isSending: boolean) => void;
  setIsUserConected?: (isUserConected: boolean) => void;
  isUserConected?: boolean;
  chatBodyRef?: React.RefObject<HTMLDivElement | null>; 
  type?: 'guest' | 'agent';
};

export type FormValues = {
  name?: string;
  phone: string;
  email?: string;
  recaptcha: string;
};

export type ContactFormValues = {
  session_id: string;
  email?: string;
  full_name?: string;
  phone_number: string;
  recaptcha_token: string;
}