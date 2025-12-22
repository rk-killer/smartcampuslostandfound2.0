import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useItems } from "@/hooks/useItems";
import { Search, Filter, X, SlidersHorizontal, Calendar, MapPin, Mail } from "lucide-react";
import { format } from "date-fns";

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

export default function MyMatch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const { data: items, isLoading } = useItems({
    status: selectedStatus,
    category: selectedCategory,
    search: searchQuery,
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
                {items?.length || 0}
              </span>{" "}
              {items?.length === 1 ? "item" : "items"}
            </p>
          </motion.div>

          {/* Items Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items && items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Search className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <Badge
                        variant={item.status === "lost" ? "lost" : "found"}
                        className="absolute top-3 right-3"
                      >
                        {item.status}
                      </Badge>
                    </div>

                    <CardContent className="p-5">
                      {/* Title & Category */}
                      <div className="mb-3">
                        <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <Badge variant="neon" className="mt-2 text-xs">
                          {item.category}
                        </Badge>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {item.description}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{format(new Date(item.item_date), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-secondary" />
                          <span className="line-clamp-1">{item.location}</span>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="mt-4 pt-3 border-t border-border">
                        <a
                          href={`mailto:${item.contact_email}`}
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          <Mail className="w-4 h-4" />
                          Contact Poster
                        </a>
                      </div>
                    </CardContent>
                  </Card>
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
                {hasActiveFilters
                  ? "Try adjusting your search or filters"
                  : "No items have been reported yet"}
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
