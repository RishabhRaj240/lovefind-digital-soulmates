import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  status: "sending" | "sent" | "delivered" | "read";
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  participants: {
    user_id: string;
    profile: {
      first_name: string | null;
      last_name: string | null;
      avatar_url: string | null;
    };
  }[];
  messages: Message[];
  last_message?: Message;
}

export const useMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          conversation_participants!inner (
            user_id,
            profile:profiles (
              first_name,
              last_name,
              avatar_url
            )
          ),
          messages (
            *
          )
        `)
        .eq("conversation_participants.user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;

      // Transform and sort conversations by last message
      const transformedConversations = data?.map((conv: any) => {
        const messages = conv.messages.sort((a: any, b: any) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        
        return {
          ...conv,
          participants: conv.conversation_participants,
          messages,
          last_message: messages[messages.length - 1],
        };
      }).sort((a: any, b: any) => {
        const aTime = a.last_message?.created_at || a.created_at;
        const bTime = b.last_message?.created_at || b.created_at;
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      }) || [];

      setConversations(transformedConversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async (otherUserId: string) => {
    if (!user) return null;

    try {
      // Check if conversation already exists
      const { data: existingConv } = await supabase
        .from("conversation_participants")
        .select("conversation_id")
        .eq("user_id", user.id);

      if (existingConv) {
        for (const conv of existingConv) {
          const { data: otherParticipant } = await supabase
            .from("conversation_participants")
            .select("conversation_id")
            .eq("conversation_id", conv.conversation_id)
            .eq("user_id", otherUserId)
            .single();

          if (otherParticipant) {
            return conv.conversation_id;
          }
        }
      }

      // Create new conversation
      const { data: newConv, error: convError } = await supabase
        .from("conversations")
        .insert({})
        .select()
        .single();

      if (convError) throw convError;

      // Add participants
      const { error: participantsError } = await supabase
        .from("conversation_participants")
        .insert([
          { conversation_id: newConv.id, user_id: user.id },
          { conversation_id: newConv.id, user_id: otherUserId },
        ]);

      if (participantsError) throw participantsError;

      return newConv.id;
    } catch (error) {
      console.error("Error creating conversation:", error);
      return null;
    }
  };

  const sendMessage = async (conversationId: string, content: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content,
          status: "sent",
        })
        .select()
        .single();

      if (error) throw error;

      // Update conversation's updated_at
      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conversationId);

      return data;
    } catch (error) {
      console.error("Error sending message:", error);
      return null;
    }
  };

  const getConversation = async (conversationId: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          conversation_participants (
            user_id,
            profile:profiles (
              first_name,
              last_name,
              avatar_url
            )
          ),
          messages (
            *
          )
        `)
        .eq("id", conversationId)
        .single();

      if (error) throw error;

      // Sort messages by created_at
      const messages = data.messages.sort((a: any, b: any) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      return {
        ...data,
        participants: data.conversation_participants,
        messages,
      };
    } catch (error) {
      console.error("Error fetching conversation:", error);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  return {
    conversations,
    loading,
    createConversation,
    sendMessage,
    getConversation,
    refetchConversations: fetchConversations,
  };
};