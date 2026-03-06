import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-6">
          Comece Agora
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
          Comece hoje sua{" "}
          <span className="text-gradient-gold">transformação espiritual</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Reserve apenas alguns minutos por dia para fortalecer sua fé e
          caminhar com Deus.
        </p>

        <a href="/auth">
          <Button variant="hero" size="lg" className="text-lg px-12 py-7">
            Começar teste grátis
          </Button>
        </a>

        <div className="flex flex-wrap justify-center gap-4 mt-6 text-muted-foreground text-xs">
          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> Acesso imediato</span>
          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> Pagamento seguro</span>
          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> Cancele quando quiser</span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
