import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Gift, Clock } from "lucide-react";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const triggerPopup = useCallback(() => {
    if (dismissed) return;
    const already = sessionStorage.getItem("exit_popup_shown");
    if (already) return;
    setShow(true);
    sessionStorage.setItem("exit_popup_shown", "1");
  }, [dismissed]);

  useEffect(() => {
    // Desktop: mouse leaves viewport (top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) triggerPopup();
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    // Mobile: show after 15s if user hasn't scrolled past 60% of page
    const timer = setTimeout(() => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled < 0.6) triggerPopup();
    }, 15000);

    // Mobile: back button / visibility change
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") triggerPopup();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearTimeout(timer);
    };
  }, [triggerPopup]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-card border border-gold/30 rounded-3xl p-8 max-w-md w-full text-center glow-gold animate-in zoom-in-95 duration-300">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-5">
          <Gift className="w-8 h-8 text-gold" />
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
          Espera! Não vá <span className="text-gradient-gold">ainda</span>
        </h3>

        <p className="text-muted-foreground mb-5 leading-relaxed">
          Temos um desconto exclusivo de <strong className="text-gold">50% OFF</strong> esperando por você. Use o cupom abaixo e transforme sua vida financeira e espiritual!
        </p>

        <div className="bg-secondary/60 border border-dashed border-gold/30 rounded-xl p-3 mb-6">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Oferta por tempo limitado
          </p>
          <span className="font-mono text-2xl font-bold text-gold tracking-widest">OFF50</span>
          <p className="text-muted-foreground text-sm mt-1">
            De <span className="line-through">R$ 29,90</span> por apenas{" "}
            <span className="text-gold font-bold">R$ 14,90</span>
          </p>
        </div>

        <a
          href="https://www.ggcheckout.com/checkout/v3/9Mi4R0FainnLnX9wzmRn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="hero" size="lg" className="text-lg px-10 py-6 w-full">
            Garantir Meu Desconto
          </Button>
        </a>

        <button
          onClick={handleDismiss}
          className="mt-4 text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          Não, obrigado
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
