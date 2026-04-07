import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria S.",
    role: "Mãe e Professora",
    text: "O devocional diário me ajudou a criar uma rotina com Deus. Agora começo todos os dias com paz e direção. Minha família inteira sentiu a diferença!",
    stars: 5,
  },
  {
    name: "Carlos M.",
    role: "Empresário",
    text: "Eu lia a Bíblia mas não conseguia entender muitas passagens. Com as reflexões do app, tudo ficou mais claro. Minha fé nunca foi tão forte!",
    stars: 5,
  },
  {
    name: "Ana Paula R.",
    role: "Estudante",
    text: "Os planos espirituais sobre ansiedade me ajudaram em um dos momentos mais difíceis da minha vida. Senti a presença de Deus todos os dias.",
    stars: 5,
  },
  {
    name: "João Pedro L.",
    role: "Pastor",
    text: "Recomendo para toda a minha congregação. O versículo do dia com reflexão é uma ferramenta poderosa para quem quer crescer espiritualmente.",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Depoimentos
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Vidas <span className="text-gradient-gold">Transformadas</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Veja como o app está impactando a vida espiritual de milhares de pessoas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 relative group hover:border-primary/30 transition-colors duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-secondary-foreground leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12">
          {[
            { number: "4.9/5", label: "Avaliação média" },
            { number: "2.800+", label: "Usuários ativos" },
            { number: "98%", label: "Recomendam" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-gradient-gold">{stat.number}</p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
