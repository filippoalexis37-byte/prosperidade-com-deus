import appShowcase from "@/assets/app-showcase.png";

const AppDemoSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative" id="demo">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
          Veja Por Dentro
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-cream mb-8 leading-tight">
          Conheça o <span className="text-gradient-gold">App</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
          Um aplicativo completo para sua jornada espiritual diária, com devocionais, meditações e tudo o que você precisa para uma vida com Deus.
        </p>

        <div className="relative mx-auto max-w-md group">
          {/* Decorative rings */}
          <div className="absolute -inset-8 border border-gold/10 rounded-[3.5rem] group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute -inset-16 border border-gold/5 rounded-[4.5rem] group-hover:scale-110 transition-transform duration-1000" />

          <div className="relative rounded-[3rem] border-8 border-card overflow-hidden shadow-[0_0_50px_-12px_rgba(212,175,55,0.3)] bg-card animate-float">
            <img
              src={appShowcase}
              alt="Prosperidade com Deus - Interface do Aplicativo"
              className="w-full object-contain"
            />
          </div>
          
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-gold/20 blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default AppDemoSection;
