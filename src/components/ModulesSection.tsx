import { BookOpen, Sun, Map, TrendingUp, Flame, Trophy } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Devocional Diário",
    description:
      "Uma palavra diária para fortalecer sua fé e alinhar seu dia com Deus.",
    stat: "Novo todo dia",
  },
  {
    icon: Sun,
    title: "Versículo do Dia",
    description:
      "Receba um versículo diariamente para meditar e aplicar na sua vida.",
    stat: "Com reflexão",
  },
  {
    icon: Map,
    title: "Planos Espirituais",
    description:
      "Planos guiados sobre ansiedade, medo, propósito e disciplina espiritual.",
    stat: "+10 planos",
  },
  {
    icon: TrendingUp,
    title: "Crescimento Espiritual",
    description:
      "Desenvolva o hábito de buscar a Deus todos os dias.",
    stat: "Sequência diária",
  },
  {
    icon: Flame,
    title: "Sequência de Leitura",
    description:
      "Acompanhe sua consistência e mantenha o hábito de ler a Palavra diariamente.",
    stat: "Gamificação",
  },
  {
    icon: Trophy,
    title: "Medalhas de Conquista",
    description:
      "Ganhe medalhas conforme avança na sua jornada espiritual e celebre cada marco.",
    stat: "Motivação",
  },
];

const ModulesSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-dark" id="modulos">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Tudo em um só lugar
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            O que você recebe <span className="text-gradient-gold">dentro do app</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tudo o que você precisa para uma vida devocional forte e consistente.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-gold/30 transition-all duration-500 hover:glow-gold"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-gold text-xs font-medium bg-gold/10 px-3 py-1 rounded-full">
                  {item.stat}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
