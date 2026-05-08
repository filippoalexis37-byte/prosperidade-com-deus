import { Wind, Eye, Target, Shield, HandHeart } from "lucide-react";

const benefits = [
  { icon: Wind, title: "Mais paz", desc: "Acalme sua mente com oração e palavra diária." },
  { icon: Eye, title: "Mais clareza", desc: "Veja a próxima decisão com olhos de Deus." },
  { icon: Target, title: "Mais propósito", desc: "Descubra o chamado que move sua vida." },
  { icon: Shield, title: "Mais força emocional", desc: "Resista aos dias difíceis com fé firme." },
  { icon: HandHeart, title: "Mais proximidade com Deus", desc: "Sinta a presença d'Ele todos os dias." },
];

const TransformationSection = () => {
  return (
    <section className="relative py-28 px-6 bg-[linear-gradient(180deg,#0a0705,#0f0b08,#0a0705)] overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(240,200,120,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(120,90,200,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4">
            ✦ Sua transformação começa aqui ✦
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-cream leading-tight">
            Como sua vida pode <br />
            <strong className="font-bold bg-gradient-gold bg-clip-text text-transparent">começar a mudar</strong>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group relative overflow-hidden bg-gradient-to-br from-card/80 to-card/30 backdrop-blur-md border border-gold/15 rounded-3xl p-8 hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(240,208,128,0.3)]"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/15 transition-all duration-700" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6 shadow-[0_10px_30px_-10px_rgba(240,208,128,0.5)] group-hover:scale-110 transition-transform duration-500">
                  <b.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-cream font-bold mb-3">{b.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
