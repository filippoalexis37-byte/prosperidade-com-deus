import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { BookOpen, Award, Heart, Compass, Flame, CalendarDays, Lock, CheckCircle2, Sparkles } from "lucide-react";
import TrialBanner from "@/components/TrialBanner";
import { useStreak } from "@/hooks/useStreak";
import { useSubscription } from "@/hooks/useSubscription";

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v3/9Mi4R0FainnLnX9wzmRn";

interface DailyDevotional {
  title: string;
  content: string;
  verse: string;
  verse_reference: string;
  comfort_word: string;
  apostle: string;
}

const Dashboard = () => {
  const { user, profile, isApproved } = useAuth();
  const navigate = useNavigate();
  const { currentStreak } = useStreak();
  const { status, daysLeft } = useSubscription();
  const [devotional, setDevotional] = useState<DailyDevotional | null>(null);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [medals, setMedals] = useState<{ name: string; icon: string; earned_at: string }[]>([]);
  const [loadingDevotional, setLoadingDevotional] = useState(true);

  useEffect(() => {
    if (!isApproved) return;

    const fetchData = async () => {
      const today = new Date().toISOString().split("T")[0];

      const [devRes, progRes, medRes] = await Promise.all([
        supabase.from("daily_devotionals").select("*").eq("devotional_date", today).single(),
        supabase.from("user_progress").select("week_number, completed").eq("user_id", user!.id),
        supabase.from("user_medals").select("earned_at, medal_id, medals(name, icon)").eq("user_id", user!.id),
      ]);

      if (devRes.data) {
        setDevotional(devRes.data);
      } else {
        try {
          const { data, error } = await supabase.functions.invoke("generate-devotional");
          if (data && !error) setDevotional(data);
        } catch (e) {
          console.error("Failed to generate devotional:", e);
        }
      }
      setLoadingDevotional(false);

      if (progRes.data) {
        const map: Record<number, boolean> = {};
        progRes.data.forEach((p) => (map[p.week_number] = p.completed));
        setProgress(map);
      }

      if (medRes.data) {
        setMedals(medRes.data.map((m: any) => ({
          name: m.medals?.name || "",
          icon: m.medals?.icon || "🏅",
          earned_at: m.earned_at,
        })));
      }
    };

    fetchData();
  }, [isApproved, user]);

  if (!isApproved) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="text-6xl mb-6">⏳</div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Aguardando Aprovação</h2>
          <p className="text-muted-foreground max-w-md">
            Seu cadastro foi recebido com sucesso! O administrador precisa aprovar seu acesso. Você receberá uma notificação em breve.
          </p>
        </div>
      </AppLayout>
    );
  }

  const completedWeeks = Object.values(progress).filter(Boolean).length;
  const progressPercent = (completedWeeks / 4) * 100;

  // Determine next action
  const getNextWeek = () => {
    for (let i = 1; i <= 4; i++) {
      if (!progress[i]) return i;
    }
    return null;
  };
  const nextWeek = getNextWeek();

  // Calculate challenge day based on trial_started_at
  const challengeDay = profile?.trial_started_at
    ? Math.min(30, Math.max(1, Math.ceil((Date.now() - new Date(profile.trial_started_at).getTime()) / (24 * 60 * 60 * 1000))))
    : 1;

  const getProgressMessage = () => {
    if (progressPercent === 0) return "Você está no início da sua transformação.";
    if (progressPercent < 50) return "Você está avançando! Continue firme. 💪";
    if (progressPercent < 100) return "Você está quase completando seu ciclo! 🔥";
    return "Parabéns! Você completou a transformação! 🏆";
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Olá, <span className="text-gradient-gold">{profile?.full_name || "Irmão(ã)"}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Que Deus abençoe seu dia de estudo!</p>
        </div>

        {/* ===== BLOCO 1: Streak + Dia + Trial ===== */}
        <div className="grid grid-cols-3 gap-3">
          {/* Streak */}
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center justify-center py-4 px-2">
              <Flame className={`w-6 h-6 mb-1 ${currentStreak > 0 ? "text-orange-400" : "text-muted-foreground"}`} />
              <span className="font-serif text-xl font-bold text-foreground">
                {currentStreak}
              </span>
              <span className="text-[10px] text-muted-foreground text-center leading-tight">
                {currentStreak > 0 ? `dia${currentStreak > 1 ? "s" : ""} seguido${currentStreak > 1 ? "s" : ""}` : "Comece hoje!"}
              </span>
            </CardContent>
          </Card>

          {/* Dia do desafio */}
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center justify-center py-4 px-2">
              <CalendarDays className="w-6 h-6 text-gold mb-1" />
              <span className="font-serif text-xl font-bold text-foreground">{challengeDay}/30</span>
              <span className="text-[10px] text-muted-foreground text-center leading-tight">dia do desafio</span>
            </CardContent>
          </Card>

          {/* Dias restantes trial */}
          <Card className={`border ${status === "trial" ? "bg-gold/5 border-gold/20" : "bg-card border-border"}`}>
            <CardContent className="flex flex-col items-center justify-center py-4 px-2">
              <Sparkles className={`w-6 h-6 mb-1 ${status === "paid" ? "text-green-400" : "text-gold"}`} />
              <span className="font-serif text-xl font-bold text-foreground">
                {status === "paid" ? "∞" : daysLeft}
              </span>
              <span className="text-[10px] text-muted-foreground text-center leading-tight">
                {status === "paid" ? "acesso total" : `dia${daysLeft > 1 ? "s" : ""} de teste`}
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Streak = 0 motivational */}
        {currentStreak === 0 && (
          <div className="text-center py-2">
            <p className="text-sm text-muted-foreground italic">✨ Comece hoje sua sequência espiritual.</p>
          </div>
        )}

        {/* Trial banner with upgrade CTA */}
        <TrialBanner />

        {/* ===== BLOCO 2: CTA PRINCIPAL ===== */}
        <Button
          variant="hero"
          size="lg"
          className="w-full py-6 text-base"
          onClick={() => navigate(nextWeek ? "/modulos" : "/devocional")}
        >
          {completedWeeks === 0
            ? "📖 Começar Hoje"
            : nextWeek
            ? `🔥 Continuar Dia ${challengeDay}`
            : "🙏 Ver Devocional"}
        </Button>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: BookOpen, label: "Bíblia", path: "/biblia", color: "text-gold" },
            { icon: Heart, label: "Devocional", path: "/devocional", color: "text-red-400" },
            { icon: Compass, label: "Módulos", path: "/modulos", color: "text-blue-400" },
            { icon: Award, label: "Medalhas", path: "/medalhas", color: "text-gold" },
          ].map((item) => (
            <Card
              key={item.path}
              className="cursor-pointer hover:border-gold/30 transition-all bg-card border-border"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="flex flex-col items-center justify-center py-4">
                <item.icon className={`w-6 h-6 ${item.color} mb-1`} />
                <span className="text-[11px] font-medium text-foreground">{item.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===== BLOCO 4: GAMIFICAÇÃO 30 DIAS ===== */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-serif text-lg">30 Dias de Transformação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{completedWeeks} de 4 semanas</span>
                <span className="font-bold text-gold">{progressPercent.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-gold transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Week indicators */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((week) => {
                const completed = progress[week];
                const unlocked = week === 1 || progress[week - 1];
                return (
                  <div
                    key={week}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                      completed
                        ? "bg-gold/10 border-gold/30"
                        : unlocked
                        ? "bg-card border-border"
                        : "bg-secondary/30 border-border opacity-50"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    ) : unlocked ? (
                      <span className="text-lg font-bold text-gold">{week}</span>
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="text-[10px] text-muted-foreground">Sem {week}</span>
                  </div>
                );
              })}
            </div>

            {/* Dynamic message */}
            <p className="text-sm text-center text-muted-foreground italic">
              {getProgressMessage()}
            </p>
          </CardContent>
        </Card>

        {/* Daily Devotional */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              Palavra do Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDevotional ? (
              <p className="text-muted-foreground animate-pulse">Carregando devocional...</p>
            ) : devotional ? (
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-foreground">{devotional.title}</h3>
                {devotional.apostle && (
                  <Badge variant="outline" className="text-gold border-gold/30">{devotional.apostle}</Badge>
                )}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{devotional.content}</p>
                <blockquote className="border-l-2 border-gold/50 pl-3 italic text-foreground/80 text-sm">
                  "{devotional.verse}" — {devotional.verse_reference}
                </blockquote>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate("/devocional")}
                >
                  Ler devocional completo
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhum devocional disponível hoje.</p>
            )}
          </CardContent>
        </Card>

        {/* Medals */}
        {medals.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                Suas Medalhas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                {medals.map((m, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-3xl">{m.icon}</span>
                    <span className="text-xs text-muted-foreground">{m.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
