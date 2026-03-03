import { useSubscription } from "@/hooks/useSubscription";
import { Clock, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v3/9Mi4R0FainnLnX9wzmRn";

const TrialBanner = () => {
  const { status, daysLeft } = useSubscription();

  if (status === "paid" || status === "loading") return null;
  if (status === "expired") return null;

  const isUrgent = daysLeft <= 1;
  const progressPercent = ((7 - daysLeft) / 7) * 100;

  return (
    <div
      className={`rounded-2xl px-5 py-4 mb-6 space-y-3 ${
        isUrgent
          ? "bg-destructive/10 border border-destructive/30"
          : "bg-gold/5 border border-gold/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isUrgent ? (
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
          ) : (
            <Clock className="w-5 h-5 text-gold shrink-0" />
          )}
          <p className={`font-semibold text-sm ${isUrgent ? "text-destructive" : "text-gold"}`}>
            {isUrgent
              ? "⚠️ Seu acesso expira amanhã!"
              : `Seu teste termina em ${daysLeft} dia${daysLeft > 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isUrgent ? "bg-destructive" : "bg-gold"
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <Button
        variant="hero"
        size="sm"
        className="w-full"
        onClick={() => window.open(CHECKOUT_URL, "_blank")}
      >
        <Sparkles className="w-4 h-4" />
        Assinar por R$14,95/mês (cupom OFF50)
      </Button>
    </div>
  );
};

export default TrialBanner;
