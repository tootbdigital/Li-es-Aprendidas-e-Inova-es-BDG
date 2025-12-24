
import React from 'react';
import { LOGO_URL } from '../constants';

interface NavbarProps {
  onHome: () => void;
  onRanking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHome, onRanking }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={onHome}
          >
            <img src={LOGO_URL} alt="BDG Construtora" className="h-14 object-contain" />
            <span className="hidden sm:block text-[#2d5a3c] font-black text-lg uppercase tracking-widest border-l-2 border-slate-200 pl-4">
              SMART BUILD
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={onHome} className="text-slate-600 hover:text-[#2d5a3c] font-bold transition-colors">Portal</button>
            <button onClick={onRanking} className="text-slate-600 hover:text-[#2d5a3c] font-bold transition-colors flex items-center gap-1">
               <span className="text-lg">🎯</span> Meta BDG
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2 hidden sm:flex">
             <span className="text-xs font-bold text-slate-400 uppercase">Colaborador</span>
             <span className="text-sm font-bold text-slate-800">Mestre de Obras</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#2d5a3c]/10 flex items-center justify-center border-2 border-[#2d5a3c]/20 text-[#2d5a3c]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};
