import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 12847;
    const duration = 2000;
    const step = target / (duration / 16);
    let start = 0;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden z-10">
      {/* Cinematic warm light layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(240,200,120,0.18)_0%,rgba(201,169,110,0.08)_35%,transparent_70%)] blur-2xl" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,180,90,0.10)_0%,transparent_70%)] blur-3xl animate-pulse-subtle" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(120,90,200,0.10)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(10,7,5,0.6)_100%)]" />
      </div>

      {/* Cross SVG */}
      <div className="mb-6 opacity-0 animate-[fadeUp_1s_0.2s_forwards] relative">
        <svg className="w-16 h-16 mx-auto drop-shadow-[0_0_20px_rgba(240,208,128,0.5)]" viewBox="0 0 60 60" fill="none">
          <line x1="30" y1="4" x2="30" y2="56" stroke="url(#cg)" strokeWidth="3" strokeLinecap="round"/>
          <line x1="8" y1="20" x2="52" y2="20" stroke="url(#cg)" strokeWidth="3" strokeLinecap="round"/>
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="60" y2="60">
              <stop offset="0%" stopColor="#F0D080"/>
              <stop offset="100%" stopColor="#8B6914"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-6 py-2 text-[10px] md:text-xs font-bold text-gold uppercase tracking-[0.2em] mb-8 opacity-0 animate-[fadeUp_1s_0.3s_forwards] backdrop-blur-sm">
        <span>✦ Encontre direção todos os dias ✦</span>
      </div>

      <h1 className="font-serif text-5xl md:text-7xl font-light text-cream leading-[1.1] mb-6 opacity-0 animate-[fadeUp_1s_0.5s_forwards] max-w-4xl">
        Cansado de se sentir <em className="italic text-cream/80">perdido?</em><br />
        <strong className="block mt-2 font-bold bg-gradient-gold bg-clip-text text-transparent">
          Deus pode te dar direção<br />todos os dias.
        </strong>
      </h1>

      <p className="text-base md:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed mb-10 opacity-0 animate-[fadeUp_1s_0.9s_forwards]">
        Fortaleça sua fé, acalme sua mente e encontre direção mesmo nos dias difíceis.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fadeUp_1s_1.1s_forwards]">
        <Link to="/auth">
          <Button size="lg" className="h-16 px-10 rounded-full bg-gradient-gold text-primary-foreground font-bold text-lg shadow-[0_0_50px_rgba(240,208,128,0.45)] hover:scale-105 hover:shadow-[0_0_70px_rgba(240,208,128,0.7)] transition-all duration-500">
            ✦ Quero Fortalecer Minha Fé
          </Button>
        </Link>
        <Link to="/auth">
          <Button variant="outline" size="lg" className="h-16 px-10 rounded-full border-gold/40 text-gold hover:bg-gold/10 hover:border-gold text-lg backdrop-blur-sm transition-all duration-500">
            Começar Minha Jornada
          </Button>
        </Link>
      </div>

      <p className="mt-6 text-gold/70 text-[11px] uppercase font-bold tracking-[0.3em] opacity-0 animate-[fadeUp_1s_1.3s_forwards]">
        🎁 7 Dias Grátis • Sem Compromisso
      </p>

      <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-16 opacity-0 animate-[fadeUp_1s_1.5s_forwards]">
        <div className="text-center">
          <div className="font-serif text-3xl md:text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent leading-none">
            {count.toLocaleString("pt-BR")}+
          </div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">Vidas Transformadas</div>
        </div>
        <div className="text-center">
          <div className="font-serif text-3xl md:text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent leading-none">365</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">Devocionais Diários</div>
        </div>
        <div className="text-center">
          <div className="font-serif text-3xl md:text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent leading-none">7</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">Dias de Garantia</div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeUp_1s_1.8s_forwards]">
        <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Role para baixo</span>
        <div className="w-6 h-10 border-2 border-gold/30 rounded-full relative">
          <div className="w-1 h-2 bg-gold rounded-full absolute left-1/2 top-2 -translate-x-1/2 animate-[scrollAnim_2s_infinite]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
