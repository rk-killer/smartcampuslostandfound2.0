import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { RecentPostsSection } from "@/components/RecentPostsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { SuccessStoriesSection } from "@/components/SuccessStoriesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <RecentPostsSection />
        <SuccessStoriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
