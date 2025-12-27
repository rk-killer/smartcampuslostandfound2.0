import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  item_id: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Conversation {
  other_user_id: string;
  other_user_email: string;
  item_id: string | null;
  item_title: string | null;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export function useConversations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          queryClient.invalidateQueries({ queryKey: ["messages"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  return useQuery({
    queryKey: ["conversations", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: messages, error } = await supabase
        .from("messages")
        .select(`
          *,
          items:item_id (
            title
          )
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Group messages by conversation partner
      const conversationMap = new Map<string, Conversation>();

      for (const msg of messages || []) {
        const otherUserId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
        const key = `${otherUserId}-${msg.item_id || "general"}`;

        if (!conversationMap.has(key)) {
          conversationMap.set(key, {
            other_user_id: otherUserId,
            other_user_email: otherUserId, // Will be replaced with profile data
            item_id: msg.item_id,
            item_title: (msg.items as any)?.title || null,
            last_message: msg.content,
            last_message_at: msg.created_at,
            unread_count: 0,
          });
        }

        if (!msg.is_read && msg.receiver_id === user.id) {
          const conv = conversationMap.get(key)!;
          conv.unread_count += 1;
        }
      }

      // Fetch profile emails for other users
      const otherUserIds = [...new Set([...conversationMap.values()].map((c) => c.other_user_id))];
      if (otherUserIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, email, full_name")
          .in("user_id", otherUserIds);

        if (profiles) {
          for (const conv of conversationMap.values()) {
            const profile = profiles.find((p) => p.user_id === conv.other_user_id);
            if (profile) {
              conv.other_user_email = profile.full_name || profile.email || conv.other_user_id;
            }
          }
        }
      }

      return [...conversationMap.values()].sort(
        (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
      );
    },
    enabled: !!user,
  });
}

export function useMessages(otherUserId: string, itemId?: string | null) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["messages", user?.id, otherUserId, itemId],
    queryFn: async () => {
      if (!user) return [];

      let query = supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`
        )
        .order("created_at", { ascending: true });

      if (itemId) {
        query = query.eq("item_id", itemId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Message[];
    },
    enabled: !!user && !!otherUserId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      receiverId,
      content,
      itemId,
    }: {
      receiverId: string;
      content: string;
      itemId?: string;
    }) => {
      if (!user) throw new Error("Must be logged in to send messages");

      const { data, error } = await supabase
        .from("messages")
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          content,
          item_id: itemId || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (error) => {
      toast.error("Failed to send message", {
        description: error.message,
      });
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (messageIds: string[]) => {
      if (!user) throw new Error("Must be logged in");

      const { error } = await supabase
        .from("messages")
        .update({ is_read: true })
        .in("id", messageIds)
        .eq("receiver_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useUnreadCount() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["unread-count", user?.id],
    queryFn: async () => {
      if (!user) return 0;

      const { count, error } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("receiver_id", user.id)
        .eq("is_read", false);

      if (error) throw error;
      return count || 0;
    },
    enabled: !!user,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}
