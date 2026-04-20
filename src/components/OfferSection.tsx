import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const OfferSection = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });
  const [couponText, setCouponText] = useState('Clique para copiar');

  useEffect(() => {
    const end = Date.now() + 23 * 3600 * 1000 + 59 * 60 * 1000;
    
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };

    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCoupon = () => {
    navigator.clipboard.writeText('OFF50').then(() => {
      setCouponText('✓ Copiado!');
      setTimeout(() => setCouponText('Clique para copiar'), 2500);
    });
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="oferta" className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-[linear-gradient(145deg,#1a1208,#0f0b05,#1a1208)] border border-gold/30 rounded-[2.5rem] p-10 md:p-20 text-center overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          {/* Background glow */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-block bg-gradient-gold text-primary-foreground rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              ✦ Oferta por Tempo Limitado ✦
            </div>

            <h2 className="font-serif text-4xl md:text-6xl font-bold text-cream mb-4">
              Prosperidade com Deus
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Acesse agora o programa completo de transformação espiritual, emocional e financeira.
            </p>

            <div className="flex justify-center gap-4 md:gap-6 mb-12">
              {[
                { label: 'Horas', val: pad(timeLeft.h) },
                { label: 'Min', val: pad(timeLeft.m) },
                { label: 'Seg', val: pad(timeLeft.s) },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center font-serif text-3xl md:text-4xl font-bold text-gold">
                      {item.val}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">
                      {item.label}
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="font-serif text-4xl text-gold/40 self-center -mt-6">:</div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mb-12">
              <div className="text-lg text-white/30 line-through mb-1">De R$ 97,00</div>
              <div className="font-serif text-6xl md:text-8xl font-bold bg-gradient-gold bg-clip-text text-transparent leading-none">
                R$ 29,90
              </div>
              <div className="text-sm text-muted-foreground mt-4 font-medium">
                ou 12x de R$ 2,99 • Acesso imediato e vitalício
              </div>
            </div>

            <button
              onClick={copyCoupon}
              className="group inline-flex items-center gap-4 bg-gold/5 border border-dashed border-gold/40 rounded-2xl px-6 py-4 mb-12 hover:bg-gold/10 transition-colors"
            >
              <div className="text-left">
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Cupom Extra</div>
                <div className="text-xl font-black text-gold tracking-[0.2em]">OFF50</div>
              </div>
              <div className={`text-[10px] uppercase font-bold tracking-widest ${couponText.includes('✓') ? 'text-gold' : 'text-gold/40'}`}>
                {couponText}
              </div>
            </button>

            <a href="/auth" className="block">
              <Button className="w-full h-20 rounded-full bg-gradient-gold text-primary-foreground text-xl font-black shadow-[0_0_50px_rgba(201,169,110,0.5)] hover:scale-[1.02] transition-transform animate-pulse-subtle">
                ✦ Quero Transformar Minha Vida Agora
              </Button>
            </a>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10">
              {[
                { icon: '🔒', label: 'Pagamento seguro' },
                { icon: '⚡', label: 'Acesso imediato' },
                { icon: '🛡', label: 'Garantia de 7 dias' },
                { icon: '✝', label: 'Conteúdo bíblico' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                  <span className="text-gold text-lg">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
