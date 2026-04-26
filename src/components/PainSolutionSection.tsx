import { Button } from "@/components/ui/button";
import { UserX, RefreshCw, AlertCircle, TrendingDown, CheckCircle2, ShieldCheck, Heart, Landmark, ArrowRight } from "lucide-react";

const pains = [
  { icon: UserX, text: "Sente que perdeu sua identidade e propósito original" },
  { icon: RefreshCw, text: "Repete os mesmos erros que travam sua vida financeira" },
  { icon: AlertCircle, text: "Vive em um ciclo de escassez e cansaço emocional" },
  { icon: TrendingDown, text: "Sente que sua fé não tem gerado frutos práticos" },
];

const solutions = [
  { icon: Heart, text: "Restauração da Identidade como Filho", highlight: "Cure suas raízes" },
  { icon: ShieldCheck, text: "Blindagem Emocional e Espiritual", highlight: "Paz inabalável" },
  { icon: Landmark, text: "Princípios Bíblicos de Prosperidade", highlight: "Reino em primeiro lugar" },
  { icon: CheckCircle2, text: "Direção Clara para Novos Ciclos", highlight: "Chega de repetir erros" },
];

const PainSolutionSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="max-w-5xl mx-auto">
        {/* Pain */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
            Por que você sente que <span className="text-gradient-gold">algo está travado?</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Muitas vezes, a falta de prosperidade não é por falta de esforço, mas por raízes que ainda não foram curadas na sua identidade.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {pains.map((item, i) => (
            <div key={i} className="flex items-start gap-5 bg-destructive/5 border border-destructive/10 rounded-2xl p-6 hover:bg-destructive/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-destructive" />
              </div>
              <p className="text-foreground/80 text-lg leading-relaxed font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gold/5 border border-gold/20 rounded-3xl p-1 md:p-2 mb-24 max-w-2xl mx-auto">
          <p className="text-center text-gold font-medium py-3 px-6 italic text-sm">
            "Sem uma identidade curada, você está condenado a repetir os erros do passado."
          </p>
        </div>

        {/* Solution */}
        <div className="text-center mb-16">
          <p className="text-gold font-sans text-sm tracking-[0.4em] uppercase mb-4 font-bold">
            O Caminho da Restauração
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-8">
            Coloque Deus no <span className="text-gradient-gold">Centro de Tudo</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-10">
            O Prosperidade com Deus é o guia prático para você alinhar sua vida espiritual, emocional e financeira com o Reino.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {solutions.map((item, i) => (
            <div key={i} className="flex items-start gap-6 bg-card border border-gold/10 rounded-2xl p-8 hover:border-gold/40 hover:glow-gold transition-all duration-500 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-foreground text-xl font-bold mb-2">{item.text}</h3>
                <span className="text-gold-light text-sm font-semibold bg-gold/10 px-3 py-1 rounded-full">{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="https://go.hotmart.com/E98949409P?dp=1">
            <Button variant="hero" size="lg" className="text-xl px-12 py-8 group bg-gradient-gold shadow-gold">
              Quero Minha Transformação
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PainSolutionSection;
