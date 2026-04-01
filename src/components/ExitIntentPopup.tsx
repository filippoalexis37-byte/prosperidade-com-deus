import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Heart } from "lucide-react";

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
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) triggerPopup();
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    const timer = setTimeout(() => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled < 0.6) triggerPopup();
    }, 15000);

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
          <Heart className="w-8 h-8 text-gold" />
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
          Espera! Não vá <span className="text-gradient-gold">ainda</span>
        </h3>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          Deus tem algo especial preparado para você. Comece hoje sua jornada espiritual com <strong className="text-gold">7 dias grátis</strong> e descubra como fortalecer sua fé todos os dias.
        </p>

        <a href="/auth">
          <Button variant="hero" size="lg" className="text-lg px-10 py-6 w-full">
            Começar meu teste grátis
          </Button>
        </a>

        <p className="text-muted-foreground text-xs mt-3">
          Sem cobrança hoje • Cancele quando quiser
        </p>

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
