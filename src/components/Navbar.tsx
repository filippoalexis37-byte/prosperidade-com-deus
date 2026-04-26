import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-10 py-6 flex items-center justify-between bg-gradient-to-b from-background/95 to-transparent backdrop-blur-[2px]">
      <div className="font-serif text-xl md:text-2xl font-semibold text-gold tracking-wider">
        ✝ <span className="text-cream ml-1">Conexão com Deus</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="/auth" className="text-cream/70 hover:text-gold text-xs md:text-sm font-bold uppercase tracking-widest transition-colors hidden sm:block">
          Entrar
        </a>
        <a href="https://go.hotmart.com/E98949409P?dp=1">
          <Button className="rounded-full bg-gradient-gold text-primary-foreground font-bold text-xs md:text-sm px-6 shadow-[0_0_20px_rgba(201,169,110,0.3)] hover:scale-105 transition-transform">
            Começar Agora
          </Button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
