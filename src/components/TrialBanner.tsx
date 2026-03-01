import { useSubscription } from "@/hooks/useSubscription";
import { Clock, AlertTriangle } from "lucide-react";

const TrialBanner = () => {
  const { status, daysLeft } = useSubscription();

  if (status === "paid" || status === "loading") return null;

  if (status === "expired") return null; // Handled by UpgradeGate

  const isUrgent = daysLeft <= 1;

  return (
    <div
      className={`rounded-xl px-4 py-3 mb-6 flex items-center gap-3 text-sm ${
        isUrgent
          ? "bg-destructive/10 border border-destructive/30 text-destructive"
          : "bg-gold/10 border border-gold/20 text-gold"
      }`}
    >
      {isUrgent ? (
        <AlertTriangle className="w-5 h-5 shrink-0" />
      ) : (
        <Clock className="w-5 h-5 shrink-0" />
      )}
      <p className="font-medium">
        {isUrgent
          ? "Seu teste termina amanhã. Garanta acesso contínuo."
          : `Seu teste gratuito termina em ${daysLeft} dia${daysLeft > 1 ? "s" : ""}.`}
      </p>
    </div>
  );
};

export default TrialBanner;
