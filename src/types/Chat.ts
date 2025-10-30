type ChatMessage = {
  type: string;
  message_type?: string;
  content: string;
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
  name: string;
  phone: string;
  email: string;
};