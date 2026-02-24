import HeroSection from "@/components/HeroSection";
import ModulesSection from "@/components/ModulesSection";
import AppDemoSection from "@/components/AppDemoSection";
import PromoSection from "@/components/PromoSection";
import PlanSection from "@/components/PlanSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ExitIntentPopup />
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
