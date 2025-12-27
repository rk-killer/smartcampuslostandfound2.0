import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useUserItems } from "@/hooks/useItems";
import { User, Mail, Calendar, LogOut, Package, CheckCircle, MessageCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { format } from "date-fns";

export default function Profile() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { data: userItems, isLoading: itemsLoading } = useUserItems();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const lostItems = userItems?.filter((item) => item.status === "lost") || [];
  const foundItems = userItems?.filter((item) => item.status === "found") || [];
  const resolvedItems = userItems?.filter((item) => item.is_resolved) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-1 mb-4">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              <span className="gradient-text">My Profile</span>
            </h1>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-primary">
                      {user.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl font-display font-semibold mb-2">
                      {user.user_metadata?.full_name || "Campus User"}
                    </h2>
                    <div className="flex flex-col gap-2 text-muted-foreground">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <span>
                          Joined {format(new Date(user.created_at), "MMMM yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to="/messages">
                      <Button variant="outline" className="gap-2 w-full">
                        <MessageCircle className="w-4 h-4" />
                        Messages
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <Card className="hover:border-destructive/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-display font-bold text-destructive mb-1">
                  {lostItems.length}
                </div>
                <div className="text-sm text-muted-foreground">Lost Items</div>
              </CardContent>
            </Card>
            <Card className="hover:border-secondary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-display font-bold text-secondary mb-1">
                  {foundItems.length}
                </div>
                <div className="text-sm text-muted-foreground">Found Items</div>
              </CardContent>
            </Card>
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-display font-bold text-primary mb-1">
                  {resolvedItems.length}
                </div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  My Posted Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                {itemsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : userItems && userItems.length > 0 ? (
                  <div className="space-y-4">
                    {userItems.map((item) => (
                      <Link
                        key={item.id}
                        to={`/item/${item.id}`}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors block"
                      >
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold">{item.title}</h3>
                            {item.is_resolved ? (
                              <Badge variant="secondary" className="gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Resolved
                              </Badge>
                            ) : (
                              <Badge variant={item.status === "lost" ? "lost" : "found"}>
                                {item.status}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.location} • {format(new Date(item.item_date), "MMM d, yyyy")}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">No items posted yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Report a lost or found item to get started
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
