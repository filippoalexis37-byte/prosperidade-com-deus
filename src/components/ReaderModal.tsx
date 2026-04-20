import React from 'react';
import { X } from 'lucide-react';

interface ReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  title: string;
  verse: string;
  body: string;
  prayer: string;
}

const ReaderModal: React.FC<ReaderModalProps> = ({ isOpen, onClose, label, title, verse, body, prayer }) => {
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[500] flex flex-col bg-black/80 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`mt-auto bg-gradient-to-b from-[#1A1720] to-[#110F14] rounded-t-[24px] border-t border-white/10 p-6 pb-[calc(24px+env(safe-area-inset-bottom,20px))] max-h-[85vh] overflow-y-auto transform transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.15,1)] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="w-9 h-1 bg-white/20 rounded-full mx-auto mb-5" />
        
        <div className="text-[10px] font-bold tracking-[2px] text-gold uppercase mb-4">
          {label}
        </div>
        
        <h2 className="font-serif text-xl md:text-2xl font-bold text-[#F8EED8] mb-1.5 leading-tight">
          {title}
        </h2>
        
        <div className="font-serif text-lg md:text-xl italic text-[#F8EED8] leading-relaxed p-5 bg-gold/5 border-l-3 border-gold rounded-r-xl mb-5">
          {verse}
        </div>
        
        <div 
          className="text-sm md:text-base text-[#F8EED8]/75 leading-relaxed mb-5 space-y-4"
          dangerouslySetInnerHTML={{ __html: body.replace(/\n\n/g, '<br><br>') }}
        />
        
        <div className="bg-gold/5 border border-gold/20 rounded-2xl p-4 font-serif text-sm md:text-base italic text-[#E8D5A8] leading-relaxed">
          <span className="font-serif text-xs font-bold text-gold tracking-widest mb-2 block not-italic uppercase">
            🙏 Oração do Dia
          </span>
          {prayer}
        </div>
      </div>
    </div>
  );
};

export default ReaderModal;
