import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-dark relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-6">
          Comece Sua Jornada
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
          A verdadeira prosperidade começa na{" "}
          <span className="text-gradient-gold">paz</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-4 leading-relaxed">
          Quando você coloca Deus no centro, você não repete erros, não vive
          carente e não negocia seus valores.
        </p>
        <blockquote className="text-gold-light/70 italic text-base mb-12">
          "Buscai primeiro o Reino de Deus e a sua justiça, e todas essas coisas
          vos serão acrescentadas." — Mateus 6:33
        </blockquote>

        <Button variant="hero" size="lg" className="text-lg px-12 py-7">
          Quero Transformar Minha Vida
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
