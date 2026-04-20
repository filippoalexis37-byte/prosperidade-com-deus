const weeks = [
  {
    week: "Semana 1",
    title: "Silêncio e Entrega",
    description: "Pare de reagir emocionalmente. Comece a orar antes de agir e entregue suas preocupações a Ele.",
    verse: "Salmos 46:10",
  },
  {
    week: "Semana 2",
    title: "Corte de Ambientes",
    description: "Elimine ambientes e hábitos que afastam você de Deus. Santifique sua visão e audição.",
    verse: "Provérbios 4:23",
  },
  {
    week: "Semana 3",
    title: "Fortalecimento da Identidade",
    description: "Você é filho amado. Sem identidade curada, você repete erros e vive em escassez emocional.",
    verse: "Jeremias 18",
  },
  {
    week: "Semana 4",
    title: "Planejamento do Novo Ciclo",
    description: "Defina metas espirituais, corte gastos emocionais e planeje o futuro alinhado ao Reino.",
    verse: "Provérbios 3:9",
  },
];

const PlanSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden" id="plano">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,hsl(40_80%_55%/0.05),transparent_40%)]" />
      
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-20">
          <p className="text-gold font-sans text-sm tracking-[0.4em] uppercase mb-4 font-bold">
            Plano Prático
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
            30 Dias de <span className="text-gradient-gold">Transformação</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Um passo a passo guiado para você restaurar seu altar e prosperar em todas as áreas.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line with gradient */}
          <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-gradient-to-b from-gold/60 via-gold/10 to-transparent hidden md:block rounded-full" />

          <div className="space-y-10">
            {weeks.map((w, i) => (
              <div key={i} className="flex gap-10 group">
                {/* Number Circle */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl border-2 border-gold/30 flex items-center justify-center bg-card group-hover:bg-gradient-gold group-hover:border-transparent transition-all duration-500 shadow-lg group-hover:glow-gold group-hover:scale-110">
                    <span className="text-gold group-hover:text-primary-foreground font-serif font-black text-xl">
                      {i + 1}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-card/40 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-10 border border-white/5 group-hover:border-gold/30 transition-all duration-500 hover:shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-gold-light text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-70">
                        {w.week}
                      </p>
                      <h3 className="font-serif text-3xl font-bold text-foreground">
                        {w.title}
                      </h3>
                    </div>
                    <div className="bg-gold/10 px-4 py-2 rounded-xl border border-gold/20">
                      <p className="text-gold text-sm font-bold italic">
                        📖 {w.verse}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {w.description}
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
