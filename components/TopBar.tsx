
import React from 'react';
import { LOGO_URL, COLORS } from '../constants';

export const TopBar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b h-20 flex items-center justify-between px-6 shadow-sm" style={{ borderColor: COLORS.border }}>
      <div className="flex items-center gap-4">
        <div className="p-1 bg-gray-50 rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <img src={LOGO_URL} alt="BDG Construtora" className="h-10 object-contain mix-blend-multiply" />
        </div>
        <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>
        <span className="font-bold text-[10px] uppercase tracking-[0.3em] hidden sm:block" style={{ color: COLORS.primary }}>
          BDG Construtora
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden xs:block">
          <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Engenheiro</p>
          <p className="text-xs font-bold text-gray-800">Equipe BDG</p>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md overflow-hidden bg-white border border-gray-100">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};
