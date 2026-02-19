import { BookOpen, Flame, Heart } from "lucide-react";

const modules = [
  {
    icon: Flame,
    number: "01",
    title: "Confronto",
    subtitle: "Identificando os erros que travam sua prosperidade",
    description:
      "Faça um raio-x espiritual, identifique ídolos modernos e quebre padrões repetitivos que impedem seu crescimento.",
    steps: ["Raio-X Espiritual", "Ídolos Modernos", "Quebrando Padrões"],
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Processo",
    subtitle: "Entendendo o deserto e não reagindo como o mundo",
    description:
      "Aprenda que o deserto não é castigo — é preparação. Troque fuga por disciplina e siga a Regra dos 30 Dias.",
    steps: ["Entenda o Deserto", "Regra dos 30 Dias", "Disciplina sobre Fuga"],
  },
  {
    icon: Heart,
    number: "03",
    title: "Reconstrução",
    subtitle: "Colocando Deus no centro e plano de 30 dias",
    description:
      "Crie uma rotina diária com Deus, reconstrua sua identidade e planeje sua vida financeira e emocional.",
    steps: ["Rotina com Deus", "Nova Identidade", "Reconstrução Total"],
  },
];

const ModulesSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-dark" id="modulos">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Conteúdo do Curso
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            3 Módulos de <span className="text-gradient-gold">Transformação</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Um caminho prático e profundo para restaurar sua vida.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((mod) => (
            <div
              key={mod.number}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-gold/30 transition-all duration-500 hover:glow-gold"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <mod.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-gold/40 font-serif text-3xl font-bold">
                  {mod.number}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                {mod.title}
              </h3>
              <p className="text-gold-light text-sm mb-4">{mod.subtitle}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {mod.description}
              </p>

              <div className="space-y-2">
                {mod.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-gold" />
                    <span className="text-secondary-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
