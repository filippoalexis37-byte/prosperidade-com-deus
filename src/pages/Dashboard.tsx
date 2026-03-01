import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { BookOpen, Award, Heart, Compass } from "lucide-react";
import TrialBanner from "@/components/TrialBanner";

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
  const [devotional, setDevotional] = useState<DailyDevotional | null>(null);
  const [progress, setProgress] = useState<{ week_number: number; completed: boolean }[]>([]);
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
        // Generate devotional via edge function
        try {
          const { data, error } = await supabase.functions.invoke("generate-devotional");
          if (data && !error) setDevotional(data);
        } catch (e) {
          console.error("Failed to generate devotional:", e);
        }
      }
      setLoadingDevotional(false);

      if (progRes.data) setProgress(progRes.data);
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

  const completedWeeks = progress.filter((p) => p.completed).length;
  const progressPercent = (completedWeeks / 4) * 100;

  return (
    <AppLayout>
      <div className="space-y-8">
        <TrialBanner />
        {/* Welcome */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Olá, <span className="text-gradient-gold">{profile?.full_name || "Irmão(ã)"}</span>
          </h1>
          <p className="text-muted-foreground mt-1">Que Deus abençoe seu dia de estudo!</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <CardContent className="flex flex-col items-center justify-center py-6">
                <item.icon className={`w-8 h-8 ${item.color} mb-2`} />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Seu Progresso — 30 Dias de Transformação</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercent} className="h-3 mb-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{completedWeeks} de 4 semanas concluídas</span>
              <span>{progressPercent.toFixed(0)}%</span>
            </div>
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
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-foreground">{devotional.title}</h3>
                {devotional.apostle && (
                  <Badge variant="outline" className="text-gold border-gold/30">{devotional.apostle}</Badge>
                )}
                <p className="text-muted-foreground leading-relaxed">{devotional.content}</p>
                <blockquote className="border-l-2 border-gold/50 pl-4 italic text-foreground/80">
                  "{devotional.verse}" — {devotional.verse_reference}
                </blockquote>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gold mb-1">💛 Palavra de Conforto</p>
                  <p className="text-foreground/90">{devotional.comfort_word}</p>
                </div>
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
