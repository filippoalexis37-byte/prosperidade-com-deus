import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Check, Flame, ArrowRight } from "lucide-react";

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
    <section className="py-20 px-6 bg-gradient-dark relative overflow-hidden" id="oferta">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-destructive/20 text-destructive border border-destructive/30 rounded-full px-4 py-1.5 text-sm font-semibold animate-pulse">
            <Flame className="w-4 h-4" />
            Oferta Especial — Vagas Limitadas
          </span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
          Comece sua jornada <span className="text-gradient-gold">espiritual hoje</span>
        </h2>
        <p className="text-muted-foreground text-center text-lg mb-10 max-w-lg mx-auto">
          Milhares de pessoas já estão transformando sua vida espiritual. Não fique de fora!
        </p>

        <div className="bg-card border border-gold/20 rounded-3xl p-8 md:p-10 text-center glow-gold relative">
          {/* Popular badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-gradient-gold text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Mais Popular
            </span>
          </div>

          {/* Timer */}
          <p className="text-muted-foreground text-sm mb-3 mt-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Esta oferta expira em:
          </p>
          <div className="flex justify-center gap-3 mb-8">
            {[
              { value: pad(timeLeft.hours), label: "Horas" },
              { value: pad(timeLeft.minutes), label: "Min" },
              { value: pad(timeLeft.seconds), label: "Seg" },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-secondary border border-border rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <span className="font-serif text-2xl md:text-3xl font-bold text-gold">
                    {t.value}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs mt-1.5">{t.label}</span>
              </div>
            ))}
          </div>

          {/* Free trial */}
          <div className="bg-gold/10 border border-gold/20 rounded-xl py-3 px-6 mb-6 inline-block">
            <span className="text-gold font-semibold text-lg">🎁 7 dias grátis para você experimentar</span>
          </div>

          {/* Pricing */}
          <p className="text-muted-foreground text-sm mb-1">Depois do teste gratuito</p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="font-serif text-5xl md:text-6xl font-bold text-gradient-gold">
              R$ 14,90<span className="text-lg font-normal text-muted-foreground">/mês</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-8">
            Menos de R$ 0,50 por dia para fortalecer sua fé ✨
          </p>

          {/* CTA */}
          <a href="/auth">
            <Button variant="hero" size="lg" className="text-lg px-12 py-7 w-full sm:w-auto group">
              Começar meus 7 dias grátis
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>

          {/* Trust */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-muted-foreground text-xs">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> Acesso imediato</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> Pagamento seguro</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> Cancele quando quiser</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
