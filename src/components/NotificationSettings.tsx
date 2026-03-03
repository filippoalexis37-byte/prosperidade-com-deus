import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Check } from "lucide-react";

const timeOptions = [
  { label: "7h", value: "07:00" },
  { label: "12h", value: "12:00" },
  { label: "20h", value: "20:00" },
];

const NotificationSettings = () => {
  const { user } = useAuth();
  const [enabled, setEnabled] = useState(false);
  const [selectedTime, setSelectedTime] = useState("07:00");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [permissionState, setPermissionState] = useState<NotificationPermission>("default");

  useEffect(() => {
    if ("Notification" in window) {
      setPermissionState(Notification.permission);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("notification_preferences")
        .select("enabled, preferred_time")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setEnabled(data.enabled);
        setSelectedTime(data.preferred_time);
      }
    };
    fetch();
  }, [user]);

  const requestPermission = async () => {
    if (!("Notification" in window)) return false;
    const permission = await Notification.requestPermission();
    setPermissionState(permission);
    return permission === "granted";
  };

  const savePreferences = async (newEnabled: boolean, time: string) => {
    if (!user) return;
    setSaving(true);

    if (newEnabled && permissionState !== "granted") {
      const granted = await requestPermission();
      if (!granted) {
        setSaving(false);
        return;
      }
    }

    // Get push subscription if enabling
    let pushSub = null;
    if (newEnabled && "serviceWorker" in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await (reg as any).pushManager?.getSubscription();
        if (sub) pushSub = sub.toJSON();
      } catch (e) {
        console.log("Push subscription not available:", e);
      }
    }

    const { error } = await supabase
      .from("notification_preferences")
      .upsert({
        user_id: user.id,
        enabled: newEnabled,
        preferred_time: time,
        push_subscription: pushSub,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });

    if (!error) {
      setEnabled(newEnabled);
      setSelectedTime(time);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);

      // Show a test notification if enabling
      if (newEnabled && permissionState === "granted") {
        new Notification("Prosperidade com Deus", {
          body: "Notificações ativadas! Você receberá lembretes diários.",
          icon: "/pwa-192x192.png",
        });
      }
    }

    setSaving(false);
  };

  const toggleEnabled = () => savePreferences(!enabled, selectedTime);
  const changeTime = (time: string) => savePreferences(enabled, time);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {enabled ? (
            <Bell className="w-5 h-5 text-gold" />
          ) : (
            <BellOff className="w-5 h-5 text-muted-foreground" />
          )}
          <div>
            <p className="font-semibold text-sm text-foreground">Lembretes diários</p>
            <p className="text-xs text-muted-foreground">
              {enabled ? "Você receberá lembretes espirituais" : "Ative para não perder seu devocional"}
            </p>
          </div>
        </div>
        <Button
          variant={enabled ? "outline" : "hero"}
          size="sm"
          onClick={toggleEnabled}
          disabled={saving}
        >
          {saved ? <Check className="w-4 h-4" /> : enabled ? "Desativar" : "Ativar"}
        </Button>
      </div>

      {enabled && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Horário preferido:</p>
          <div className="flex gap-2">
            {timeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => changeTime(opt.value)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                  selectedTime === opt.value
                    ? "bg-gold/10 border-gold/30 text-gold"
                    : "bg-secondary border-border text-muted-foreground hover:border-gold/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {permissionState === "denied" && (
        <p className="text-xs text-destructive">
          Notificações bloqueadas pelo navegador. Altere nas configurações do seu dispositivo.
        </p>
      )}
    </div>
  );
};

export default NotificationSettings;
