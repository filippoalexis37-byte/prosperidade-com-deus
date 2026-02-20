import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

interface Medal {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  earned: boolean;
  earned_at?: string;
}

const Medals = () => {
  const { user } = useAuth();
  const [medals, setMedals] = useState<Medal[]>([]);

  useEffect(() => {
    const fetchMedals = async () => {
      const [allMedals, userMedals] = await Promise.all([
        supabase.from("medals").select("*"),
        supabase.from("user_medals").select("medal_id, earned_at").eq("user_id", user!.id),
      ]);

      if (allMedals.data) {
        const earnedMap = new Map(userMedals.data?.map((m) => [m.medal_id, m.earned_at]));
        setMedals(
          allMedals.data.map((m) => ({
            ...m,
            earned: earnedMap.has(m.id),
            earned_at: earnedMap.get(m.id),
          }))
        );
      }
    };
    fetchMedals();
  }, [user]);

  const earnedCount = medals.filter((m) => m.earned).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-gold" />
          <h1 className="font-serif text-2xl font-bold text-foreground">Minhas Medalhas</h1>
        </div>

        <p className="text-muted-foreground">
          {earnedCount} de {medals.length} medalhas conquistadas
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {medals.map((medal) => (
            <Card
              key={medal.id}
              className={`border transition-all ${
                medal.earned
                  ? "border-gold/40 bg-gold/5 glow-gold"
                  : "border-border bg-card opacity-60"
              }`}
            >
              <CardContent className="flex items-center gap-4 py-6">
                <span className={`text-4xl ${medal.earned ? "" : "grayscale"}`}>
                  {medal.icon}
                </span>
                <div>
                  <h3 className={`font-serif font-bold ${medal.earned ? "text-gold" : "text-muted-foreground"}`}>
                    {medal.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{medal.description}</p>
                  {medal.earned && medal.earned_at && (
                    <p className="text-xs text-gold/60 mt-1">
                      Conquistada em {new Date(medal.earned_at).toLocaleDateString("pt-BR")}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Medals;
