import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, RefreshCw, Check, Sparkles, Quote } from "lucide-react";

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
          Palavra de Vida
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-cream mb-8 leading-tight">
          Versículo do <span className="text-gradient-gold">Dia</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Receba uma promessa de Deus para fortalecer sua fé e alinhar seu coração hoje.
        </p>

        {!isRevealed ? (
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-gold rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <Button
              variant="hero"
              size="lg"
              className="relative text-2xl px-12 py-10 bg-card/60 border-gold/30 hover:bg-gold/10 hover:border-gold shadow-2xl transition-all duration-300 rounded-3xl"
              onClick={revealVerse}
            >
              <Sparkles className="w-6 h-6 mr-3 text-gold" />
              Revelar Promessa de Hoje
            </Button>
          </div>
        ) : currentVerse ? (
          <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
            <Card className="bg-card/40 backdrop-blur-xl border-gold/20 shadow-[0_0_50px_-12px_rgba(212,175,55,0.2)] overflow-hidden rounded-[2.5rem]">
              <CardContent className="p-10 md:p-16 relative">
                <Quote className="absolute top-10 right-10 w-20 h-20 text-gold/5" />
                
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-lg">
                    <BookOpen className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                {/* Verse */}
                <blockquote className="font-serif text-2xl md:text-4xl text-cream leading-tight mb-6 font-bold">
                  "{currentVerse.text}"
                </blockquote>

                <p className="text-gold-light font-black text-lg tracking-[0.2em] mb-10 uppercase">
                  — {currentVerse.reference}
                </p>

                {/* Divider */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mb-10" />

                {/* Reflection */}
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed italic font-medium max-w-2xl mx-auto">
                  {currentVerse.reflection}
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col items-center gap-6">
              <Button
                variant="outline"
                size="lg"
                className="gap-3 rounded-2xl border-gold/30 hover:border-gold/60 hover:bg-gold/10 text-gold font-bold px-8 py-6"
                onClick={newVerse}
              >
                <RefreshCw className="w-5 h-5" />
                Ver outro versículo
              </Button>

              <div className="pt-6">
                <a href="#oferta">
                  <Button className="h-16 px-12 rounded-full bg-gradient-gold text-primary-foreground font-bold text-xl shadow-[0_0_50px_rgba(201,169,110,0.5)] hover:scale-105 transition-transform animate-pulse-subtle">
                    Quero Começar Agora
                  </Button>
                </a>
                <div className="flex flex-wrap justify-center gap-6 mt-6 text-gold-light/60 text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Acesso Imediato</span>
                  <span className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> 7 Dias de Garantia</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default VerseOfDaySection;
