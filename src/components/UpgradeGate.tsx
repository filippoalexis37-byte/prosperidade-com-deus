import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";

interface UpgradeGateProps {
  children: React.ReactNode;
}

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v3/9Mi4R0FainnLnX9wzmRn";

const UpgradeGate = ({ children }: UpgradeGateProps) => {
  const { status } = useSubscription();

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gold animate-pulse font-serif text-xl">Carregando...</p>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6">
        <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
          <Lock className="w-10 h-10 text-gold" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Seu teste gratuito terminou
        </h2>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Para continuar sua jornada espiritual, desbloqueie o acesso completo a todos os devocionais, meditações e conteúdos premium.
        </p>
        <Button
          variant="hero"
          size="lg"
          className="text-lg px-8 py-6"
          onClick={() => window.open(CHECKOUT_URL, "_blank")}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Desbloquear acesso completo por R$14,90
        </Button>
        <p className="text-xs text-muted-foreground">Acesso imediato após a confirmação do pagamento</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default UpgradeGate;
