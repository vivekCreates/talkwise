import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { 
  createConversationApi,
  deleteConversationApi,
  getAllConversationsApi,
  getConversationApi } from "../api/conversation";

export interface IConversation {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

type ConversationContextType = {
  conversations: IConversation[] | null;
  selectedConversation: IConversation | null;
  isLoading: boolean;
  createConversation: (title: string) => Promise<void>;
  getAllConversations: () => Promise<void>;
  getConversation: (id: string) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
};

const ConversationContext = createContext<ConversationContextType>({
  conversations: [],
  selectedConversation: null,
  isLoading: false,
  createConversation: async () => { },
  getConversation: async () => { },
  getAllConversations: async () => { },
  deleteConversation: async () => { },
});

export const useConversation = () => useContext(ConversationContext)

const ConversationProvider: React.FC<{ children: React.ReactNode }> =
  ({ children }) => {

    const [conversations, setConversations] = useState<IConversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const createConversation = async (title: string) => {
      setIsLoading(true)
      try {
        const res = await createConversationApi(title);
        if (!res.success) {
          toast.error(res.message)
        }
        toast.success(res.message)
      } catch (error: any) {
        toast.error(error?.message)
      } finally {
        setIsLoading(false)
      }
    }

    const getAllConversations = async () => {
      setIsLoading(true)
      try {
        const res = await getAllConversationsApi();
        if (!res.success) {
          setConversations([])
          return;
        }
        setConversations(res.data);
      } catch (error: any) {
        toast.error(error?.message)
      } finally {
        setIsLoading(false)
      }
    }

    const getConversation = async (id: string) => {
      setIsLoading(true)
      try {
        const res = await getConversationApi(id);
        if (!res.success) {
           toast.error(res.message);
           return
        }
        setSelectedConversation(res.data);
        toast.success(res.message)
      } catch (error: any) {
        toast.error(error?.message)
      } finally {
        setIsLoading(false)
      }
    }

    const deleteConversation = async (id: string) => {
      setIsLoading(true)
      try {
        const res = await deleteConversationApi(id);

        if (!res.success){
        toast.error(res.message);
        return;
        }
        setConversations(prev => ([...prev.filter(p => p.id !== id)]))
        toast.success(res.message)
      } catch (error: any) {
       toast.error(error?.message)
      } finally {
        setIsLoading(false)
      }
    }

    return <ConversationContext.Provider value={{ conversations, selectedConversation, isLoading, createConversation, getAllConversations,getConversation,deleteConversation }}>
      {children}
    </ConversationContext.Provider>
  }


export default ConversationProvider;
