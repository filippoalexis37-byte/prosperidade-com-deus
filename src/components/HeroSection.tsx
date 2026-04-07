import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowDown, Users, Star, Shield } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [count, setCount] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Pessoa no topo da montanha ao nascer do sol"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Social proof badge */}
        <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-gold/20 rounded-full px-5 py-2 mb-8 animate-fade-in">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-gold flex items-center justify-center text-[10px] font-bold text-primary-foreground">M</div>
            <div className="w-6 h-6 rounded-full bg-gold-dark flex items-center justify-center text-[10px] font-bold text-primary-foreground">J</div>
            <div className="w-6 h-6 rounded-full bg-gold-light flex items-center justify-center text-[10px] font-bold text-primary-foreground">A</div>
          </div>
          <span className="text-muted-foreground text-sm">
            <strong className="text-gold">{count.toLocaleString("pt-BR")}+</strong> pessoas já começaram sua jornada
          </span>
        </div>

        <p className="text-gold-light font-sans text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in">
          Aplicativo Cristão de Devocionais
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
          <span className="text-foreground">O aplicativo cristão para</span>
          <br />
          <span className="text-gradient-gold">fortalecer sua fé</span>
          <span className="text-foreground"> todos os dias</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Devocionais diários, versículo do dia e planos espirituais para
          ansiedade, medo, propósito e crescimento com Deus.
        </p>

        <div className="flex flex-col items-center gap-4">
          <a href="/auth">
            <Button variant="hero" size="lg" className="text-lg px-10 py-7 animate-pulse-subtle">
              Começar 7 dias grátis
            </Button>
          </a>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground text-sm mt-2">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-gold" /> Sem cobrança hoje
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-gold" /> Avaliação 4.9/5
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gold" /> Cancele quando quiser
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-gold" />
      </div>
    </section>
  );
};

export default HeroSection;
