import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Check, Flame, ArrowRight, Tag } from "lucide-react";

const PROMO_END = new Date();
PROMO_END.setHours(PROMO_END.getHours() + 23, 59, 59);

const PromoSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, PROMO_END.getTime() - now.getTime());
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="py-24 px-6 bg-gradient-dark relative overflow-hidden" id="oferta">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold font-sans text-sm tracking-[0.4em] uppercase mb-4 font-bold">
            Por Tempo Limitado
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
            Oferta <span className="text-gradient-gold">Especial</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Aproveite o preço promocional antes que o tempo acabe! Esta é sua chance de investir na sua vida espiritual por um valor simbólico.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Offer Details */}
          <div className="bg-card/50 backdrop-blur-md border border-gold/20 rounded-3xl p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Tag className="w-5 h-5 text-gold" />
                <span className="text-gold font-bold uppercase tracking-wider text-sm">Cupom de Desconto</span>
              </div>
              
              <div className="bg-gold/10 border-2 border-dashed border-gold/30 rounded-2xl p-6 text-center mb-10 group hover:border-gold/60 transition-colors">
                <p className="text-gold-light text-xs font-bold uppercase tracking-widest mb-2">Use o Cupom</p>
                <h3 className="text-4xl font-serif font-black text-gold tracking-widest group-hover:scale-110 transition-transform">OFF50</h3>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Acesso imediato ao conteúdo",
                  "365 Devocionais completos",
                  "Meditações exclusivas",
                  "Garantia blindada de 7 dias",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80 font-medium">
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground text-xs font-medium">
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-gold" /> Pagamento seguro</span>
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-gold" /> Liberação na hora</span>
            </div>
          </div>

          {/* Right: Pricing and Timer */}
          <div className="bg-gradient-gold rounded-3xl p-8 md:p-10 text-primary-foreground flex flex-col justify-center text-center shadow-gold">
            <p className="text-primary-foreground/70 text-sm font-bold uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" /> Oferta termina em:
            </p>
            
            <div className="flex justify-center gap-4 mb-10">
              {[
                { value: pad(timeLeft.hours), label: "Horas" },
                { value: pad(timeLeft.minutes), label: "Min" },
                { value: pad(timeLeft.seconds), label: "Seg" },
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-white/30">
                    <span className="font-serif text-3xl md:text-4xl font-black">
                      {t.value}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase mt-2 opacity-80">{t.label}</span>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <p className="text-primary-foreground/60 text-lg line-through font-bold mb-1">R$ 29,90</p>
              <h3 className="text-6xl md:text-7xl font-serif font-black drop-shadow-md mb-2">R$ 14,90</h3>
              <p className="text-primary-foreground/80 font-medium italic">Pagamento único ou mensal (conforme plano)</p>
            </div>

            <a href="/auth">
              <Button size="lg" className="w-full bg-white text-gold hover:bg-white/90 text-xl font-bold py-8 rounded-2xl shadow-xl hover:scale-105 transition-transform group">
                Garantir Minha Vaga Agora
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </a>
            
            <p className="mt-6 text-xs font-bold opacity-70">🔒 Acesso Seguro e Imediato</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
