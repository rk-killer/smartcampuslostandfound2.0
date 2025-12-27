import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useItems, useResolveItem } from "@/hooks/useItems";
import { useSendMessage } from "@/hooks/useMessages";
import {
  Calendar,
  MapPin,
  Mail,
  MessageCircle,
  CheckCircle,
  ArrowLeft,
  PartyPopper,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: items } = useItems();
  const resolveItem = useResolveItem();
  const sendMessage = useSendMessage();

  const [message, setMessage] = useState("");
  const [successStory, setSuccessStory] = useState("");
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const item = items?.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">Item not found</p>
            <Button onClick={() => navigate(-1)} className="mt-4">
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isOwner = user?.id === item.user_id;

  const handleSendMessage = async () => {
    if (!user) {
      toast.error("Please sign in to send messages");
      navigate("/auth");
      return;
    }
    if (!message.trim()) return;

    await sendMessage.mutateAsync({
      receiverId: item.user_id,
      content: message,
      itemId: item.id,
    });

    setMessage("");
    setMessageDialogOpen(false);
    toast.success("Message sent successfully!");
  };

  const handleResolve = async () => {
    await resolveItem.mutateAsync({
      itemId: item.id,
      successStory: successStory.trim() || undefined,
    });
    setResolveDialogOpen(false);
    toast.success("Item marked as resolved!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={
                    item.image_url ||
                    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop"
                  }
                  alt={item.title}
                  className="w-full aspect-video object-cover"
                />
                {item.is_resolved && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-2" />
                      <p className="text-xl font-display font-bold text-secondary">
                        Resolved!
                      </p>
                    </div>
                  </div>
                )}
                <Badge
                  variant={item.status === "lost" ? "lost" : "found"}
                  className="absolute top-4 right-4"
                >
                  {item.status === "lost" ? "Lost" : "Found"}
                </Badge>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-4">
                {item.title}
              </h1>

              <Badge variant="neon" className="mb-4">
                {item.category}
              </Badge>

              {item.description && (
                <p className="text-muted-foreground mb-6">{item.description}</p>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    {item.status === "lost" ? "Lost on" : "Found on"}{" "}
                    {format(new Date(item.item_date), "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>{item.contact_email}</span>
                </div>
              </div>

              {/* Success Story */}
              {item.is_resolved && item.success_story && (
                <Card className="mb-6 border-secondary/50 bg-secondary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <PartyPopper className="w-5 h-5 text-secondary" />
                      <span className="font-semibold text-secondary">
                        Success Story
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.success_story}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              {!item.is_resolved && (
                <div className="flex flex-col sm:flex-row gap-3">
                  {isOwner ? (
                    <Dialog
                      open={resolveDialogOpen}
                      onOpenChange={setResolveDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="gap-2" variant="default">
                          <CheckCircle className="w-4 h-4" />
                          Mark as Resolved
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Mark Item as Resolved</DialogTitle>
                          <DialogDescription>
                            Great news! Share your success story to inspire
                            others.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Textarea
                            placeholder="Share how you found/returned this item (optional)..."
                            value={successStory}
                            onChange={(e) => setSuccessStory(e.target.value)}
                            rows={4}
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setResolveDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleResolve}
                            disabled={resolveItem.isPending}
                          >
                            {resolveItem.isPending
                              ? "Resolving..."
                              : "Confirm Resolution"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Dialog
                      open={messageDialogOpen}
                      onOpenChange={setMessageDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Send Message
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contact Owner</DialogTitle>
                          <DialogDescription>
                            Send a message about "{item.title}"
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Textarea
                            placeholder="Hi, I think I may have information about this item..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setMessageDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSendMessage}
                            disabled={sendMessage.isPending || !message.trim()}
                          >
                            {sendMessage.isPending ? "Sending..." : "Send Message"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
