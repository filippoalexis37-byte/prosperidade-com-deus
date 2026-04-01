import appShowcase from "@/assets/app-showcase.jpg";

const AppDemoSection = () => {
  return (
    <section className="py-24 px-6 bg-background" id="demo">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
          Conheça o App
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
          Um aplicativo completo para sua <span className="text-gradient-gold">jornada espiritual</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12">
          Prosperidade com Deus é um aplicativo criado para ajudar você a desenvolver uma vida espiritual forte através de devocionais, versículos diários e planos guiados.
        </p>

        <div className="relative mx-auto max-w-sm">
          <div className="relative rounded-[2.5rem] border-4 border-gold/30 overflow-hidden shadow-2xl bg-card">
            <img
              src={appShowcase}
              alt="Prosperidade com Deus - Aplicativo cristão com devocionais diários, versículo do dia e planos espirituais"
              className="w-full aspect-[9/16] object-cover"
            />
          </div>
          <div className="absolute -inset-4 bg-gold/5 rounded-[3rem] blur-2xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default AppDemoSection;
