import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
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
        <p className="text-gold-light font-sans text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in">
          Transforme sua vida espiritual, emocional e financeira
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
          <span className="text-gradient-gold">Prosperidade</span>
          <br />
          <span className="text-foreground">com Deus</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Como colocar Deus no centro da sua vida, restaurar sua identidade e
          não repetir os erros que atrasam sua prosperidade.
        </p>
        <div className="flex flex-col items-center gap-4">
          <a href="/auth">
            <Button variant="hero" size="lg" className="text-lg px-10 py-6">
              Começar 7 Dias Grátis
            </Button>
          </a>
          <p className="text-muted-foreground text-sm">
            Teste gratuito por 7 dias · Sem compromisso · Cancele quando quiser
          </p>
          <p className="text-muted-foreground/60 text-xs">
            Após o teste: R$ 29,90/mês · <span className="text-gold">Cupom OFF50 = R$ 14,95/mês</span>
          </p>
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
