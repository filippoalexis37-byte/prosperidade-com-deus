import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="relative py-32 px-6 bg-[linear-gradient(180deg,#0a0705,#100c06,#0a0705)] text-center overflow-hidden">
      {/* Warm cinematic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(240,200,120,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[500px] text-gold/[0.02] leading-none pointer-events-none select-none">
        ✝
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-6">
          ✦ Sua jornada começa agora ✦
        </p>
        <h2 className="font-serif text-4xl md:text-7xl text-cream font-light mb-8 leading-tight">
          Talvez essa seja a <strong className="font-bold bg-gradient-gold bg-clip-text text-transparent">direção</strong><br />
          que você estava procurando.
        </h2>
        <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Dê o primeiro passo hoje. Fortaleça sua fé, encontre paz e caminhe com Deus todos os dias.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/auth">
            <Button size="lg" className="h-16 px-12 rounded-full bg-gradient-gold text-primary-foreground font-bold text-xl shadow-[0_0_60px_rgba(240,208,128,0.55)] hover:scale-105 hover:shadow-[0_0_80px_rgba(240,208,128,0.8)] transition-all duration-500">
              ✦ Quero Começar Agora
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="outline" size="lg" className="h-16 px-10 rounded-full border-gold/40 text-gold hover:bg-gold/10 hover:border-gold text-lg backdrop-blur-sm transition-all duration-500">
              Fortalecer Minha Fé
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-gold/60 text-[10px] uppercase font-bold tracking-widest">
          🛡️ 7 Dias Grátis • Cancele quando quiser
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
