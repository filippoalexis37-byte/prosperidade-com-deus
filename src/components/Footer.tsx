const Footer = () => (
  <footer className="py-12 px-6 border-t border-border bg-background">
    <div className="max-w-6xl mx-auto text-center">
      <p className="font-serif text-xl text-gradient-gold font-bold mb-2">
        Prosperidade com Deus
      </p>
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
