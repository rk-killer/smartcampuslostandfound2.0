import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { RecentPostsSection } from "@/components/RecentPostsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <RecentPostsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
