import React from 'react';

interface Devotion {
  id: string;
  day: number;
  title: string;
  excerpt: string;
  verse: string;
  status: 'done' | 'todo' | 'locked';
}

const devotionData: Devotion[] = [
  {
    id: 'dev1',
    day: 1,
    title: 'Quando tudo começa no silêncio',
    excerpt: 'Antes de Deus falar ao profeta Elias, veio um grande vento, depois um terremoto, depois fogo — mas Deus não estava em nada disso. Ele estava na voz suave e delicada.',
    verse: '1 Reis 19:12',
    status: 'done'
  },
  {
    id: 'dev2',
    day: 2,
    title: 'Sua identidade não é seus erros',
    excerpt: 'Pedro negou Jesus três vezes. Paulo perseguiu cristãos. Davi pecou gravemente. E ainda assim, Deus os usou de forma extraordinária.',
    verse: '2 Coríntios 5:17',
    status: 'done'
  },
  {
    id: 'dev3',
    day: 3,
    title: 'Ore antes de agir — sempre',
    excerpt: 'Neemias recebeu uma notícia devastadora. Antes de responder ao rei, "fiz uma oração ao Deus dos céus". Segundos de oração podem mudar anos de consequências.',
    verse: 'Neemias 2:4',
    status: 'done'
  },
  {
    id: 'dev4',
    day: 4,
    title: 'O fruto demora, mas vem',
    excerpt: 'O agricultor que planta não vê o resultado no mesmo dia. Ele rega, cuida e espera. Assim é a vida com Deus — suas orações e obediência hoje darão fruto no tempo certo.',
    verse: 'Gálatas 6:9',
    status: 'done'
  },
  {
    id: 'dev5',
    day: 5,
    title: 'Como não repetir os erros do passado',
    excerpt: 'Israel saiu do Egito mas o Egito não saiu de Israel — eles voltavam ao mesmo ciclo. Para não repetir erros, precisamos de renovação de mente.',
    verse: 'Romanos 12:2',
    status: 'todo'
  },
  {
    id: 'dev6',
    day: 6,
    title: 'A prosperidade começa na mente',
    excerpt: 'Antes de Deus mudar sua situação financeira, Ele precisa mudar sua mentalidade. A pobreza de mentalidade é mais devastadora do que a pobreza de dinheiro.',
    verse: 'Provérbios 23:7',
    status: 'locked'
  }
];

interface DevotionalsViewProps {
  currentStreak: number;
  onOpenDevotion: (id: string) => void;
}

const DevotionalsView: React.FC<DevotionalsViewProps> = ({ currentStreak, onOpenDevotion }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-350">
      <div className="bg-gradient-to-b from-[#0A1A0A] to-[#09080A] px-6 pt-14 pb-6 relative overflow-hidden">
        <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-gold/12 blur-[100px] pointer-events-none" />
        
        <h1 className="font-serif text-[22px] font-bold text-[#F8EED8] mb-1.5 relative z-10">365 Devocionais</h1>
        <p className="text-[13px] text-[#F8EED8]/50 relative z-10">Uma palavra de Deus para cada dia do ano</p>
        
        <div className="flex items-center gap-2.5 bg-gold/8 border border-gold/20 rounded-xl p-3 mt-4 relative z-10">
          <span className="text-[20px]">🔥</span>
          <div className="text-left">
            <strong className="text-sm font-bold text-gold">{currentStreak} dias consecutivos</strong>
            <span className="text-[11px] text-[#F8EED8]/50 block">Continue! Sua fé está crescendo.</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-2 text-[11px] font-bold tracking-[2px] text-gold uppercase">
        Esta semana — Semana 1
      </div>

      <div className="px-5 space-y-3 pb-10">
        {devotionData.map((dev) => (
          <div
            key={dev.id}
            onClick={() => dev.status !== 'locked' && onOpenDevotion(dev.id)}
            className={`bg-[#1A1720]/95 border border-white/[0.15] rounded-[20px] overflow-hidden transition-all duration-250 active:scale-[0.98] cursor-pointer ${dev.status === 'locked' ? 'opacity-60 grayscale cursor-not-allowed' : ''}`}
          >
            <div className="p-4.5 md:p-5">
              <div className={`inline-flex items-center gap-1.5 bg-gradient-to-br from-[#7A5C1E] to-[#C9A455] rounded-full px-3 py-1 text-[10px] font-extrabold text-[#09080A] tracking-[1px] uppercase mb-3 ${dev.status === 'done' ? 'opacity-80' : ''}`}>
                {dev.status === 'done' ? '✓' : dev.status === 'todo' ? '📅' : '🔒'} Dia {dev.day} {dev.day === 5 ? '— Hoje' : ''}
              </div>
              
              <h3 className="font-serif text-base font-semibold text-[#F8EED8] mb-2 leading-tight">
                {dev.title}
              </h3>
              
              <p className="text-[13px] text-[#F8EED8]/50 leading-relaxed line-clamp-3">
                {dev.excerpt}
              </p>
            </div>
            
            <div className="px-5 py-3 bg-white/[0.03] border-t border-white/[0.15] flex items-center justify-between">
              <span className="font-serif text-[13px] italic text-gold">📖 {dev.verse}</span>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${dev.status === 'done' ? 'bg-gradient-to-br from-[#1a5c1a] to-[#2d8c2d] text-[#7de87d]' : 'bg-[#231F2E] text-[#F8EED8]/50'}`}>
                {dev.status === 'done' ? '✓' : dev.status === 'todo' ? '›' : '🔒'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevotionalsView;
