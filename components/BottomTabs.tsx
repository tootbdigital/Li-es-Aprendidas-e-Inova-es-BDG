
import React from 'react';
import { ViewMode } from '../types';
import { COLORS } from '../constants';

interface BottomTabsProps {
  currentMode: ViewMode;
  onNavigate: (mode: ViewMode) => void;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({ currentMode, onNavigate }) => {
  const tabs = [
    { id: 'home', label: 'Início', icon: '🏠' },
    { id: 'innovation_list', label: 'Inova', icon: '💡' },
    { id: 'lesson_list', label: 'Lições Aprendidas', icon: '📸' },
    { id: 'search', label: 'Busca', icon: '🔍' },
    { id: 'profile', label: 'Performance', icon: '📊' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-20 px-2 pb-2 shadow-2xl z-50">
      {tabs.map(tab => {
        const isActive = currentMode.includes(tab.id.replace('_list', ''));
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id as ViewMode)}
            className="flex flex-col items-center justify-center flex-1 gap-1 relative"
          >
            {isActive && (
              <div className="absolute -top-2 w-8 h-1 bg-accent rounded-full animate-in slide-in-from-top-1 duration-300" style={{ backgroundColor: COLORS.accent }}></div>
            )}
            <span className={`text-xl transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-30 grayscale'}`}>
              {tab.icon}
            </span>
            <span className={`text-[7px] font-black uppercase tracking-[0.1em] transition-all text-center leading-tight ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
