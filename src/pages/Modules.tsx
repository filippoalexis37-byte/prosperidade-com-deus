import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Compass, CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";

const courseWeeks = [
  {
    week: 1,
    title: "Silêncio e Entrega",
    subtitle: "Módulo 1 — Confronto",
    description: "Pare de reagir emocionalmente. Comece a orar antes de agir. Identifique os erros que travam sua prosperidade.",
    verse: "Salmos 46:10",
    tasks: [
      "Ler o Módulo 1 — Confronto completo",
      "Identificar 3 erros financeiros que você comete",
      "Fazer 7 dias de oração matinal antes de qualquer decisão",
      "Escrever uma carta de arrependimento a Deus",
      "Jejuar 1 dia focado em entrega total",
    ],
  },
  {
    week: 2,
    title: "Corte de Ambientes",
    subtitle: "Módulo 2 — Reconstrução",
    description: "Elimine ambientes e hábitos que afastam você de Deus. Reconstrua sua base financeira.",
    verse: "Provérbios 4:23",
    tasks: [
      "Ler o Módulo 2 — Reconstrução completo",
      "Listar gastos desnecessários e eliminar pelo menos 3",
      "Cortar 1 ambiente que enfraquece sua fé",
      "Começar a dizimar com intencionalidade",
      "Meditar em Provérbios 4 por 7 dias",
    ],
  },
  {
    week: 3,
    title: "Fortalecimento da Identidade",
    subtitle: "Módulo 3 — Aliança Financeira",
    description: "Você é filho de Deus. Sem identidade curada, você repete erro. Firme a aliança financeira com Deus.",
    verse: "Jeremias 18",
    tasks: [
      "Ler o Módulo 3 — Aliança Financeira completo",
      "Escrever sua declaração de identidade em Cristo",
      "Criar um plano de ofertas e dízimos mensal",
      "Orar por 7 dias sobre sua identidade restaurada",
      "Memorizar 3 versículos sobre prosperidade",
    ],
  },
  {
    week: 4,
    title: "Planejamento do Novo Ciclo",
    subtitle: "Consolidação",
    description: "Defina metas espirituais, corte gastos emocionais, planeje o futuro com Deus no controle.",
    verse: "Provérbios 3:9",
    tasks: [
      "Criar metas financeiras para os próximos 90 dias",
      "Fazer um planejamento de oferta mensal",
      "Escrever sua visão de prosperidade com Deus",
      "Compartilhar seu testemunho com alguém",
      "Celebrar o que Deus já fez em sua vida",
    ],
  },
];

const Modules = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data } = await supabase
        .from("user_progress")
        .select("week_number, completed")
        .eq("user_id", user!.id);

      if (data) {
        const map: Record<number, boolean> = {};
        data.forEach((p) => (map[p.week_number] = p.completed));
        setProgress(map);
      }
      setLoading(false);
    };
    fetchProgress();
  }, [user]);

  const completeWeek = async (weekNum: number) => {
    const { error } = await supabase.from("user_progress").upsert({
      user_id: user!.id,
      week_number: weekNum,
      completed: true,
      completed_at: new Date().toISOString(),
    }, { onConflict: "user_id,week_number" });

    if (error) {
      toast.error("Erro ao salvar progresso");
      return;
    }

    // Check for medal
    const { data: medals } = await supabase
      .from("medals")
      .select("id")
      .eq("requirement_type", `week_${weekNum}`)
      .single();

    if (medals) {
      await supabase.from("user_medals").upsert({
        user_id: user!.id,
        medal_id: medals.id,
      }, { onConflict: "user_id,medal_id" });
    }

    // Check if all weeks complete
    const newProgress = { ...progress, [weekNum]: true };
    setProgress(newProgress);

    if ([1, 2, 3, 4].every((w) => newProgress[w])) {
      const { data: completeMedal } = await supabase
        .from("medals")
        .select("id")
        .eq("requirement_type", "course_complete")
        .single();
      if (completeMedal) {
        await supabase.from("user_medals").upsert({
          user_id: user!.id,
          medal_id: completeMedal.id,
        }, { onConflict: "user_id,medal_id" });
      }
      toast.success("🏆 Parabéns! Você completou todas as semanas!");
    } else {
      toast.success(`⚔️ Semana ${weekNum} concluída! Medalha desbloqueada!`);
    }
  };

  const canAccessWeek = (weekNum: number) => {
    if (weekNum === 1) return true;
    return progress[weekNum - 1] === true;
  };

  const completedCount = Object.values(progress).filter(Boolean).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Compass className="w-6 h-6 text-blue-400" />
          <h1 className="font-serif text-2xl font-bold text-foreground">Módulos do Curso</h1>
        </div>

        <Progress value={(completedCount / 4) * 100} className="h-3" />
        <p className="text-sm text-muted-foreground">{completedCount} de 4 semanas concluídas</p>

        <div className="space-y-6">
          {courseWeeks.map((week) => {
            const isCompleted = progress[week.week];
            const canAccess = canAccessWeek(week.week);

            return (
              <Card
                key={week.week}
                className={`bg-card border-border transition-all ${
                  !canAccess ? "opacity-50" : isCompleted ? "border-gold/30" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="outline" className="text-gold border-gold/30 mb-2">
                        Semana {week.week}
                      </Badge>
                      <CardTitle className="font-serif text-xl">{week.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{week.subtitle}</p>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    ) : !canAccess ? (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    ) : null}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{week.description}</p>
                  <p className="text-gold/60 text-sm italic">📖 {week.verse}</p>

                  {canAccess && (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Tarefas da Semana:</p>
                        {week.tasks.map((task, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-gold mt-0.5">•</span>
                            <span className="text-muted-foreground">{task}</span>
                          </div>
                        ))}
                      </div>

                      {!isCompleted && (
                        <Button variant="hero" className="w-full mt-4" onClick={() => completeWeek(week.week)}>
                          Concluir Semana {week.week}
                        </Button>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Modules;
