import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, Lock, Clock } from "lucide-react";

interface Plan {
  id: string;
  title: string;
  description: string;
  author: string;
  duration_days: number;
  cover_image_url: string;
  rating: number;
}

interface UserProgress {
  id: string;
  started_at: string;
  completed_at: string | null;
}

const PlanDetail = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!planId || !user) return;

      const [planRes, progressRes, completionsRes] = await Promise.all([
        supabase.from('devotional_plans' as any).select('*').eq('id', planId).single(),
        supabase.from('user_plan_progress' as any).select('*').eq('user_id', user.id).eq('plan_id', planId).maybeSingle(),
        supabase.from('user_plan_day_completions' as any).select('day_number').eq('user_id', user.id).eq('plan_id', planId),
      ]);

      if (planRes.data) setPlan(planRes.data as Plan);
      if (progressRes.data) setProgress(progressRes.data as UserProgress);
      if (completionsRes.data) setCompletedDays((completionsRes.data as any[]).map(d => d.day_number));
      setLoading(false);
    };
    fetchData();
  }, [planId, user]);

  const startPlan = async () => {
    if (!user || !planId) return;
    const { data } = await supabase
      .from('user_plan_progress' as any)
      .insert({ user_id: user.id, plan_id: planId })
      .select()
      .single();
    if (data) {
      setProgress(data as UserProgress);
      navigate(`/planos/${planId}/dia/1`);
    }
  };

  if (loading || !plan) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-gold animate-pulse font-serif">Carregando...</p>
        </div>
      </AppLayout>
    );
  }

  const progressPercent = plan.duration_days > 0 ? (completedDays.length / plan.duration_days) * 100 : 0;
  const hasStarted = !!progress;

  return (
    <AppLayout>
      <div className="space-y-6">
        <button onClick={() => navigate('/planos')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <div className="rounded-xl overflow-hidden">
          <img src={plan.cover_image_url} alt={plan.title} className="w-full h-48 object-cover" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-serif font-bold text-foreground">{plan.title}</h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {plan.duration_days} dias</span>
            <span>Por {plan.author}</span>
          </div>

          {hasStarted && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Dia {completedDays.length} de {plan.duration_days}</span>
                {completedDays.length >= plan.duration_days ? (
                  <span className="text-green-400 font-medium">Concluído! ✨</span>
                ) : (
                  <span className="text-gold font-medium">Em dia!</span>
                )}
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          )}

          <Button
            variant="hero"
            size="lg"
            className="w-full text-lg py-6"
            onClick={() => {
              if (!hasStarted) {
                startPlan();
              } else {
                const nextDay = Math.min(completedDays.length + 1, plan.duration_days);
                navigate(`/planos/${planId}/dia/${nextDay}`);
              }
            }}
          >
            {hasStarted ? 'Continuar Plano' : 'Iniciar Plano'}
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Sobre este plano</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{plan.description}</p>
        </div>

        {hasStarted && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Dias do Plano</h3>
            <div className="space-y-2">
              {Array.from({ length: plan.duration_days }, (_, i) => i + 1).map((day) => {
                const isCompleted = completedDays.includes(day);
                const isUnlocked = day === 1 || completedDays.includes(day - 1);
                return (
                  <button
                    key={day}
                    onClick={() => isUnlocked && navigate(`/planos/${planId}/dia/${day}`)}
                    disabled={!isUnlocked}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-gold/10 border-gold/30 text-foreground'
                        : isUnlocked
                        ? 'bg-card border-border hover:border-gold/30 text-foreground'
                        : 'bg-card/50 border-border/50 text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    <span className="font-medium">Dia {day}</span>
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-gold" />
                    ) : !isUnlocked ? (
                      <Lock className="w-4 h-4" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default PlanDetail;
