import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
      {/* Radial glow behind hero text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Cross SVG */}
      <div className="mb-6 opacity-0 animate-[fadeUp_1s_0.2s_forwards]">
        <svg className="w-16 h-16 mx-auto" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="4" x2="30" y2="56" stroke="url(#cg)" strokeWidth="3" strokeLinecap="round"/>
          <line x1="8" y1="20" x2="52" y2="20" stroke="url(#cg)" strokeWidth="3" strokeLinecap="round"/>
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F0D080"/>
              <stop offset="100%" stopColor="#8B6914"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-6 py-2 text-[10px] md:text-xs font-bold text-gold uppercase tracking-[0.2em] mb-8 opacity-0 animate-[fadeUp_1s_0.3s_forwards]">
        <span>✦ Como se conectar com Deus através da fé ✦</span>
      </div>

      <h1 className="font-serif text-5xl md:text-8xl font-light text-cream leading-[1.1] mb-4 opacity-0 animate-[fadeUp_1s_0.5s_forwards]">
        A fé que <em className="italic text-gold font-normal">transforma</em><br />
        <strong className="block font-bold bg-gradient-gold bg-clip-text text-transparent">tudo em você</strong>
      </h1>

      <div className="opacity-0 animate-[fadeUp_1s_0.7s_forwards]">
        <p className="font-serif text-lg md:text-2xl italic text-cream/70 max-w-xl mx-auto mb-2 leading-relaxed">
          "Aproximai-vos de Deus e ele se aproximará de vós."
        </p>
        <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase mb-8">
          Tiago 4:8
        </p>
      </div>

      <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10 opacity-0 animate-[fadeUp_1s_0.9s_forwards]">
        Descubra como fortalecer sua conexão com Deus todos os dias, curar sua identidade, 
        restaurar suas emoções e viver a prosperidade que Ele preparou para você.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fadeUp_1s_1.1s_forwards]">
        <a href="#oferta">
          <Button size="lg" className="h-16 px-10 rounded-full bg-gradient-gold text-primary-foreground font-bold text-lg shadow-[0_0_40px_rgba(201,169,110,0.4)] hover:scale-105 transition-transform">
            ✦ Quero me Conectar com Deus
          </Button>
        </a>
        <a href="#pilares">
          <Button variant="outline" size="lg" className="h-16 px-10 rounded-full border-gold/40 text-gold hover:bg-gold/10 text-lg transition-all">
            Saiba Mais
          </Button>
        </a>
      </div>

      <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-16 opacity-0 animate-[fadeUp_1s_1.3s_forwards]">
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

      {/* Scroll hint */}
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
