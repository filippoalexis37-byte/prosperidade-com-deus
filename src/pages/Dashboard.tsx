// UPDATED AT: 2026-04-20 22:31:00 - FORCING SYNC
import React, { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useStreak } from "@/hooks/useStreak";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import LoadingScreen from "@/components/LoadingScreen";
import AppBottomNav, { ScreenType } from "@/components/AppBottomNav";
import ReaderModal from "@/components/ReaderModal";
import DesertView from "@/components/DesertView";
import DevotionalsView from "@/components/DevotionalsView";
import PersistenceView from "@/components/PersistenceView";
import SubscriptionView from "@/components/SubscriptionView";

const Dashboard: React.FC = () => {
  const { profile, isApproved, user } = useAuth();
  const { currentStreak } = useStreak();
  const { status, daysLeft } = useSubscription();
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [modalData, setModalData] = useState<any>(null);
  const [stars, setStars] = useState<{ sz: number; left: number; top: number; dur: number; del: number }[]>([]);
  const [dailyDevotional, setDailyDevotional] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase.from("daily_devotionals").select("*").eq("devotional_date", today).single();
      if (data) setDailyDevotional(data);
      setLoading(false);
    };

    if (isApproved && user) {
      fetchData();
    }
  }, [isApproved, user]);

  useEffect(() => {
    const newStars = Array.from({ length: 40 }).map(() => ({
      sz: Math.random() * 1.8 + 0.4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 2 + Math.random() * 3,
      del: Math.random() * 4,
    }));
    setStars(newStars);
  }, []);

  const openModal = (key: string) => {
    if (key === 'daily') {
      if (dailyDevotional) {
        setModalData({
          label: '🌅 Devocional do Dia',
          title: dailyDevotional.title,
          verse: `"${dailyDevotional.verse}" — ${dailyDevotional.verse_reference}`,
          body: dailyDevotional.content,
          prayer: dailyDevotional.comfort_word || 'Senhor, obrigado por este dia e por Tua palavra que me sustenta. Amém.'
        });
      }
      return;
    }

    const content: Record<string, any> = {
      deserto1: {
        label: '🏜 O Deserto — Fase 01',
        title: 'Quando tudo parece estar dando errado ao mesmo tempo',
        verse: '"Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; o teu bordão e o teu cajado me consolam." — Salmos 23:4',
        body: "Há momentos em que parece que o céu está de bronze. As orações sobem e parece que não chegam em lugar nenhum. As portas se fecham, os problemas se multiplicam e a sensação é de que Deus desapareceu.\n\nEsse é o deserto.\n\nMas preste atenção: o deserto na Bíblia nunca é ponto de chegada — é caminho de passagem. O próprio Jesus, antes de iniciar seu ministério público, passou 40 dias no deserto. Paulo passou anos na Arábia depois da conversão. João passou pela Ilha de Patmos.\n\nO deserto não é sinal de que Deus o abandonou. É sinal de que Ele está te preparando para algo que você ainda não consegue carregar.\n\nNo deserto você aprende o que não aprende em nenhum outro lugar: que Deus é suficiente. Não o dinheiro. Não os relacionamentos. Não o reconhecimento. Deus e somente Deus.\n\nQuando Israel estava no deserto, Deus enviou maná todos os dias — só o suficiente para aquele dia. Não dava para guardar para o dia seguinte. Era uma lição forçada de dependência diária.\n\nVocê está no deserto? Então saiba: Deus está com você. Ele não é o arquiteto do seu sofrimento, mas Ele é o Mestre do seu aprendizado dentro dele.",
        prayer: 'Senhor, estou no deserto e minhas forças estão acabando. Mas escolho crer que Tu estás comigo mesmo quando não consigo Te sentir. Renova minhas forças, Pai. Que este tempo difícil me aproxime de Ti e não me afaste. Em nome de Jesus, amém.'
      },
      dev1: {
        label: '📖 Devocional — Dia 1',
        title: 'Quando tudo começa no silêncio',
        verse: '"Depois do fogo, uma voz mansa e delicada. E, quando Elias a ouviu, cobriu o rosto com o seu manto." — 1 Reis 19:12-13',
        body: "Elias estava esgotado depois de uma das maiores vitórias espirituais da história. Havia desafiado 450 profetas de Baal sozinho — e ganhou. Fogo desceu do céu. Israel se ajoelhou.\n\nE então ele fugiu, com medo de uma mulher.\n\nNo deserto, pediu para morrer. E Deus não apareceu em vento poderoso, terremoto ou fogo — apareceu na voz suave e delicada.\n\nO silêncio é a linguagem de Deus para almas esgotadas.\n\nEm um mundo de notificações, reuniões, demandas e barulho constante, aprender a ouvir a voz suave de Deus é o maior treinamento espiritual que existe.\n\nHoje, antes de qualquer coisa, faça silêncio. Não para rezar uma oração bonita. Apenas para ouvir.",
        prayer: 'Senhor, eu quero ouvir Tua voz hoje. Silencio minha mente agitada e me disponho a ouvir o que Tu tens para mim. Fala, Senhor, que teu servo ouve. Amém.'
      },
      meditacao: {
        label: '🕊 Meditação Guiada',
        title: 'Silêncio e Presença de Deus',
        verse: '"Aquietai-vos e sabei que eu sou Deus." — Salmos 46:10',
        body: "Feche os olhos por um momento.\n\nRespire fundo pelo nariz... segure... e solte lentamente pela boca.\n\nDeixe o peso do dia cair dos seus ombros. Não há nada que você precise resolver agora mesmo. Não há decisão urgente que não possa esperar 5 minutos.\n\nApenas esteja aqui, diante de Deus.\n\nEle não precisa da sua performance. Não precisa das suas palavras elaboradas. Não precisa da sua liturgia perfeita.\n\nEle quer você — exatamente como você está agora.\n\nCom o cansaço. Com as dúvidas. Com as perguntas sem resposta.\n\nDiga simplesmente: \"Pai, estou aqui.\" E fique em silêncio por alguns minutos. Deixe-O falar ao coração.",
        prayer: 'Pai, aquieto meu coração diante de Ti. Não tenho palavras elaboradas hoje — só tenho a minha presença. Recebo a Tua. Que este momento de silêncio seja mais poderoso do que horas de atividade religiosa. Em Cristo, amém.'
      }
    };
    
    setModalData(content[key] || content['dev1']);
  };

  const renderHome = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-350">
      <div className="bg-[linear-gradient(180deg,#1a0d3a_0%,#0d0a18_60%,#09080A_100%)] px-6 pt-14 pb-8 relative overflow-hidden">
        <div className="stars absolute inset-0 pointer-events-none">
          {stars.map((s, i) => (
            <div
              key={i}
              className="star absolute rounded-full bg-gold animate-[twinkle_linear_infinite]"
              style={{
                width: s.sz,
                height: s.sz,
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.del}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-gold/18 blur-[100px] pointer-events-none" />
        
        <span className="text-[13px] font-medium text-[#F8EED8]/50 tracking-[1px] uppercase relative z-10 block mb-1">
          Bom dia, {profile?.full_name?.split(' ')[0] || 'Fiel'}
        </span>
        <h1 className="font-serif text-[26px] font-bold text-[#F8EED8] leading-[1.2] relative z-10 mb-1.5">
          Sua Jornada com<br />
          <span className="bg-gradient-to-br from-[#F2D47B] to-[#C9A455] bg-clip-text text-transparent">Deus começa aqui</span>
        </h1>
        <p className="text-[12px] text-[#F8EED8]/50 relative z-10 mb-5">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div className="bg-white/6 backdrop-blur-[10px] border border-gold/25 rounded-[20px] p-5 relative z-10 mb-1 cursor-pointer active:scale-[0.98] transition-transform" onClick={() => openModal('daily')}>
          <div className="text-[10px] font-semibold tracking-[2px] text-gold uppercase mb-2.5 flex items-center gap-1.5">
            🌅 {dailyDevotional ? 'Versículo do Dia' : 'Carregando...'}
          </div>
          <p className="font-serif text-[17px] italic text-[#F8EED8] leading-[1.6] mb-2.5">
            {dailyDevotional ? `"${dailyDevotional.verse}"` : '"Aproximai-vos de Deus e Ele se aproximará de vós."'}
          </p>
          <p className="text-[11px] font-semibold text-gold tracking-[1px]">
            — {dailyDevotional ? dailyDevotional.verse_reference : 'Tiago 4:8'}
          </p>
        </div>
      </div>

      <div className="flex gap-1.5 px-5 pt-4">
        {[1, 2, 3, 4, 5, 6, 7].map((d) => (
          <div 
            key={d} 
            className={`flex-1 h-[5px] rounded-[3px] ${d < 5 ? 'bg-gradient-to-r from-[#7A5C1E] to-[#C9A455]' : d === 5 ? 'bg-gradient-to-r from-[#C9A455] to-[#F2D47B] shadow-[0_0_8px_rgba(201,164,85,0.5)]' : 'bg-[#231F2E]'}`} 
          />
        ))}
      </div>

      <div className="px-5 pt-4 flex items-center gap-4">
        <div className="relative w-[70px] h-[70px] flex-shrink-0">
          <svg width="70" height="70" viewBox="0 0 70 70" className="rotate-[-90deg]">
            <circle cx="35" cy="35" r="30" fill="none" stroke="#231F2E" strokeWidth="5" />
            <circle 
              cx="35" cy="35" r="30" fill="none" 
              stroke="url(#goldGrad)" strokeWidth="5" strokeLinecap="round" 
              strokeDasharray="188" strokeDashoffset={188 - (188 * (currentStreak / 30))} 
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F2D47B" />
                <stop offset="100%" stopColor="#7A5C1E" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-serif text-base font-bold bg-gradient-to-br from-[#F2D47B] to-[#C9A455] bg-clip-text text-transparent leading-none">
              {currentStreak}
            </div>
            <div className="text-[8px] text-[#F8EED8]/50 tracking-[1px]">dias</div>
          </div>
        </div>
        <div className="text-left">
          <h3 className="font-serif text-sm font-semibold text-[#F8EED8] mb-1">Sequência Atual 🔥</h3>
          <p className="text-xs text-[#F8EED8]/50 leading-relaxed">Você está no {currentStreak}° dia consecutivo. Continue firme — Deus vê cada esforço seu.</p>
        </div>
      </div>

      <div className="px-5 pt-6 pb-3 flex items-center justify-between">
        <h2 className="font-serif text-base font-semibold text-[#F8EED8]">Acesso Rápido</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5">
        <div className="bg-[#1A1720]/95 border border-white/[0.15] rounded-[18px] p-[18px_16px] cursor-pointer active:scale-[0.96] transition-all relative overflow-hidden" onClick={() => setActiveScreen('desert')}>
          <div className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full bg-gold/10 blur-[20px] pointer-events-none" />
          <span className="text-[28px] mb-2.5 block">🏜</span>
          <div className="font-serif text-[13px] font-semibold text-[#F8EED8] mb-1">O Deserto</div>
          <div className="text-[11px] text-[#F8EED8]/50 leading-relaxed">Supere as fases difíceis da vida</div>
        </div>
        <div className="bg-[#1A1720]/95 border border-white/[0.15] rounded-[18px] p-[18px_16px] cursor-pointer active:scale-[0.96] transition-all relative overflow-hidden" onClick={() => setActiveScreen('devocionais')}>
          <div className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full bg-gold/10 blur-[20px] pointer-events-none" />
          <span className="text-[28px] mb-2.5 block">📖</span>
          <div className="font-serif text-[13px] font-semibold text-[#F8EED8] mb-1">Devocionais</div>
          <div className="text-[11px] text-[#F8EED8]/50 leading-relaxed">365 palavras transformadoras</div>
        </div>
        <div className="bg-[#1A1720]/95 border border-white/[0.15] rounded-[18px] p-[18px_16px] cursor-pointer active:scale-[0.96] transition-all relative overflow-hidden" onClick={() => setActiveScreen('persistencia')}>
          <div className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full bg-gold/10 blur-[20px] pointer-events-none" />
          <span className="text-[28px] mb-2.5 block">🔥</span>
          <div className="font-serif text-[13px] font-semibold text-[#F8EED8] mb-1">Persistência</div>
          <div className="text-[11px] text-[#F8EED8]/50 leading-relaxed">Mantenha-se firme em qualquer situação</div>
        </div>
        <div className="bg-[#1A1720]/95 border border-white/[0.15] rounded-[18px] p-[18px_16px] cursor-pointer active:scale-[0.96] transition-all relative overflow-hidden" onClick={() => openModal('meditacao')}>
          <div className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full bg-gold/10 blur-[20px] pointer-events-none" />
          <span className="text-[28px] mb-2.5 block">🕊</span>
          <div className="font-serif text-[13px] font-semibold text-[#F8EED8] mb-1">Meditação</div>
          <div className="text-[11px] text-[#F8EED8]/50 leading-relaxed">Silêncio e presença de Deus</div>
        </div>
      </div>

      <div className="mx-5 mt-4 bg-gradient-to-br from-[#1C0A3A] to-[#0E0A22] border border-purpleL/40 rounded-[18px] p-[18px_20px] flex items-center gap-3.5 cursor-pointer active:scale-[0.98] transition-all" onClick={() => setActiveScreen('desert')}>
        <span className="text-[36px] flex-shrink-0">🏜</span>
        <div className="text-left">
          <h3 className="font-serif text-[14px] font-semibold text-[#F8EED8] mb-1">Você está no deserto?</h3>
          <p className="text-[12px] text-[#F8EED8]/50 leading-relaxed">Mensagens especiais para quem está passando por tempo difícil</p>
        </div>
        <span className="ml-auto text-purpleL text-lg">›</span>
      </div>
      <div className="h-10" />
    </div>
  );

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home': return renderHome();
      case 'desert': return <DesertView onOpenPhase={(id) => openModal(id)} />;
      case 'devocionais': return <DevotionalsView currentStreak={currentStreak} onOpenDevotion={(id) => openModal(id)} />;
      case 'persistencia': return <PersistenceView onOpenPrinciple={(id) => openModal(id)} />;
      case 'plano': return <SubscriptionView status={status} daysLeft={daysLeft} />;
      default: return renderHome();
    }
  };

  if (!isApproved) {
    return (
      <div className="min-h-screen bg-[#09080A] flex flex-col items-center justify-center text-center px-4 font-sans text-[#F8EED8]">
        <div className="text-6xl mb-6">⏳</div>
        <h2 className="font-serif text-2xl font-bold mb-4">Aguardando Aprovação</h2>
        <p className="text-[#F8EED8]/50 max-w-md">
          Seu cadastro foi recebido com sucesso! O administrador precisa aprovar seu acesso. Você receberá uma notificação em breve.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09080A] max-w-[430px] mx-auto relative overflow-hidden font-sans text-[#F8EED8]">
      <LoadingScreen />
      
      <main className="h-full overflow-y-auto pb-[calc(80px+env(safe-area-inset-bottom,20px))] scrollbar-none">
        {renderActiveScreen()}
      </main>

      <AppBottomNav activeScreen={activeScreen} onScreenChange={setActiveScreen} />

      <ReaderModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        {...(modalData || {})}
      />
    </div>
  );
};

export default Dashboard;
