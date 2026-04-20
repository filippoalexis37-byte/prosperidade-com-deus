import React from 'react';
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="relative py-32 px-6 bg-[linear-gradient(180deg,#0a0705,#100c06,#0a0705)] text-center overflow-hidden">
      {/* Background icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[500px] text-gold/[0.02] leading-none pointer-events-none select-none">
        ✝
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-6">
          Sua jornada começa agora
        </p>
        <h2 className="font-serif text-4xl md:text-7xl text-cream font-light mb-8 leading-tight">
          A verdadeira prosperidade<br />
          começa na <strong className="text-gold font-bold">presença de Deus</strong>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Quando você coloca Deus no centro, você não repete erros, 
          não vive carente e não negocia seus valores.
        </p>
        
        <a href="#oferta">
          <Button size="lg" className="h-16 px-12 rounded-full bg-gradient-gold text-primary-foreground font-bold text-xl shadow-[0_0_50px_rgba(201,169,110,0.5)] hover:scale-105 transition-transform">
            ✦ Começar Minha Transformação
          </Button>
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
