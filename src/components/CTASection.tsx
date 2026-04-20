import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-gold font-sans text-sm tracking-[0.4em] uppercase mb-8 font-bold">
          Comece Sua Jornada
        </p>
        <h2 className="font-serif text-4xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
          A verdadeira prosperidade <br />
          <span className="text-gradient-gold">começa na paz</span>
        </h2>
        
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Quando você coloca Deus no centro, você não repete erros, não vive carente e não negocia seus valores.
        </p>

        <div className="bg-card/30 backdrop-blur-md border border-white/5 rounded-3xl p-10 mb-12 max-w-2xl mx-auto relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-gold" />
          <p className="text-foreground text-2xl font-serif italic mb-4 leading-relaxed">
            "Buscai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas."
          </p>
          <p className="text-gold font-bold uppercase tracking-widest text-sm">— Mateus 6:33</p>
        </div>

        <a href="/auth">
          <Button variant="hero" size="lg" className="text-2xl px-16 py-10 shadow-gold animate-pulse-subtle bg-gradient-gold hover:scale-105 transition-transform group">
            Quero Transformar Minha Vida
            <ArrowRight className="w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform" />
          </Button>
        </a>

        <div className="flex flex-wrap justify-center gap-6 mt-10 text-gold-light/60 text-sm font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-gold" /> Acesso imediato</span>
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-gold" /> Pagamento seguro</span>
          <span className="flex items-center gap-2"><Check className="w-5 h-5 text-gold" /> Garantia de 7 dias</span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
