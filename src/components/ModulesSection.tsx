import { Sparkles, HandHeart, Flame, Gem, Bird } from "lucide-react";

const modules = [
  {
    icon: Sparkles,
    emoji: "✨",
    title: "365 Devocionais Transformadores",
    description:
      "Uma palavra diária para fortalecer sua fé, renovar sua mente e alinhar sua vida com Deus.",
  },
  {
    icon: HandHeart,
    emoji: "🙏",
    title: "Meditações Baseadas nos Apóstolos",
    description:
      "Aprenda com os ensinamentos dos apóstolos e aplique princípios bíblicos no seu dia a dia.",
  },
  {
    icon: Flame,
    emoji: "🔥",
    title: "Direção Para Vencer o Deserto Espiritual",
    description:
      "Se você está passando por momentos difíceis, encontrará orientação para permanecer firme na presença de Deus.",
  },
  {
    icon: Gem,
    emoji: "💎",
    title: "Prosperidade Alinhada ao Reino",
    description:
      "Entenda como viver uma vida próspera espiritualmente, emocionalmente e financeiramente com Deus no centro.",
  },
  {
    icon: Bird,
    emoji: "🕊",
    title: "Disciplina Espiritual Diária",
    description:
      "Crie o hábito de buscar a Deus todos os dias com conteúdo organizado e fácil de aplicar.",
  },
];

const ModulesSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-dark" id="modulos">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
            O Que Você Vai Receber
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Dentro do <span className="text-gradient-gold">Prosperidade com Deus</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tudo que você precisa para transformar sua vida espiritual, emocional e financeira.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod, i) => (
            <div
              key={i}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-gold/30 transition-all duration-500 hover:glow-gold"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <mod.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl">{mod.emoji}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {mod.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {mod.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
