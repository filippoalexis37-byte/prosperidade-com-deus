import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const apostles = [
  "Paulo", "Pedro", "João", "Tiago", "André", "Filipe", "Bartolomeu",
  "Mateus", "Tomé", "Tadeu", "Simão", "Judas (irmão de Tiago)"
];

const Devotional = () => {
  const [devotional, setDevotional] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchDevotional = async () => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("daily_devotionals")
      .select("*")
      .eq("devotional_date", today)
      .single();

    if (data) {
      setDevotional(data);
      setLoading(false);
    } else {
      await generateDevotional();
    }
  };

  const generateDevotional = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-devotional");
      if (data && !error) setDevotional(data);
    } catch (e) {
      console.error(e);
    }
    setGenerating(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchDevotional();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-400" />
            <h1 className="font-serif text-2xl font-bold text-foreground">Devocional Diário</h1>
          </div>
        </div>

        {loading || generating ? (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <RefreshCw className="w-8 h-8 text-gold animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">
                {generating ? "Gerando sua palavra do dia..." : "Carregando..."}
              </p>
            </CardContent>
          </Card>
        ) : devotional ? (
          <div className="space-y-6">
            {/* Apostle badge */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-gold border-gold/30 text-sm px-3 py-1">
                📜 Palavra de {devotional.apostle}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
              </span>
            </div>

            {/* Main devotional */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">{devotional.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-foreground/90 leading-relaxed text-base">{devotional.content}</p>

                <blockquote className="border-l-4 border-gold/50 pl-4 py-2 bg-secondary/30 rounded-r-lg">
                  <p className="italic text-foreground/80 text-lg">"{devotional.verse}"</p>
                  <p className="text-gold text-sm mt-2 font-medium">— {devotional.verse_reference} (NVI)</p>
                </blockquote>
              </CardContent>
            </Card>

            {/* Comfort word */}
            <Card className="bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
              <CardContent className="py-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💛</span>
                  <div>
                    <p className="font-medium text-gold mb-2">Palavra de Conforto</p>
                    <p className="text-foreground/90 leading-relaxed">{devotional.comfort_word}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All apostles */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-serif text-lg">Os 12 Apóstolos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {apostles.map((a) => (
                    <div
                      key={a}
                      className={`text-center py-3 px-2 rounded-xl border transition-all ${
                        a === devotional.apostle
                          ? "border-gold/50 bg-gold/10 text-gold"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      <span className="text-xs font-medium">{a}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Nenhum devocional disponível.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Devotional;
