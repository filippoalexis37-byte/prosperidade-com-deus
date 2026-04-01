import { useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Sparkles, Tag, Check, BookOpen, Headphones, Flame, DollarSign } from "lucide-react";

interface UpgradeGateProps {
  children: React.ReactNode;
}

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v3/9Mi4R0FainnLnX9wzmRn";

const UpgradeGate = ({ children }: UpgradeGateProps) => {
  const { status } = useSubscription();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gold animate-pulse font-serif text-xl">Carregando...</p>
      </div>
    );
  }

  if (status === "expired") {
    const applyCoupon = () => {
      if (coupon.trim().toUpperCase() === "OFF50") {
        setCouponApplied(true);
      }
    };

    const features = [
      { icon: BookOpen, text: "Todos os devocionais diários" },
      { icon: Headphones, text: "Áudios e meditações guiadas" },
      { icon: Flame, text: "Desafio 30 dias completo" },
      { icon: DollarSign, text: "Área de finanças e prosperidade" },
    ];

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6">
        <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
          <Lock className="w-10 h-10 text-gold" />
        </div>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
          Continue sua transformação espiritual
        </h2>

        <p className="text-muted-foreground max-w-md leading-relaxed">
          Acesso completo a todos os devocionais, áudios, desafios e área de finanças.
        </p>

        {/* Pricing */}
        <div className="space-y-1">
          <p className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold">
            R$ 14,90<span className="text-lg font-normal text-muted-foreground">/mês</span>
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md w-full text-left">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <f.icon className="w-4 h-4 text-gold shrink-0" />
              {f.text}
            </div>
          ))}
        </div>

        <Button
          variant="hero"
          size="lg"
          className="text-lg px-8 py-6 w-full max-w-xs"
          onClick={() => window.open(CHECKOUT_URL, "_blank")}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Assinar Agora
        </Button>

        <p className="text-xs text-muted-foreground">
          Acesso imediato após a confirmação do pagamento
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default UpgradeGate;
