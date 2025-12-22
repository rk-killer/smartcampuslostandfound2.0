import { motion } from "framer-motion";
import { Search, Upload, Bell, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Report Item",
    description: "Report a lost or found item with detailed information and images",
    color: "primary",
  },
  {
    icon: Upload,
    title: "Add Details",
    description: "Upload photos and provide location, date, and description",
    color: "secondary",
  },
  {
    icon: Bell,
    title: "Get Matched",
    description: "Our smart system matches lost items with found reports",
    color: "accent",
  },
  {
    icon: CheckCircle,
    title: "Reconnect",
    description: "Contact the poster and retrieve your belongings",
    color: "primary",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-foreground">How It</span>{" "}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to reconnect with your belongings
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="glass-card p-6 text-center h-full hover:border-primary/50 transition-all duration-300 group">
                {/* Step Number */}
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold font-display">
                  Step {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-${step.color}/10 border border-${step.color}/30 flex items-center justify-center group-hover:shadow-neon-${step.color} transition-shadow duration-300`}
                  style={{
                    boxShadow: `0 0 20px hsl(var(--${step.color}) / 0.2)`,
                  }}
                >
                  <step.icon
                    className="w-8 h-8"
                    style={{ color: `hsl(var(--${step.color}))` }}
                  />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
