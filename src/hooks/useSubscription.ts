import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export type SubscriptionStatus = "loading" | "trial" | "expired" | "paid";

interface SubscriptionInfo {
  status: SubscriptionStatus;
  daysLeft: number;
  trialStartedAt: Date | null;
  isPremium: boolean;
}

export const useSubscription = (): SubscriptionInfo => {
  const { user } = useAuth();
  const [status, setStatus] = useState<SubscriptionStatus>("loading");
  const [trialStartedAt, setTrialStartedAt] = useState<Date | null>(null);
  const [daysLeft, setDaysLeft] = useState(7);

  useEffect(() => {
    if (!user) {
      setStatus("loading");
      return;
    }

    const fetchStatus = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("trial_started_at, has_paid")
        .eq("user_id", user.id)
        .single();

      if (!data) return;

      if (data.has_paid) {
        setStatus("paid");
        setDaysLeft(0);
        return;
      }

      const started = new Date(data.trial_started_at);
      setTrialStartedAt(started);
      const now = new Date();
      const msLeft = started.getTime() + 7 * 24 * 60 * 60 * 1000 - now.getTime();
      const days = Math.ceil(msLeft / (24 * 60 * 60 * 1000));

      if (msLeft <= 0) {
        setStatus("expired");
        setDaysLeft(0);
      } else {
        setStatus("trial");
        setDaysLeft(Math.max(0, days));
      }
    };

    fetchStatus();
  }, [user]);

  return {
    status,
    daysLeft,
    trialStartedAt,
    isPremium: status === "trial" || status === "paid",
  };
};
