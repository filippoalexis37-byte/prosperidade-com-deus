import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-10 py-6 flex items-center justify-between bg-gradient-to-b from-background/95 to-transparent backdrop-blur-[2px]">
      <div className="font-serif text-xl md:text-2xl font-semibold text-gold tracking-wider">
        ✝ <span className="text-cream ml-1">Conexão com Deus</span>
      </div>
      <div className="flex items-center gap-4" />
    </nav>
  );
};

export default Navbar;
