import React, { useState } from 'react';

interface DesertPhase {
  id: string;
  cat: string;
  label: string;
  title: string;
  excerpt: string;
  verse: string;
  ref: string;
  readTime: string;
}

const phases: DesertPhase[] = [
  {
    id: 'deserto1',
    cat: 'dificuldade',
    label: '🏜 Fase 01 — Dificuldade',
    title: 'Quando tudo parece estar dando errado ao mesmo tempo',
    excerpt: 'Há momentos em que parece que o céu está de bronze — as orações não sobem, as portas não abrem e os problemas se multiplicam. Esse é o deserto. E Deus está nele com você.',
    verse: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo.',
    ref: 'Salmos 23:4',
    readTime: '4 min'
  },
  {
    id: 'deserto2',
    cat: 'financeiro',
    label: '💸 Fase 02 — Financeiro',
    title: 'Como permanecer fiel quando as finanças desmoronam',
    excerpt: 'Dívidas acumuladas, contas no vermelho e a sensação de que Deus esqueceu de você. Esse ensinamento mostra como os apóstolos atravessaram a escassez com fé ativa.',
    verse: 'O meu Deus suprirá todas as vossas necessidades segundo as suas riquezas em glória em Cristo Jesus.',
    ref: 'Filipenses 4:19',
    readTime: '6 min'
  },
  {
    id: 'deserto3',
    cat: 'emocional',
    label: '💔 Fase 03 — Emocional',
    title: 'Ansiedade, medo e o silêncio que parece abandono',
    excerpt: 'A ansiedade é o deserto emocional do século 21. Quando o coração aperta e a mente grita que não tem saída, há uma verdade bíblica que precisa ser dita com força.',
    verse: 'Não andeis ansiosos de coisa alguma; antes, em tudo, fazei conhecer a Deus os vossos pedidos por meio de oração.',
    ref: 'Filipenses 4:6',
    readTime: '5 min'
  },
  {
    id: 'deserto4',
    cat: 'fe',
    label: '🕊 Fase 04 — Fé Fraca',
    title: 'Quando você duvida se Deus ainda está ouvindo você',
    excerpt: 'João Batista, dentro da prisão, mandou perguntar a Jesus se ele era mesmo o Messias. Até os maiores de fé duvidaram. Você não está sozinho nessa crise.',
    verse: 'Senhor, eu creio! Ajuda-me na minha falta de fé.',
    ref: 'Marcos 9:24',
    readTime: '5 min'
  },
  {
    id: 'deserto5',
    cat: 'familia',
    label: '🏠 Fase 05 — Família',
    title: 'Quando a família é o próprio campo de batalha',
    excerpt: 'Conflitos com cônjuge, filhos distantes de Deus, casamento em crise. O deserto familiar é um dos mais dolorosos. Mas Deus é especialista em restaurar relacionamentos.',
    verse: 'Como eu e a minha casa serviremos ao SENHOR.',
    ref: 'Josué 24:15',
    readTime: '6 min'
  },
  {
    id: 'deserto6',
    cat: 'dificuldade',
    label: '⚔️ Fase 06 — Perseguição',
    title: 'Quando as pessoas ao redor não entendem sua fé',
    excerpt: 'Ser ridicularizado por ter fé, perder amizades por seguir a Deus ou enfrentar preconceito por causa da sua crença — esse é o deserto da incompreensão. E ele tem uma promessa.',
    verse: 'Bem-aventurados os perseguidos por causa da justiça, porque deles é o reino dos céus.',
    ref: 'Mateus 5:10',
    readTime: '4 min'
  }
];

const categories = [
  { id: 'tudo', label: 'Tudo' },
  { id: 'dificuldade', label: 'Dificuldades' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'emocional', label: 'Emocional' },
  { id: 'fe', label: 'Fé Fraca' },
  { id: 'familia', label: 'Família' },
];

interface DesertViewProps {
  onOpenPhase: (id: string) => void;
}

const DesertView: React.FC<DesertViewProps> = ({ onOpenPhase }) => {
  const [activeCat, setActiveCat] = useState('tudo');

  const filteredPhases = phases.filter(p => activeCat === 'tudo' || p.cat === activeCat);

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-350">
      <div className="bg-gradient-to-b from-[#0E0525] via-[#1A0535] to-[#09080A] px-6 pt-14 pb-7 text-center relative overflow-hidden">
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-purpleL/25 blur-[100px] pointer-events-none" />
        
        <span className="text-[52px] mb-4 block animate-[float_4s_ease-in-out_infinite] relative z-10">🏜</span>
        <h1 className="font-serif text-2xl font-bold text-[#F8EED8] mb-2.5 relative z-10 leading-tight">
          O <span className="bg-gradient-to-r from-[#F2D47B] to-[#C9A455] bg-clip-text text-transparent">Deserto</span> também<br />é caminho de Deus
        </h1>
        <p className="text-sm text-[#F8EED8]/50 leading-relaxed max-w-[320px] mx-auto relative z-10">
          O deserto não é abandono — é preparação. Jesus passou 40 dias no deserto antes de iniciar seu ministério. Você também sairá mais forte.
        </p>
      </div>

      <div className="flex gap-2 px-5 pt-4 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`flex-shrink-0 px-[18px] py-2 rounded-full text-xs font-semibold transition-all border ${
              activeCat === cat.id 
                ? 'bg-gradient-to-br from-[#7A5C1E] to-[#C9A455] text-[#09080A] border-transparent' 
                : 'bg-transparent text-[#F8EED8]/50 border-white/[0.15]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="px-5 pt-4 space-y-3">
        {filteredPhases.map((phase) => (
          <div
            key={phase.id}
            onClick={() => onOpenPhase(phase.id)}
            className="bg-[#1A1720]/95 border border-white/[0.15] rounded-[20px] p-[22px_20px] relative overflow-hidden active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#C9A455] to-[#7A5C1E] rounded-l-[3px]" />
            
            <div className="text-[10px] font-bold tracking-[2px] text-gold uppercase mb-2 flex items-center gap-1.5">
              {phase.label}
            </div>
            
            <h3 className="font-serif text-base font-semibold text-[#F8EED8] mb-2 leading-tight">
              {phase.title}
            </h3>
            
            <p className="text-[13px] text-[#F8EED8]/50 leading-relaxed">
              {phase.excerpt}
            </p>
            
            <div className="mt-3.5 pt-3 border-t border-white/[0.15]">
              <div className="font-serif text-sm italic text-[#F8EED8]/70 leading-relaxed mb-1.5">
                "{phase.verse}"
              </div>
              <div className="text-[10px] font-bold tracking-[1.5px] text-gold uppercase">
                {phase.ref}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3.5">
              <span className="text-[11px] text-[#F8EED8]/30">⏱ {phase.readTime} de leitura</span>
              <button className="bg-gold/12 border border-gold/25 rounded-full px-[14px] py-[5px] text-[11px] font-semibold text-gold">
                Ler agora
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesertView;
