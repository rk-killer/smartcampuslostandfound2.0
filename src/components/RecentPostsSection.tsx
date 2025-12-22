import { motion } from "framer-motion";
import { ItemCard } from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useItems } from "@/hooks/useItems";
import { format } from "date-fns";

export function RecentPostsSection() {
  const { data: items, isLoading } = useItems();

  // Get most recent 6 items
  const recentItems = items?.slice(0, 6) || [];

  return (
    <section className="py-20 px-4 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-foreground">Recent</span>{" "}
            <span className="gradient-text">Posts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse the latest lost and found items reported by our campus community
          </p>
        </motion.div>

        {/* Items Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ItemCard
                  id={item.id}
                  title={item.title}
                  category={item.category}
                  date={format(new Date(item.item_date), "MMM d, yyyy")}
                  location={item.location}
                  image={item.image_url || "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop"}
                  status={item.status as "lost" | "found"}
                  description={item.description || undefined}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-12">
            <p className="text-muted-foreground">No items reported yet. Be the first to post!</p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/my-match">
            <Button variant="outline" size="lg" className="group">
              View All Items
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
