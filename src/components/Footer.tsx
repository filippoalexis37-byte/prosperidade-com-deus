const Footer = () => (
  <footer className="bg-[#060504] border-t border-white/5 py-12 px-6 text-center relative z-10">
    <div className="max-w-6xl mx-auto">
      <div className="font-serif text-2xl font-semibold text-gold mb-4 tracking-wider">
        ✝ <span className="text-cream ml-1">Prosperidade com Deus</span>
      </div>
      <p className="text-white/20 text-xs font-medium tracking-widest uppercase">
        © {new Date().getFullYear()} Todos os direitos reservados. Feito com fé e propósito.
      </p>
    </div>
  </footer>
);

export default Footer;
