import appDemo from "@/assets/app-demo.mp4";

const AppDemoSection = () => {
  return (
    <section className="py-24 px-6 bg-background" id="demo">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
          Veja Por Dentro
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
          Conheça o <span className="text-gradient-gold">App</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12">
          Um aplicativo completo para sua jornada espiritual diária, com devocionais, meditações e muito mais.
        </p>

        <div className="relative mx-auto max-w-sm">
          {/* Phone frame */}
          <div className="relative rounded-[2.5rem] border-4 border-gold/30 overflow-hidden shadow-2xl bg-card">
            <video
              src={appDemo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-[9/16] object-cover"
            />
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gold/5 rounded-[3rem] blur-2xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default AppDemoSection;
