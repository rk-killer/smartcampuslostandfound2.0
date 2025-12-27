import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  useConversations,
  useMessages,
  useSendMessage,
  useMarkAsRead,
} from "@/hooks/useMessages";
import { MessageCircle, Send, ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Messages() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: conversations, isLoading: conversationsLoading } =
    useConversations();
  const [selectedConversation, setSelectedConversation] = useState<{
    userId: string;
    itemId: string | null;
    userName: string;
    itemTitle: string | null;
  } | null>(null);

  const { data: messages, isLoading: messagesLoading } = useMessages(
    selectedConversation?.userId || "",
    selectedConversation?.itemId
  );
  const sendMessage = useSendMessage();
  const markAsRead = useMarkAsRead();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Mark messages as read when viewing a conversation
  useEffect(() => {
    if (messages && user) {
      const unreadIds = messages
        .filter((m) => !m.is_read && m.receiver_id === user.id)
        .map((m) => m.id);
      if (unreadIds.length > 0) {
        markAsRead.mutate(unreadIds);
      }
    }
  }, [messages, user]);

  const handleSendMessage = async () => {
    if (!selectedConversation || !newMessage.trim()) return;

    await sendMessage.mutateAsync({
      receiverId: selectedConversation.userId,
      content: newMessage,
      itemId: selectedConversation.itemId || undefined,
    });
    setNewMessage("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-1 mb-4">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              <span className="gradient-text">Messages</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-[600px]">
              <div className="grid md:grid-cols-3 h-full">
                {/* Conversations List */}
                <div className="border-r border-border">
                  <CardHeader className="border-b border-border py-4">
                    <CardTitle className="text-lg">Conversations</CardTitle>
                  </CardHeader>
                  <ScrollArea className="h-[520px]">
                    {conversationsLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : conversations && conversations.length > 0 ? (
                      <div className="p-2">
                        {conversations.map((conv, idx) => (
                          <button
                            key={`${conv.other_user_id}-${conv.item_id || idx}`}
                            onClick={() =>
                              setSelectedConversation({
                                userId: conv.other_user_id,
                                itemId: conv.item_id,
                                userName: conv.other_user_email,
                                itemTitle: conv.item_title,
                              })
                            }
                            className={cn(
                              "w-full text-left p-3 rounded-lg transition-colors mb-1",
                              selectedConversation?.userId ===
                                conv.other_user_id &&
                                selectedConversation?.itemId === conv.item_id
                                ? "bg-primary/10 border border-primary/30"
                                : "hover:bg-muted/50"
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium truncate">
                                    {conv.other_user_email}
                                  </p>
                                  {conv.unread_count > 0 && (
                                    <Badge variant="default" className="text-xs">
                                      {conv.unread_count}
                                    </Badge>
                                  )}
                                </div>
                                {conv.item_title && (
                                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                    <Package className="w-3 h-3" />
                                    <span className="truncate">
                                      {conv.item_title}
                                    </span>
                                  </div>
                                )}
                                <p className="text-sm text-muted-foreground truncate mt-1">
                                  {conv.last_message}
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {format(
                                  new Date(conv.last_message_at),
                                  "MMM d"
                                )}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <p>No conversations yet</p>
                      </div>
                    )}
                  </ScrollArea>
                </div>

                {/* Chat Area */}
                <div className="md:col-span-2 flex flex-col">
                  {selectedConversation ? (
                    <>
                      {/* Chat Header */}
                      <div className="border-b border-border p-4 flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="md:hidden"
                          onClick={() => setSelectedConversation(null)}
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div>
                          <p className="font-semibold">
                            {selectedConversation.userName}
                          </p>
                          {selectedConversation.itemTitle && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {selectedConversation.itemTitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Messages */}
                      <ScrollArea className="flex-1 p-4">
                        {messagesLoading ? (
                          <div className="flex justify-center py-8">
                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {messages?.map((msg) => (
                              <div
                                key={msg.id}
                                className={cn(
                                  "flex",
                                  msg.sender_id === user.id
                                    ? "justify-end"
                                    : "justify-start"
                                )}
                              >
                                <div
                                  className={cn(
                                    "max-w-[80%] rounded-2xl px-4 py-2",
                                    msg.sender_id === user.id
                                      ? "bg-primary text-primary-foreground rounded-br-md"
                                      : "bg-muted rounded-bl-md"
                                  )}
                                >
                                  <p className="text-sm">{msg.content}</p>
                                  <p
                                    className={cn(
                                      "text-xs mt-1",
                                      msg.sender_id === user.id
                                        ? "text-primary-foreground/70"
                                        : "text-muted-foreground"
                                    )}
                                  >
                                    {format(
                                      new Date(msg.created_at),
                                      "h:mm a"
                                    )}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>

                      {/* Input */}
                      <div className="border-t border-border p-4">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                          }}
                          className="flex gap-2"
                        >
                          <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            type="submit"
                            size="icon"
                            disabled={
                              sendMessage.isPending || !newMessage.trim()
                            }
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Select a conversation to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
