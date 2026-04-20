import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isDone) return null;

  return (
    <div className={`fixed inset-0 bg-[#09080A] flex flex-col items-center justify-center z-[1000] transition-all duration-700 ${isDone ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'}`}>
      <span className="text-[56px] mb-5 animate-[rotateCross_3s_linear_infinite] select-none text-gold">✝</span>
      <div className="font-serif text-[22px] font-bold bg-gradient-to-br from-[#F2D47B] to-[#C9A455] bg-clip-text text-transparent mb-2">
        Prosperidade com Deus
      </div>
      <div className="text-[13px] text-white/50 tracking-[1px]">Carregando sua jornada...</div>
      <div className="w-[140px] h-[2px] bg-[#231F2E] rounded-[2px] mt-7 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#7A5C1E] to-[#F2D47B] rounded-[2px] w-0 animate-[loadFill_1.8s_ease_forwards_0.3s]"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
