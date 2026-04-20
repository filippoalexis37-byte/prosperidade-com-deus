import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import PillarsSection from "@/components/PillarsSection";
import VerseBreak from "@/components/VerseBreak";
import JourneySection from "@/components/JourneySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import OfferSection from "@/components/OfferSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import VerseOfDaySection from "@/components/VerseOfDaySection";
import AppDemoSection from "@/components/AppDemoSection";
import ModulesSection from "@/components/ModulesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-gold/30">
      <Navbar />
      <ParticleBackground />
      <ExitIntentPopup />
      
      <HeroSection />
      
      <PillarsSection />
      
      <VerseBreak 
        quote="Porque <strong>eu sei os planos que tenho para vocês</strong>, diz o SENHOR, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês <strong>esperança e um futuro</strong>."
        reference="Jeremias 29:11"
      />
      
      <JourneySection />

      {/* Adding these from previous version as they add value and match the theme */}
      <AppDemoSection />
      <ModulesSection />
      <VerseOfDaySection />
      
      <VerseBreak 
        quote="Buscai primeiro o <strong>Reino de Deus</strong> e a sua justiça, e todas essas coisas vos serão <strong>acrescentadas</strong>."
        reference="Mateus 6:33"
      />
      
      <TestimonialsSection />
      
      <OfferSection />
      
      <FAQSection />
      
      <FinalCTA />
      
      <Footer />
    </div>
  );
};

export default Index;
