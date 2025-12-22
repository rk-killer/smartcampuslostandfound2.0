import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ItemCard } from "@/components/ItemCard";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";

const categories = [
  "All",
  "ID Card",
  "Wallet",
  "Phone",
  "Keys",
  "Books",
  "Electronics",
  "Clothing",
  "Others",
];

const statusFilters = ["All", "Lost", "Found"];

// Mock data
const allItems = [
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
  {
    id: "7",
    title: "Textbook - Calculus",
    category: "Books",
    date: "Dec 14, 2025",
    location: "Room 302, Science Building",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    status: "found" as const,
    description: "Calculus Early Transcendentals, 8th Edition",
  },
  {
    id: "8",
    title: "Blue Backpack",
    category: "Others",
    date: "Dec 13, 2025",
    location: "Bus Stop",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    status: "lost" as const,
    description: "Navy blue Jansport backpack with laptop compartment",
  },
];

export default function MyMatch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "All" ||
      item.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || selectedStatus !== "All";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-4">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
              <span className="gradient-text">My Match</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Search and filter through all reported items to find yours
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by item name, description, or location..."
                className="pl-12 pr-12 h-14 text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            {/* Filter Toggle (Mobile) */}
            <div className="flex items-center justify-between mb-4 md:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="neon" className="ml-1">
                    Active
                  </Badge>
                )}
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>

            {/* Filter Options */}
            <div
              className={`${
                showFilters ? "block" : "hidden"
              } md:block glass-card p-4 rounded-2xl`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground hidden md:block" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Status:
                  </span>
                  <div className="flex gap-2">
                    {statusFilters.map((status) => (
                      <Badge
                        key={status}
                        variant={selectedStatus === status ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:scale-105"
                        onClick={() => setSelectedStatus(status)}
                      >
                        {status}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block w-px h-6 bg-border" />

                {/* Category Filter */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-muted-foreground">
                      Category:
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant={
                            selectedCategory === category ? "neon" : "outline"
                          }
                          className="cursor-pointer transition-all hover:scale-105"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Button (Desktop) */}
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="hidden md:flex"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="text-primary font-semibold">
                {filteredItems.length}
              </span>{" "}
              {filteredItems.length === 1 ? "item" : "items"}
            </p>
          </motion.div>

          {/* Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <ItemCard {...item} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                No items found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
