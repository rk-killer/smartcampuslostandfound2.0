import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Eye, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ItemCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  status: "lost" | "found";
  description?: string;
  isResolved?: boolean;
}

export function ItemCard({
  id,
  title,
  category,
  date,
  location,
  image,
  status,
  description,
  isResolved,
}: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/item/${id}`}>
        <Card className="overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] cursor-pointer h-full">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            {isResolved ? (
              <Badge
                variant="secondary"
                className="absolute top-3 right-3 gap-1 bg-secondary/90"
              >
                <CheckCircle className="w-3 h-3" />
                Resolved
              </Badge>
            ) : (
              <Badge
                variant={status === "lost" ? "lost" : "found"}
                className="absolute top-3 right-3"
              >
                {status === "lost" ? "Lost" : "Found"}
              </Badge>
            )}
          </div>

          <CardContent className="p-5">
            {/* Title & Category */}
            <div className="mb-3">
              <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {title}
              </h3>
              <Badge variant="neon" className="mt-2 text-xs">
                {category}
              </Badge>
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {description}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-secondary" />
                <span className="line-clamp-1">{location}</span>
              </div>
            </div>

            {/* View Details */}
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Click to view details</span>
              <Eye className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
