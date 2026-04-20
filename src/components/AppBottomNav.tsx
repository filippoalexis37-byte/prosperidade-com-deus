import React from 'react';

export type ScreenType = 'home' | 'desert' | 'devocionais' | 'persistencia' | 'plano';

interface AppBottomNavProps {
  activeScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

const navItems: { screen: ScreenType; icon: string; label: string }[] = [
  { screen: 'home', icon: '🏠', label: 'Início' },
  { screen: 'desert', icon: '🏜', label: 'Deserto' },
  { screen: 'devocionais', icon: '📖', label: 'Devocionais' },
  { screen: 'persistencia', icon: '🔥', label: 'Persistência' },
  { screen: 'plano', icon: '✦', label: 'Plano' },
];

const AppBottomNav: React.FC<AppBottomNavProps> = ({ activeScreen, onScreenChange }) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[200] bg-[#09080A]/96 backdrop-blur-[20px] border-t border-white/[0.15] flex px-2 pb-[calc(10px+env(safe-area-inset-bottom,20px))] pt-2">
      {navItems.map((item) => (
        <button
          key={item.screen}
          onClick={() => onScreenChange(item.screen)}
          className={`flex-1 flex flex-col items-center gap-1 py-1.5 transition-all duration-200 border-none bg-transparent ${activeScreen === item.screen ? 'active' : ''}`}
        >
          <span className={`text-[22px] leading-none transition-transform duration-200 ${activeScreen === item.screen ? 'scale-118' : ''}`}>
            {item.icon}
          </span>
          <span className={`text-[10px] font-medium tracking-[0.5px] transition-colors duration-200 ${activeScreen === item.screen ? 'text-gold' : 'text-[#F8EED8]/35'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default AppBottomNav;
