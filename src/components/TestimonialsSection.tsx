import React from 'react';

const testimonials = [
  {
    name: "Maria S.",
    role: "Empresária, SP",
    text: "Esse programa me ensinou que fé não é passividade — é ação com Deus. Hoje tenho paz para tomar decisões financeiras que antes me paralisavam de medo.",
    stars: 5,
    initial: "M"
  },
  {
    name: "Carlos M.",
    role: "Professor, MG",
    text: "Eu vivia em dívidas e achava que não merecia prosperidade. Depois da semana 3, entendi minha identidade em Cristo. Em 6 meses, quitei tudo.",
    stars: 5,
    initial: "C"
  },
  {
    name: "Ana Paula R.",
    role: "Autônoma, RJ",
    text: "O devocional diário mudou minha manhã inteira. Comecei o dia com Deus e minha produtividade, meu casamento e minha saúde melhoraram juntos.",
    stars: 5,
    initial: "A"
  },
  {
    name: "João Pedro L.",
    role: "Engenheiro, RS",
    text: "Nunca imaginei que a Bíblia falava tanto sobre finanças. Aprendi a honrar a Deus com o dízimo e as portas de oportunidades simplesmente se abriram.",
    stars: 5,
    initial: "J"
  },
  {
    name: "Patricia O.",
    role: "Enfermeira, BA",
    text: "Estava no deserto espiritual há 3 anos. O programa me mostrou que o deserto é passagem, não destino. Hoje minha fé está mais firme do que nunca.",
    stars: 5,
    initial: "P"
  },
  {
    name: "Roberto A.",
    role: "Comerciante, CE",
    text: "Apliquei os princípios da semana 4 no meu negócio. Coloquei Deus no centro, cortei o que não tinha propósito e faturei 40% mais no trimestre seguinte.",
    stars: 5,
    initial: "R"
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Depoimentos
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-cream text-center mb-6 leading-tight">
          Vidas que já foram <strong className="text-gold font-bold">Transformadas</strong>
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-20 leading-relaxed">
          Essas histórias reais mostram o que acontece quando você coloca Deus verdadeiramente no centro da sua vida.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative bg-card/40 border border-white/5 rounded-3xl p-10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute top-6 right-8 font-serif text-6xl text-gold/5 group-hover:text-gold/10 transition-colors">
                "
              </div>

              <div className="flex gap-1 text-gold text-xs mb-6">
                {"★".repeat(t.stars)}
              </div>

              <p className="font-serif text-lg italic text-cream/90 leading-relaxed mb-8">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center font-serif text-xl font-bold text-primary-foreground shadow-lg">
                  {t.initial}
                </div>
                <div>
                  <div className="font-bold text-cream text-sm">{t.name}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
