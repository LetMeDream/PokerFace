type ChatMessage = {
  type: string;
  content: string;
};

export type MessagesProps = {
  chatMessages: ChatMessage[];
  isSending: boolean;
  setIsSending: (isSending: boolean) => void;
  setIsUserConected: (isUserConected: boolean) => void;
  isUserConected: boolean;
  chatBodyRef: React.RefObject<HTMLDivElement | null>;    
};

export type FormValues = {
  name: string;
  phone: string;
  email: string;
};