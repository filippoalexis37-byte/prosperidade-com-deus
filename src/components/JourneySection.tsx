import React from 'react';

const steps = [
  {
    week: "Semana 1 — Fundação",
    title: "Silêncio, Entrega e Oração",
    text: "Pare de reagir emocionalmente. Aprenda a orar antes de agir. O silêncio com Deus é onde tudo começa — é onde sua vida começa a mudar de fora para dentro.",
    ref: "📖 Salmos 46:10 · Mateus 6:6",
  },
  {
    week: "Semana 2 — Limpeza",
    title: "Corte o Que Te Afasta de Deus",
    text: "Elimine ambientes, hábitos e relações que drenam sua fé. Não é moralismo — é estratégia espiritual. O que você alimenta, cresce. Alimente sua alma.",
    ref: "📖 Provérbios 4:23 · Romanos 12:2",
  },
  {
    week: "Semana 3 — Cura",
    title: "Sua Identidade Curada em Cristo",
    text: "Você é filho de Deus — não seus traumas, seus erros ou seu passado. Sem identidade restaurada, você repete os mesmos ciclos. Aqui, isso muda.",
    ref: "📖 Jeremias 18 · 2 Coríntios 5:17",
  },
  {
    week: "Semana 4 — Novo Ciclo",
    title: "Prosperidade, Propósito e Planejamento",
    text: "Defina metas com Deus no centro. Honre a Ele com suas finanças, corte gastos que não têm fruto e planeje o futuro que Ele já preparou para você.",
    ref: "📖 Provérbios 3:9 · Mateus 6:33",
  },
];

const JourneySection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
          O programa
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-cream text-center mb-6 leading-tight">
          30 Dias para uma <strong className="text-gold font-bold">Nova Vida</strong>
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-20 leading-relaxed">
          Um plano prático, semana a semana, para restaurar sua conexão com Deus e transformar sua realidade.
        </p>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6 md:gap-10 group relative">
              {/* Vertical line */}
              {i !== steps.length - 1 && (
                <div className="absolute left-[23px] top-14 bottom-0 w-0.5 bg-gradient-to-b from-gold/50 to-transparent hidden md:block" />
              )}

              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center font-serif text-xl font-bold text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
              </div>

              <div className="flex-1 bg-card/30 border border-white/5 rounded-3xl p-6 md:p-10 hover:border-gold/30 transition-all duration-300">
                <div className="text-[10px] font-bold text-gold uppercase tracking-widest mb-2">
                  {step.week}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-cream mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  {step.text}
                </p>
                <div className="text-[11px] font-bold text-gold/60 tracking-widest">
                  {step.ref}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
