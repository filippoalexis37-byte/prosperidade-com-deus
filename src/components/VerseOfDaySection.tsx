import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, RefreshCw, Check } from "lucide-react";

const verses = [
  {
    reference: "Mateus 6:33",
    text: "Buscai primeiro o Reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.",
    reflection: "Quando colocamos Deus em primeiro lugar, Ele cuida de todas as outras áreas da nossa vida.",
  },
  {
    reference: "Salmos 23:1",
    text: "O Senhor é o meu pastor, nada me faltará.",
    reflection: "Deus cuida de você em todos os momentos, mesmo quando as circunstâncias parecem difíceis.",
  },
  {
    reference: "Jeremias 29:11",
    text: "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor.",
    reflection: "Mesmo quando você não entende o caminho, Deus já preparou um futuro cheio de esperança.",
  },
  {
    reference: "Filipenses 4:13",
    text: "Tudo posso naquele que me fortalece.",
    reflection: "Sua força não vem de você, mas de Deus. Com Ele, nenhum desafio é grande demais.",
  },
  {
    reference: "Isaías 41:10",
    text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.",
    reflection: "Deus está ao seu lado em cada momento. Você nunca caminha sozinho.",
  },
  {
    reference: "Provérbios 3:5-6",
    text: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.",
    reflection: "Entregar o controle a Deus é o primeiro passo para encontrar paz e direção.",
  },
  {
    reference: "Romanos 8:28",
    text: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus.",
    reflection: "Mesmo nos momentos difíceis, Deus está trabalhando a seu favor.",
  },
  {
    reference: "Josué 1:9",
    text: "Seja forte e corajoso! Não se apavore, nem se desanime, pois o Senhor está com você.",
    reflection: "A coragem cristã nasce da certeza de que Deus nunca nos abandona.",
  },
];

const VerseOfDaySection = () => {
  const [currentVerse, setCurrentVerse] = useState<typeof verses[0] | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const revealVerse = () => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    setCurrentVerse(verses[randomIndex]);
    setIsRevealed(true);
  };

  const newVerse = () => {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * verses.length);
    } while (verses[randomIndex].reference === currentVerse?.reference && verses.length > 1);
    setCurrentVerse(verses[randomIndex]);
  };

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">
        <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
          Palavra de Deus
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Versículo do <span className="text-gradient-gold">Dia</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Receba uma palavra de Deus para fortalecer sua fé hoje.
        </p>

        {!isRevealed ? (
          <Button
            variant="hero"
            size="lg"
            className="text-lg px-10 py-6"
            onClick={revealVerse}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Ver Versículo do Dia
          </Button>
        ) : currentVerse ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            <Card className="bg-card border-gold/20 shadow-2xl">
              <CardContent className="p-8 md:p-10">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gold" />
                  </div>
                </div>

                {/* Verse */}
                <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-4">
                  "{currentVerse.text}"
                </blockquote>

                <p className="text-gold font-medium text-sm tracking-wide mb-8">
                  — {currentVerse.reference}
                </p>

                {/* Divider */}
                <div className="w-16 h-[1px] bg-gold/30 mx-auto mb-6" />

                {/* Reflection */}
                <p className="text-muted-foreground text-base leading-relaxed italic">
                  {currentVerse.reflection}
                </p>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              size="lg"
              className="gap-2 rounded-xl border-gold/30 hover:border-gold/60 hover:bg-gold/5"
              onClick={newVerse}
            >
              <RefreshCw className="w-4 h-4" />
              Ver outro versículo
            </Button>

            <div className="pt-4">
              <a href="/auth">
                <Button variant="hero" size="lg" className="text-lg px-10 py-6">
                  Começar minha jornada espiritual
                </Button>
              </a>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-muted-foreground text-xs">
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> 7 dias grátis</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-gold" /> Sem cobrança hoje</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default VerseOfDaySection;
