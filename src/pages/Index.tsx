import HeroSection from "@/components/HeroSection";
import ModulesSection from "@/components/ModulesSection";
import AppDemoSection from "@/components/AppDemoSection";
import PromoSection from "@/components/PromoSection";
import PlanSection from "@/components/PlanSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ModulesSection />
      <AppDemoSection />
      <PromoSection />
      <PlanSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
