import { Heart, CloudRain, Compass, Brain, Flame, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const feelings = [
  { icon: Brain, label: "Ansiedade", desc: "Mente acelerada que não desliga" },
  { icon: CloudRain, label: "Vazio", desc: "Sensação de que falta algo" },
  { icon: Flame, label: "Medo", desc: "Insegurança sobre o futuro" },
  { icon: Compass, label: "Falta de direção", desc: "Não sabe qual o próximo passo" },
  { icon: Sparkles, label: "Mente cansada", desc: "Esgotamento emocional constante" },
  { icon: Heart, label: "Distância de Deus", desc: "Fé enfraquecida no dia a dia" },
];

const EmotionalSection = () => {
  return (
    <section className="relative py-24 px-6 bg-background overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4">
            ✦ Você não está sozinho ✦
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-cream leading-tight">
            Talvez você esteja <br />
            <strong className="font-bold bg-gradient-gold bg-clip-text text-transparent">passando por isso…</strong>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {feelings.map((f, i) => (
            <div
              key={i}
              className="group relative bg-card/40 backdrop-blur-sm border border-gold/10 rounded-3xl p-7 hover:border-gold/40 hover:bg-card/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(240,208,128,0.25)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <f.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-2xl text-cream font-semibold mb-2">{f.label}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="font-serif text-2xl md:text-4xl text-cream font-light italic leading-snug mb-8">
            "Você não precisa enfrentar tudo isso <strong className="font-bold not-italic text-gold">sozinho.</strong>"
          </p>
          <Link to="/auth">
            <Button size="lg" className="h-14 px-10 rounded-full bg-gradient-gold text-primary-foreground font-bold shadow-[0_0_40px_rgba(240,208,128,0.4)] hover:scale-105 transition-all">
              Encontrar Minha Direção
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmotionalSection;
