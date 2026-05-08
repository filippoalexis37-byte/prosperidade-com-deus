import appShowcase from "@/assets/app-showcase.png";
import { BookOpen, HandHeart, Sparkles, Headphones, Sun } from "lucide-react";

const features = [
  { icon: Sun, label: "Versículo do dia" },
  { icon: HandHeart, label: "Oração guiada" },
  { icon: Sparkles, label: "Reflexão diária" },
  { icon: Headphones, label: "Áudios devocionais" },
  { icon: BookOpen, label: "Devocional completo" },
];

const AppDemoSection = () => {
  return (
    <section className="relative py-28 px-6 bg-background overflow-hidden" id="demo">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-gold/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
            ✦ Veja por dentro ✦
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-cream mb-6 leading-tight">
            Tudo o que você precisa <br />
            <strong className="font-bold bg-gradient-gold bg-clip-text text-transparent">na palma da sua mão</strong>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Um aplicativo pensado para acalmar sua mente e fortalecer sua fé todos os dias.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Phone mockup */}
          <div className="relative mx-auto group max-w-sm">
            <div className="absolute -inset-6 border border-gold/10 rounded-[3.5rem] group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute -inset-12 border border-gold/5 rounded-[4.5rem] group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent blur-3xl scale-90" />

            {/* Phone frame */}
            <div className="relative rounded-[2.8rem] p-[10px] bg-gradient-to-b from-gold/30 via-card to-card shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),0_0_60px_-15px_rgba(240,208,128,0.4)]">
              <div className="rounded-[2.3rem] overflow-hidden bg-card animate-float">
                <div className="relative">
                  <img
                    src={appShowcase}
                    alt="App Prosperidade com Deus — Devocionais e Oração"
                    className="w-full object-contain"
                  />
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full" />
            </div>

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-gold/30 blur-3xl -z-10" />
          </div>

          {/* Feature list */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="group flex items-center gap-5 bg-card/40 backdrop-blur-sm border border-gold/10 rounded-2xl p-5 hover:border-gold/40 hover:bg-card/60 hover:translate-x-2 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(240,208,128,0.5)] group-hover:scale-110 transition-transform">
                  <f.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif text-xl text-cream font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDemoSection;
