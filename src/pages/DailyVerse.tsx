import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import UpgradeGate from "@/components/UpgradeGate";
import TrialBanner from "@/components/TrialBanner";
import { Heart, Share2, MessageCircle, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

import verseBg1 from "@/assets/verse-bg-1.jpg";
import verseBg2 from "@/assets/verse-bg-2.jpg";
import verseBg3 from "@/assets/verse-bg-3.jpg";
import verseBg4 from "@/assets/verse-bg-4.jpg";
import verseBg5 from "@/assets/verse-bg-5.jpg";

const backgrounds = [verseBg1, verseBg2, verseBg3, verseBg4, verseBg5];

interface DailyVerse {
  id: string;
  verse_text: string;
  verse_reference: string;
  background_index: number;
  verse_date: string;
}

const DailyVerse = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriting, setFavoriting] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchVerse = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("daily_verses")
        .select("*")
        .eq("verse_date", today)
        .single();

      if (data) {
        setVerse(data as DailyVerse);
        setLoading(false);
        checkFavorite(data.id);
      } else {
        try {
          const { data: generated, error } = await supabase.functions.invoke("generate-daily-verse");
          if (generated && !error) {
            setVerse(generated as DailyVerse);
            if (generated.id) checkFavorite(generated.id);
          }
        } catch (e) {
          console.error("Failed to generate verse:", e);
        }
        setLoading(false);
      }
    };

    fetchVerse();
  }, []);

  const checkFavorite = async (verseId: string) => {
    if (!user) return;
    const { data } = await supabase
      .from("verse_favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("verse_id", verseId)
      .maybeSingle();
    setIsFavorited(!!data);
  };

  const toggleFavorite = async () => {
    if (!verse?.id || !user || favoriting) return;
    setFavoriting(true);

    if (isFavorited) {
      await supabase
        .from("verse_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("verse_id", verse.id);
      setIsFavorited(false);
      toast({ title: "Removido dos favoritos" });
    } else {
      await supabase
        .from("verse_favorites")
        .insert({ user_id: user.id, verse_id: verse.id });
      setIsFavorited(true);
      toast({ title: "💛 Adicionado aos favoritos!" });
    }
    setFavoriting(false);
  };

  const exportAsImage = async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `versiculo-do-dia-${verse?.verse_date || "hoje"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast({ title: "📸 Imagem salva com sucesso!" });
    } catch (e) {
      console.error(e);
      toast({ title: "Erro ao exportar imagem", variant: "destructive" });
    }
    setExporting(false);
  };

  const shareVerse = async () => {
    if (!verse) return;
    const text = `✨ Versículo do Dia ✨\n\n"${verse.verse_text}"\n\n— ${verse.verse_reference}\n\n📖 Prosperidade com Deus`;

    if (navigator.share) {
      try {
        // Try sharing image first
        if (cardRef.current) {
          const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true, backgroundColor: null });
          const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
          if (blob) {
            const file = new File([blob], "versiculo-do-dia.png", { type: "image/png" });
            await navigator.share({ text, files: [file] });
            return;
          }
        }
        await navigator.share({ text });
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          await navigator.clipboard.writeText(text);
          toast({ title: "📋 Texto copiado para a área de transferência!" });
        }
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: "📋 Texto copiado para a área de transferência!" });
    }
  };

  const bgImage = verse ? backgrounds[verse.background_index % backgrounds.length] : backgrounds[0];

  return (
    <AppLayout>
      <UpgradeGate>
        <div className="space-y-6">
          <TrialBanner />

          {loading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
          ) : verse ? (
            <div className="space-y-4">
              {/* Instagram-style card */}
              <div
                ref={cardRef}
                className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
                style={{ aspectRatio: "9/16", maxHeight: "70vh" }}
              >
                {/* Background image */}
                <img
                  src={bgImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-12 text-center">
                  {/* Top label */}
                  <div className="absolute top-6 left-0 right-0">
                    <p
                      className="text-xs font-medium uppercase tracking-[0.3em] opacity-80"
                      style={{ color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                    >
                      Versículo do Dia
                    </p>
                    <p
                      className="text-[10px] mt-1 opacity-60"
                      style={{ color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                    >
                      {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>

                  {/* Decorative line */}
                  <div className="w-12 h-[1px] bg-white/40 mb-8" />

                  {/* Verse text */}
                  <p
                    className="font-serif text-xl md:text-2xl leading-relaxed font-medium max-w-sm"
                    style={{
                      color: "white",
                      textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)",
                    }}
                  >
                    "{verse.verse_text}"
                  </p>

                  {/* Decorative line */}
                  <div className="w-12 h-[1px] bg-white/40 mt-8 mb-4" />

                  {/* Reference */}
                  <p
                    className="text-sm font-medium tracking-wide opacity-90"
                    style={{
                      color: "white",
                      textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    — {verse.verse_reference}
                  </p>

                  {/* App branding (bottom) */}
                  <div className="absolute bottom-6 left-0 right-0">
                    <p
                      className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-50"
                      style={{ color: "white" }}
                    >
                      ✦ Prosperidade com Deus ✦
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className={`flex-1 gap-2 rounded-xl border-border ${
                    isFavorited ? "bg-red-500/10 border-red-500/30 text-red-400" : ""
                  }`}
                  onClick={toggleFavorite}
                  disabled={favoriting}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                  {isFavorited ? "Favoritado" : "Favoritar"}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2 rounded-xl border-border"
                  onClick={shareVerse}
                >
                  <Share2 className="w-5 h-5" />
                  Compartilhar
                </Button>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2 rounded-xl border-border"
                  onClick={exportAsImage}
                  disabled={exporting}
                >
                  {exporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                  Salvar Imagem
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2 rounded-xl border-border"
                  onClick={() => navigate("/devocional")}
                >
                  <MessageCircle className="w-5 h-5" />
                  Refletir
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[60vh] text-center">
              <p className="text-muted-foreground">Nenhum versículo disponível hoje.</p>
            </div>
          )}
        </div>
      </UpgradeGate>
    </AppLayout>
  );
};

export default DailyVerse;
