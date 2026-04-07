import { Button } from "@/components/ui/button";
import { BookX, HelpCircle, Brain, XCircle, BookOpen, Sun, Map, GraduationCap, ArrowRight } from "lucide-react";

const pains = [
  { icon: BookX, text: "Leem a Bíblia mas não entendem o significado de alguns versículos" },
  { icon: HelpCircle, text: "Não sabem como aplicar a Palavra de Deus no dia a dia" },
  { icon: Brain, text: "Sentem ansiedade, medo ou confusão espiritual" },
  { icon: XCircle, text: "Começam a ler a Bíblia, mas acabam desistindo por falta de direção" },
];

const solutions = [
  { icon: BookOpen, text: "Devocionais diários com explicações simples", highlight: "Novos todos os dias" },
  { icon: Sun, text: "Versículo do dia com reflexão profunda", highlight: "Meditação guiada" },
  { icon: Map, text: "Planos espirituais para ansiedade, medo e propósito", highlight: "+10 planos" },
  { icon: GraduationCap, text: "Ensinamentos práticos baseados na Bíblia", highlight: "Fácil de entender" },
];

const PainSolutionSection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Pain */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Você já <span className="text-gradient-gold">sentiu isso?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Muitas pessoas querem se aproximar de Deus, mas enfrentam algumas dificuldades:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {pains.map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-destructive/5 border border-destructive/20 rounded-xl p-5 hover:border-destructive/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-destructive" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground italic mb-20">
          Isso faz com que muitas pessoas se sintam perdidas na jornada espiritual.
        </p>

        {/* Solution */}
        <div className="text-center mb-12">
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
            A Solução
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Um aplicativo que <span className="text-gradient-gold">guia sua jornada</span> com Deus
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            O Prosperidade com Deus foi criado para ajudar você a entender melhor a Palavra e aplicar os ensinamentos bíblicos na sua vida.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {solutions.map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-card border border-gold/20 rounded-xl p-5 hover:border-gold/40 hover:glow-gold transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-foreground text-sm leading-relaxed font-medium">{item.text}</p>
                <span className="text-gold text-xs mt-1 inline-block">{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mb-10">
          Tudo pensado para facilitar seu entendimento e fortalecer sua caminhada com Deus.
        </p>

        <div className="text-center">
          <a href="/auth">
            <Button variant="hero" size="lg" className="text-lg px-10 py-6 group">
              Começar meu teste grátis
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PainSolutionSection;
