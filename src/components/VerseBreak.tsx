import React from 'react';

interface VerseBreakProps {
  quote: string;
  reference: string;
}

const VerseBreak: React.FC<VerseBreakProps> = ({ quote, reference }) => {
  return (
    <div className="relative py-32 px-6 bg-[linear-gradient(135deg,#100c06,#1c1408,#100c06)] border-y border-white/5 overflow-hidden text-center">
      {/* Background quote mark */}
      <div className="absolute top-0 left-10 font-serif text-[300px] text-gold/5 leading-none pointer-events-none select-none">
        "
      </div>

      <blockquote className="relative z-10 font-serif text-3xl md:text-5xl italic text-cream max-w-4xl mx-auto leading-[1.4] mb-8 font-light">
        {quote.split('<strong>').map((part, i) => {
          if (part.includes('</strong>')) {
            const [bold, rest] = part.split('</strong>');
            return (
              <React.Fragment key={i}>
                <strong className="text-gold font-semibold not-italic">{bold}</strong>
                {rest}
              </React.Fragment>
            );
          }
          return part;
        })}
      </blockquote>

      <cite className="relative z-10 text-xs md:text-sm font-bold tracking-[0.3em] text-gold uppercase not-italic">
        {reference}
      </cite>
    </div>
  );
};

export default VerseBreak;
