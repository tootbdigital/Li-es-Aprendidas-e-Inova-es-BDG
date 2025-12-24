
import React from 'react';
import { KnowledgeRecord } from '../types';
import { COLORS } from '../constants';

interface HomeProps {
  records: KnowledgeRecord[];
  onNavigateRanking: () => void;
  onCreateLesson: () => void;
  onCreateInnovation: () => void;
}

export const Home: React.FC<HomeProps> = ({ records, onNavigateRanking, onCreateLesson, onCreateInnovation }) => {
  const GOAL = 5000;
  const totalPoints = records.reduce((acc, r) => acc + r.points, 0);
  const progress = Math.min((totalPoints / GOAL) * 100, 100);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-2xl mx-auto -mt-6 p-6 min-h-screen" style={{ backgroundColor: COLORS.primary }}>
      <section className="space-y-1 text-center py-6">
        <h1 className="text-3xl font-light text-white tracking-tight">
          Portal de <span className="font-bold" style={{ color: COLORS.accent }}>Conhecimento</span>
        </h1>
        <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">BDG Construtora</p>
      </section>

      {/* META CARD - DESIGN SITE BDG */}
      <div 
        onClick={onNavigateRanking}
        className="bg-white rounded-xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.02]"
      >
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded bg-gray-50" style={{ color: COLORS.accent }}>Impacto Global</span>
              <h2 className="text-4xl font-bold" style={{ color: COLORS.primary }}>{totalPoints.toLocaleString('pt-BR')} <span className="text-lg font-light opacity-50">pts</span></h2>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-xl">🎯</div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <span>Progresso Anual</span>
              <span>Alvo: {GOAL.toLocaleString('pt-BR')}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${progress}%`, backgroundColor: COLORS.accent }} />
            </div>
          </div>
        </div>
      </div>

      {/* BOTÕES DE AÇÃO - PERSONALIZADOS */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={onCreateInnovation}
          className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all group"
        >
          <div className="w-14 h-14 rounded-full mb-4 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform bg-white/10">💡</div>
          <span className="text-xs font-black uppercase tracking-widest mb-1 text-white">Inovações</span>
          <span className="text-[9px] font-bold text-white/40">+25 pts</span>
        </button>
        <button 
          onClick={onCreateLesson}
          className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all group"
        >
          <div className="w-14 h-14 rounded-full mb-4 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform bg-white/10">📸</div>
          <span className="text-xs font-black uppercase tracking-widest mb-1 text-white text-center">Lições Aprendidas</span>
          <span className="text-[9px] font-bold text-white/40">+10 pts</span>
        </button>
      </div>

      {/* ATIVIDADE RECENTE - ADAPTADA PARA O FUNDO VERDE */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 px-2">Registros Recentes</h4>
        <div className="space-y-3">
          {records.slice(0, 4).map(r => (
            <div key={r.id} className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg bg-white/10">
                  {r.type === 'innovation' ? '💡' : '📸'}
                </div>
                <div>
                  <p className="text-xs font-bold text-white line-clamp-1">{r.idea}</p>
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{r.project}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: COLORS.accent }}>{r.status}</span>
              </div>
            </div>
          ))}
          {records.length === 0 && (
            <div className="py-12 text-center bg-white/5 rounded-xl border border-dashed border-white/10">
               <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Nenhuma atividade registrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
