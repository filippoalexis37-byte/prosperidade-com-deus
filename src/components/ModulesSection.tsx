import { BookOpen, Star, Flame, Gem, Cross } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    emoji: "✨",
    title: "365 Devocionais Transformadores",
    description:
      "Uma palavra diária para fortalecer sua fé, renovar sua mente e alinhar sua vida com Deus.",
    stat: "Conteúdo Diário",
  },
  {
    icon: Star,
    emoji: "🙏",
    title: "Meditações Baseadas nos Apóstolos",
    description:
      "Aprenda com os ensinamentos dos apóstolos e aplique princípios bíblicos no seu dia a dia.",
    stat: "Sabedoria Pura",
  },
  {
    icon: Flame,
    emoji: "🔥",
    title: "Vencer o Deserto Espiritual",
    description:
      "Se você está passando por momentos difíceis, encontrará orientação para permanecer firme.",
    stat: "Direção e Cura",
  },
  {
    icon: Gem,
    emoji: "💎",
    title: "Prosperidade Alinhada ao Reino",
    description:
      "Entenda como viver uma vida próspera espiritualmente, emocionalmente e financeiramente.",
    stat: "Plenitude",
  },
  {
    icon: Cross,
    emoji: "🕊",
    title: "Disciplina Espiritual Diária",
    description:
      "Crie o hábito de buscar a Deus todos os dias com conteúdo organizado e fácil de aplicar.",
    stat: "Hábito Santo",
  },
];

const ModulesSection = () => {
  return (
    <section className="py-24 px-6 bg-background" id="modulos">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
            Dentro do Prosperidade com Deus
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-cream mb-6 leading-tight">
            O Que Você <span className="text-gradient-gold">Vai Receber</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Tudo que você precisa para transformar sua vida espiritual, emocional e financeira em um só lugar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="group relative bg-card/40 border border-white/5 rounded-3xl p-8 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center text-2xl shadow-lg">
                  {item.emoji}
                </div>
                <span className="text-gold-light text-[10px] font-bold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.stat}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-cream mb-4">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
          
          {/* Bonus Card */}
          <div className="group relative bg-gradient-gold rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-gold hover:scale-[1.03] transition-all duration-500">
            <h3 className="font-serif text-3xl font-bold text-primary-foreground mb-4 leading-tight">
              Acesso Vitalício ao App
            </h3>
            <p className="text-primary-foreground/80 font-medium mb-6 text-sm md:text-base">
              Assine agora e garanta todas as atualizações futuras sem custo adicional.
            </p>
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
              Bônus Exclusivo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
