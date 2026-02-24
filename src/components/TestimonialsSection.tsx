import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria S.",
    role: "Empresária",
    text: "Esse programa mudou minha forma de enxergar o dinheiro. Aprendi a honrar a Deus com minhas finanças e hoje tenho paz para investir e prosperar!",
    stars: 5,
  },
  {
    name: "Carlos M.",
    role: "Professor",
    text: "Estava endividado e sem esperança. Depois de aplicar os ensinamentos bíblicos do curso, quitei todas as dívidas em 6 meses. Glória a Deus!",
    stars: 5,
  },
  {
    name: "Ana Paula R.",
    role: "Autônoma",
    text: "O devocional diário me mantém firme e motivada. A combinação de fé e educação financeira é poderosa. Recomendo para todos!",
    stars: 5,
  },
  {
    name: "João Pedro L.",
    role: "Engenheiro",
    text: "Nunca pensei que a Bíblia tivesse tantos ensinamentos sobre finanças. O programa abriu meus olhos e transformou minha família inteira.",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-dark relative overflow-hidden">
      {/* Subtle decorative elements */}
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
            Veja o que nossos alunos estão dizendo sobre o programa Prosperidade com Deus.
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
