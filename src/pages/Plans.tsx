import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Plan {
  id: string;
  title: string;
  description: string;
  author: string;
  duration_days: number;
  cover_image_url: string;
  rating: number;
  sort_order: number;
}

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await supabase
        .from('devotional_plans' as any)
        .select('*')
        .order('sort_order');
      if (data) setPlans(data as unknown as Plan[]);
      setLoading(false);
    };
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-gold animate-pulse font-serif text-xl">Carregando planos...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gradient-gold">Planos Devocionais</h2>
          <p className="text-muted-foreground text-sm mt-1">Escolha um plano e cresça espiritualmente</p>
        </div>

        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 cursor-pointer hover:border-gold/30 transition-all"
              onClick={() => navigate(`/planos/${plan.id}`)}
            >
              <img
                src={plan.cover_image_url}
                alt={plan.title}
                className="w-16 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{plan.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{plan.duration_days} dias</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.round(plan.rating) ? 'fill-gold text-gold' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                  <span className="text-[10px] text-muted-foreground ml-1">{plan.rating}</span>
                </div>
              </div>
              <Button size="sm" variant="hero" className="text-xs px-3 py-1.5 h-auto flex-shrink-0">
                Começar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Plans;
