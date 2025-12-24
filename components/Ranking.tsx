
import React from 'react';
import { KnowledgeRecord, RankingEntry } from '../types';
import { COLORS } from '../constants';

interface RankingProps {
  records: KnowledgeRecord[];
}

export const Ranking: React.FC<RankingProps> = ({ records }) => {
  const GOAL = 5000;
  
  const totalPoints = React.useMemo(() => {
    return records.reduce((acc, r) => acc + r.points, 0);
  }, [records]);

  const contributors = React.useMemo(() => {
    const stats: Record<string, RankingEntry> = {};
    records.forEach(r => {
      if (!stats[r.author]) stats[r.author] = { name: r.author, points: 0, count: 0 };
      stats[r.author].points += r.points;
      stats[r.author].count += 1;
    });
    return Object.values(stats).sort((a, b) => b.points - a.points);
  }, [records]);

  const progressPercentage = Math.min((totalPoints / GOAL) * 100, 100);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-2xl mx-auto">
      {/* HEADER SECTION */}
      <section className="text-center space-y-2 pt-6">
        <h2 className="text-3xl font-light text-gray-900 tracking-tight">
          Performance <span className="font-bold" style={{ color: COLORS.primary }}>Coletiva</span>
        </h2>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Métricas de Inovação e Qualidade</p>
      </section>

      {/* META GLOBAL CARD */}
      <section className="bg-[#003B2A] rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent" style={{ color: COLORS.accent }}>Objetivo Anual</span>
              <h3 className="text-4xl font-bold">{totalPoints.toLocaleString('pt-BR')} <span className="text-lg font-light opacity-30">pts</span></h3>
            </div>
            <div className="text-right">
               <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Status da Meta</div>
               <div className="text-xs font-black text-accent uppercase" style={{ color: COLORS.accent }}>{progressPercentage.toFixed(1)}% Completo</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%`, backgroundColor: COLORS.accent }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-white/30">
              <span>Marco Inicial</span>
              <span>Alvo: {GOAL.toLocaleString('pt-BR')} pts</span>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-white/60 font-medium">
            Atingindo o marco de 5.000 pontos, a BDG celebrará o compromisso com a excelência técnica através de uma premiação exclusiva para os principais contribuidores.
          </p>
        </div>
        
        {/* Background visual element */}
        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none select-none">
            <span className="text-[180px] font-black">BDG</span>
        </div>
      </section>

      {/* RANKING DE ENGENHEIROS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Top Contribuidores</h4>
          <span className="text-[9px] font-bold text-gray-300 uppercase">{contributors.length} Engenheiros</span>
        </div>

        <div className="space-y-3">
          {contributors.length === 0 ? (
            <div className="py-16 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nenhuma pontuação registrada</p>
            </div>
          ) : (
            contributors.map((entry, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm hover:border-accent/20 transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center font-black text-sm text-gray-300">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{entry.name}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{entry.count} Contribuições</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black" style={{ color: COLORS.primary }}>+{entry.points}</p>
                  <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Pontos BDG</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
