import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Shield, Sparkles } from "lucide-react";

const team = [
  {
    name: "Rohit",
    role: "Lead Developer",
    color: "primary",
  },
  {
    name: "Koyel",
    role: "UI/UX Designer",
    color: "secondary",
  },
  {
    name: "Surya",
    role: "Backend Developer",
    color: "accent",
  },
];

const features = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security",
  },
  {
    icon: Target,
    title: "Smart Matching",
    description: "Advanced algorithms to match lost and found items",
  },
  {
    icon: Sparkles,
    title: "Real-time Updates",
    description: "Instant notifications when matches are found",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              About <span className="gradient-text">Smart Campus</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Smart Campus Lost & Found is a futuristic campus solution built to help 
              students and staff recover lost belongings easily and efficiently.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-1">
                      <div className="w-full h-full rounded-3xl bg-background flex items-center justify-center">
                        <Target className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold mb-3">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We believe that losing personal belongings shouldn't be a stressful experience. 
                      Our platform bridges the gap between those who've lost items and those who've 
                      found them, creating a supportive community where campus members help each other. 
                      Through innovative technology and user-friendly design, we're making the lost and 
                      found process seamless, efficient, and accessible to everyone.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-display font-bold text-center mb-8">
              Why Choose <span className="text-primary">Smart Campus</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-display font-bold text-center mb-8">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="h-full hover:border-primary/50 transition-all duration-300 group">
                    <CardContent className="p-8 text-center">
                      {/* Avatar */}
                      <div
                        className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-${member.color}/20 border border-${member.color}/30 flex items-center justify-center group-hover:shadow-neon-${member.color} transition-shadow duration-300`}
                        style={{
                          boxShadow: `0 0 20px hsl(var(--${member.color}) / 0.2)`,
                        }}
                      >
                        <span
                          className="text-3xl font-display font-bold"
                          style={{ color: `hsl(var(--${member.color}))` }}
                        >
                          {member.name[0]}
                        </span>
                      </div>
                      <h3
                        className="font-display font-semibold text-xl mb-1"
                        style={{ color: `hsl(var(--${member.color}))` }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
