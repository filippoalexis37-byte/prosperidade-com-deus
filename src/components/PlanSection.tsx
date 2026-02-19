const weeks = [
  {
    week: "Semana 1",
    title: "Silêncio e Entrega",
    description: "Pare de reagir emocionalmente. Comece a orar antes de agir.",
    verse: "Salmos 46:10",
  },
  {
    week: "Semana 2",
    title: "Corte de Ambientes",
    description: "Elimine ambientes e hábitos que afastam você de Deus.",
    verse: "Provérbios 4:23",
  },
  {
    week: "Semana 3",
    title: "Fortalecimento da Identidade",
    description: "Você é filho de Deus. Sem identidade curada, você repete erro.",
    verse: "Jeremias 18",
  },
  {
    week: "Semana 4",
    title: "Planejamento do Novo Ciclo",
    description: "Defina metas espirituais, corte gastos emocionais, planeje o futuro.",
    verse: "Provérbios 3:9",
  },
];

const PlanSection = () => {
  return (
    <section className="py-24 px-6 bg-background" id="plano">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Plano Prático
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            30 Dias de <span className="text-gradient-gold">Transformação</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent hidden md:block" />

          <div className="space-y-12">
            {weeks.map((w, i) => (
              <div key={i} className="flex gap-8 group">
                {/* Dot */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-gold/40 flex items-center justify-center bg-background group-hover:bg-gold/10 transition-colors">
                    <span className="text-gold font-serif font-bold text-sm">
                      {i + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-card rounded-2xl p-8 border border-border group-hover:border-gold/20 transition-all">
                  <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">
                    {w.week}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                    {w.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {w.description}
                  </p>
                  <p className="text-gold-light/60 text-sm italic">
                    📖 {w.verse}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
