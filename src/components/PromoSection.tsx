import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Tag, Check, Copy } from "lucide-react";

const PROMO_END = new Date();
PROMO_END.setHours(PROMO_END.getHours() + 23, 59, 59);

const PromoSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText("OFF50");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="py-20 px-6 bg-gradient-dark relative overflow-hidden" id="oferta">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-destructive/20 text-destructive border border-destructive/30 rounded-full px-4 py-1.5 text-sm font-semibold animate-pulse">
            <Clock className="w-4 h-4" />
            Por Tempo Limitado
          </span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
          Comece sua jornada <span className="text-gradient-gold">espiritual hoje</span>
        </h2>
        <p className="text-muted-foreground text-center text-lg mb-10 max-w-lg mx-auto">
          Aproveite o preço promocional antes que o tempo acabe!
        </p>

        <div className="bg-card border border-gold/20 rounded-3xl p-8 md:p-10 text-center glow-gold">
          {/* Timer */}
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

          {/* Free trial highlight */}
          <div className="bg-gold/10 border border-gold/20 rounded-xl py-3 px-6 mb-6 inline-block">
            <span className="text-gold font-semibold text-lg">7 dias grátis</span>
          </div>

          {/* Pricing */}
          <p className="text-muted-foreground text-sm mb-1">Depois do teste</p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-muted-foreground line-through text-xl">R$ 29,90/mês</span>
            <span className="font-serif text-5xl md:text-6xl font-bold text-gradient-gold">
              R$ 14,95<span className="text-lg font-normal text-muted-foreground">/mês</span>
            </span>
          </div>
          <div className="mb-6" />

          {/* Coupon */}
          <div className="bg-secondary/60 border border-dashed border-gold/30 rounded-xl p-4 mb-8 max-w-xs mx-auto">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Cupom de Desconto
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl font-bold text-gold tracking-widest">OFF50</span>
              <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Copiar cupom"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* CTA */}
          <a href="/auth">
            <Button variant="hero" size="lg" className="text-lg px-12 py-7 w-full sm:w-auto">
              Começar teste grátis
            </Button>
          </a>

          {/* Trust */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-muted-foreground text-xs">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> Acesso imediato</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> Pagamento seguro</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> Cancelamento fácil</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
