import { motion } from "framer-motion";
import { ItemCard } from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for recent posts
const recentItems = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    category: "Electronics",
    date: "Dec 20, 2025",
    location: "Library, 2nd Floor",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop",
    status: "lost" as const,
    description: "Black iPhone 15 Pro Max with blue silicone case",
  },
  {
    id: "2",
    title: "Student ID Card",
    category: "ID Card",
    date: "Dec 19, 2025",
    location: "Cafeteria",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
    status: "found" as const,
    description: "Found near the main entrance of the cafeteria",
  },
  {
    id: "3",
    title: "MacBook Charger",
    category: "Electronics",
    date: "Dec 18, 2025",
    location: "Computer Lab B",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=300&fit=crop",
    status: "found" as const,
    description: "USB-C MagSafe charger, 67W",
  },
  {
    id: "4",
    title: "Black Wallet",
    category: "Wallet",
    date: "Dec 17, 2025",
    location: "Sports Complex",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
    status: "lost" as const,
    description: "Leather wallet with cards inside",
  },
  {
    id: "5",
    title: "AirPods Pro",
    category: "Electronics",
    date: "Dec 16, 2025",
    location: "Lecture Hall A",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=300&fit=crop",
    status: "lost" as const,
    description: "White AirPods Pro 2nd generation with case",
  },
  {
    id: "6",
    title: "Car Keys",
    category: "Keys",
    date: "Dec 15, 2025",
    location: "Parking Lot C",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    status: "found" as const,
    description: "Honda car keys with keychain",
  },
];

export function RecentPostsSection() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recentItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ItemCard {...item} />
            </motion.div>
          ))}
        </div>

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
