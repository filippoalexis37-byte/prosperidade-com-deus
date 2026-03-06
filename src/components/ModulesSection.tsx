import { BookOpen, Sun, Map, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Devocional Diário",
    description:
      "Uma palavra diária para fortalecer sua fé e alinhar seu dia com Deus.",
  },
  {
    icon: Sun,
    title: "Versículo do Dia",
    description:
      "Receba um versículo diariamente para meditar e aplicar na sua vida.",
  },
  {
    icon: Map,
    title: "Planos Espirituais",
    description:
      "Planos guiados sobre ansiedade, medo, propósito e disciplina espiritual.",
  },
  {
    icon: TrendingUp,
    title: "Crescimento Espiritual",
    description:
      "Desenvolva o hábito de buscar a Deus todos os dias.",
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
        </div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-gold/30 transition-all duration-500 hover:glow-gold"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6 text-primary-foreground" />
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
