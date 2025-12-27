import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useItems } from "@/hooks/useItems";
import { PartyPopper, CheckCircle, Quote } from "lucide-react";
import { format } from "date-fns";

export function SuccessStoriesSection() {
  const { data: items, isLoading } = useItems();

  // Get resolved items with success stories
  const successStories =
    items
      ?.filter((item) => item.is_resolved && item.success_story)
      .slice(0, 3) || [];

  if (isLoading || successStories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 relative bg-gradient-to-b from-background via-secondary/5 to-background">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary via-primary to-accent p-1 mb-4">
            <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
              <PartyPopper className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-foreground">Success</span>{" "}
            <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Heartwarming stories of items reunited with their owners
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-secondary/50 hover:shadow-[0_0_30px_hsl(var(--secondary)/0.15)] transition-all">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold truncate">
                        {story.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={story.status === "lost" ? "lost" : "found"}
                          className="text-xs"
                        >
                          {story.status === "lost" ? "Was Lost" : "Was Found"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(story.resolved_at || story.updated_at), "MMM d")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <div className="relative pl-4 border-l-2 border-secondary/30">
                    <Quote className="absolute -left-2.5 -top-0.5 w-5 h-5 text-secondary bg-background" />
                    <p className="text-sm text-muted-foreground line-clamp-4 italic">
                      {story.success_story}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/10 border border-secondary/20">
            <CheckCircle className="w-5 h-5 text-secondary" />
            <span className="font-medium">
              {items?.filter((i) => i.is_resolved).length || 0} items reunited
              with their owners
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
