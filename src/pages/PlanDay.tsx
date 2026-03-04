import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DayContent {
  id: string;
  day_number: number;
  title: string;
  main_verse: string;
  main_verse_reference: string;
  complementary_verses: string;
  reflection: string;
  prayer: string;
}

const PlanDay = () => {
  const { planId, dayNumber } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [day, setDay] = useState<DayContent | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [planTitle, setPlanTitle] = useState("");
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!planId || !dayNumber || !user) return;

      const [dayRes, completionRes, planRes] = await Promise.all([
        supabase.from('devotional_plan_days' as any).select('*').eq('plan_id', planId).eq('day_number', Number(dayNumber)).single(),
        supabase.from('user_plan_day_completions' as any).select('id').eq('user_id', user.id).eq('plan_id', planId).eq('day_number', Number(dayNumber)).maybeSingle(),
        supabase.from('devotional_plans' as any).select('title, duration_days').eq('id', planId).single(),
      ]);

      if (dayRes.data) setDay(dayRes.data as DayContent);
      if (completionRes.data) setIsCompleted(true);
      if (planRes.data) {
        setPlanTitle((planRes.data as any).title);
        setTotalDays((planRes.data as any).duration_days);
      }
      setLoading(false);
    };
    fetchData();
  }, [planId, dayNumber, user]);

  const completeDay = async () => {
    if (!user || !planId || !dayNumber) return;

    const { error } = await supabase
      .from('user_plan_day_completions' as any)
      .insert({ user_id: user.id, plan_id: planId, day_number: Number(dayNumber) });

    if (!error) {
      setIsCompleted(true);
      toast({
        title: "Dia concluído! ✨",
        description: "Parabéns por completar mais um dia do plano.",
      });
    }
  };

  if (loading || !day) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-gold animate-pulse font-serif">Carregando...</p>
        </div>
      </AppLayout>
    );
  }

  const currentDay = Number(dayNumber);
  const hasNextDay = currentDay < totalDays;

  return (
    <AppLayout>
      <div className="space-y-6 pb-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(`/planos/${planId}`)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {planTitle}
          </button>
          <span className="text-sm text-muted-foreground">Dia {dayNumber} de {totalDays}</span>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif font-bold text-gradient-gold">{day.title}</h2>
        </div>

        {/* Main Verse */}
        <div className="bg-gold/5 border border-gold/20 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-gold text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            {day.main_verse_reference}
          </div>
          <p className="text-foreground italic leading-relaxed">"{day.main_verse}"</p>
        </div>

        {/* Complementary Verses */}
        {day.complementary_verses && (
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-sm">Versículos Complementares</h3>
            <p className="text-muted-foreground text-sm">{day.complementary_verses}</p>
          </div>
        )}

        {/* Reflection */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-sm">Reflexão</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{day.reflection}</p>
        </div>

        {/* Prayer */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <h3 className="font-semibold text-foreground text-sm">Oração</h3>
          <p className="text-muted-foreground text-sm italic leading-relaxed">{day.prayer}</p>
        </div>

        {/* Complete / Navigation */}
        {isCompleted ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 py-4 text-gold">
              <Check className="w-5 h-5" />
              <span className="font-medium">Dia concluído!</span>
            </div>
            {hasNextDay && (
              <Button
                variant="heroOutline"
                size="lg"
                className="w-full"
                onClick={() => navigate(`/planos/${planId}/dia/${currentDay + 1}`)}
              >
                Próximo Dia →
              </Button>
            )}
            {!hasNextDay && (
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => navigate(`/planos/${planId}`)}
              >
                Ver Plano Completo ✨
              </Button>
            )}
          </div>
        ) : (
          <Button variant="hero" size="lg" className="w-full text-lg py-6" onClick={completeDay}>
            Concluir Dia {dayNumber}
          </Button>
        )}
      </div>
    </AppLayout>
  );
};

export default PlanDay;
