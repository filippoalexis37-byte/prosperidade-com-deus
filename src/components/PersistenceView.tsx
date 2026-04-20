import React from 'react';

interface PersistencePrinciple {
  id: string;
  num: string;
  icon: string;
  title: string;
  text: string;
  verse: string;
  ref: string;
}

const principles: PersistencePrinciple[] = [
  {
    id: 'persist1',
    num: '01',
    icon: '⚓',
    title: 'Âncora na Tempestade',
    text: 'Quando a vida chacoalha — doença, traição, perda — o crente que tem a Palavra enraizada no coração não é varrido. A âncora não para a tempestade, mas impede que o barco vá às rochas.',
    verse: 'Temos esta esperança como âncora para a alma, firme e segura.',
    ref: 'Hebreus 6:19'
  },
  {
    id: 'persist2',
    num: '02',
    icon: '🦁',
    title: 'Coragem que Vem de Deus',
    text: 'Daniel não entrou na cova dos leões por ser corajoso por natureza — ele entrou porque orava três vezes por dia. A coragem espiritual não é ausência de medo: é presença de Deus.',
    verse: 'Sede fortes e corajosos. Não tenhais medo nem vos assusteis... pois o SENHOR, o vosso Deus, vai com vocês.',
    ref: 'Deuteronômio 31:6'
  },
  {
    id: 'persist3',
    num: '03',
    icon: '🌱',
    title: 'Como Não Desistir Quando Não Vê Resultado',
    text: 'A semente subterrânea não vê o sol, mas continua crescendo. Há um princípio espiritual poderoso: o crescimento acontece antes da evidência. Não desista antes do seu milagre brotar.',
    verse: 'Não nos cansemos de fazer o bem, pois no tempo próprio colheremos, se não desanimarmos.',
    ref: 'Gálatas 6:9'
  },
  {
    id: 'persist4',
    num: '04',
    icon: '🔄',
    title: 'Como Romper Ciclos Que Se Repetem',
    text: 'Se você vive repetindo os mesmos erros — nos relacionamentos, nas finanças, nas emoções — não é fraqueza de caráter. É falta de renovação de mente. E isso muda com um processo, não com esforço.',
    verse: 'Transformai-vos pela renovação de vossa mente, para que possais verificar qual é a boa, agradável e perfeita vontade de Deus.',
    ref: 'Romanos 12:2'
  },
  {
    id: 'persist5',
    num: '05',
    icon: '👣',
    title: 'Andar Sem Ver o Caminho Todo',
    text: 'Abraão saiu sem saber para onde ia. Moisés cruzou o Mar Vermelho sem planta de engenharia. Deus não dá o mapa inteiro — Ele dá a próxima instrução. A fé é dar o próximo passo.',
    verse: 'Pela fé, Abraão obedeceu quando Deus o chamou para ir a um lugar que ele receberia como herança; e saiu sem saber para onde ia.',
    ref: 'Hebreus 11:8'
  },
  {
    id: 'persist6',
    num: '06',
    icon: '💪',
    title: 'Força nos Momentos de Total Exaustão',
    text: 'Elias, após a maior vitória espiritual de sua vida no Monte Carmelo, caiu debaixo de uma árvore e pediu para morrer. O esgotamento espiritual é real. E Deus não o repreendeu — Ele o alimentou.',
    verse: 'Os que esperam no SENHOR renovam as suas forças. Voam alto como águias; correm e não se fatigam; caminham e não se cansam.',
    ref: 'Isaías 40:31'
  }
];

interface PersistenceViewProps {
  onOpenPrinciple: (id: string) => void;
}

const PersistenceView: React.FC<PersistenceViewProps> = ({ onOpenPrinciple }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-350">
      <div className="bg-gradient-to-b from-[#1A0A05] via-[#0E0A05] to-[#09080A] px-6 pt-14 pb-7 text-center relative overflow-hidden">
        <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-gold/15 blur-[80px] pointer-events-none" />
        
        <span className="text-[56px] mb-4 block animate-[pulse_2s_ease-in-out_infinite] relative z-10">🔥</span>
        <h1 className="font-serif text-2xl font-bold text-[#F8EED8] mb-2.5 relative z-10 leading-tight">
          Como permanecer firme<br /><span className="text-gold">em qualquer situação</span>
        </h1>
        <p className="text-sm text-[#F8EED8]/50 leading-relaxed relative z-10">
          A persistência não é teimosa — é de quem conhece Deus o suficiente para saber que Ele não falha.
        </p>
      </div>

      <div className="h-5" />

      <div className="px-5 space-y-3.5 pb-10">
        {principles.map((p) => (
          <div
            key={p.id}
            onClick={() => onOpenPrinciple(p.id)}
            className="bg-[#1A1720]/95 border border-white/[0.15] rounded-[20px] p-[22px_20px] relative overflow-hidden active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="absolute top-3.5 right-[18px] font-serif text-[44px] font-bold text-gold/[0.06] leading-none select-none">
              {p.num}
            </div>
            
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7A5C1E] to-[#C9A455] flex items-center justify-center text-xl mb-3.5 shadow-[0_4px_16px_rgba(201,164,85,0.25)]">
              {p.icon}
            </div>
            
            <h3 className="font-serif text-base font-semibold text-[#F8EED8] mb-2 leading-tight">
              {p.title}
            </h3>
            
            <p className="text-[13px] text-[#F8EED8]/50 leading-relaxed mb-3">
              {p.text}
            </p>
            
            <div className="pt-3 border-t border-white/[0.15]">
              <div className="font-serif text-[13px] italic text-[#F8EED8]/65 leading-relaxed">
                "{p.verse}"
              </div>
              <div className="text-[10px] font-bold tracking-[1.5px] text-gold uppercase mt-1.5">
                {p.ref}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersistenceView;
