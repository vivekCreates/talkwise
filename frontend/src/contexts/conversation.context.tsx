import { createContext } from "react";

export interface IConversation {
  id: string;   // lowercase string
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

type ConversationContextType = {
  conversations: IConversation[] | null;
  setConversations: (convs: IConversation[] | []) => void;
  loading: boolean;
  createConversation: (title: string) => Promise<void>;
  getConversation: (id: string) => Promise<void>;
  getAllConversations: () => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
};

const ConversationContext = createContext<ConversationContextType>({
  conversations: [],
  setConversations: () => {},
  loading: false,
  createConversation: async () => {},
  getConversation: async () => {},
  getAllConversations: async () => {},
  deleteConversation: async () => {},
});

export default ConversationContext;
