
import React from 'react';
import { KnowledgeRecord } from '../types';
import { COLORS } from '../constants';

interface RecordDetailProps {
  record: KnowledgeRecord;
  onBack: () => void;
  onEdit: () => void;
}

export const RecordDetail: React.FC<RecordDetailProps> = ({ record, onBack, onEdit }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-500 mb-24">
      <div className="p-8 pb-10 text-white relative" style={{ backgroundColor: COLORS.primary }}>
        <div className="flex justify-between items-center mb-10">
            <button onClick={onBack} className="bg-white/10 hover:bg-white/20 backdrop-blur-md w-10 h-10 rounded-xl flex items-center justify-center transition-all">
               <span className="text-lg">←</span>
            </button>
            <div className="flex gap-2">
              <button 
                  onClick={onEdit}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/20"
              >
                  Editar
              </button>
            </div>
        </div>
        
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    {record.project}
                </span>
                <span className="bg-amber-400 text-slate-900 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    {record.status}
                </span>
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight">{record.idea}</h1>
            <div className="flex items-center gap-4 text-white/60 font-bold text-[10px] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center font-black">{record.author.charAt(0)}</div>
                    <p>{record.author}</p>
                </div>
                <span>•</span>
                <p>{new Date(record.date).toLocaleDateString('pt-BR')}</p>
            </div>
        </div>

        <div className="absolute -right-8 -bottom-8 text-[140px] opacity-10 select-none grayscale pointer-events-none">
           {record.type === 'innovation' ? '💡' : '📸'}
        </div>
      </div>
      
      <div className="p-8 space-y-10">
        
        {/* CONTEXTO OU PROBLEMA */}
        <section className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b pb-1">
              {record.type === 'innovation' ? 'Problema Identificado' : 'Contexto'}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {record.type === 'innovation' ? record.problem : record.context}
            </p>
        </section>

        {/* SOLUÇÃO OU LIÇÃO SÍNTESE */}
        <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3">
            <h3 className="text-[10px] font-black text-[#2F5D50] uppercase tracking-widest">
               {record.type === 'innovation' ? 'Solução Aplicada' : 'Aprendizado Central'}
            </h3>
            <p className="text-[#1F3F36] font-black text-lg leading-snug">
              {record.type === 'innovation' ? record.solution : record.lessonInOneSentence}
            </p>
        </section>

        {/* 5 PORQUÊS SE FOR LIÇÃO */}
        {record.type === 'lesson' && record.fiveWhys && (
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b pb-1">Análise de Causa Raiz</h3>
            <div className="space-y-3">
               {record.fiveWhys.map((why, i) => why && (
                 <div key={i} className="flex gap-4 items-start">
                    <span className="text-[10px] font-black text-slate-300 mt-1">{i+1}º</span>
                    <p className="text-xs text-slate-500 italic">{why}</p>
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* AÇÕES PREVENTIVAS E CHECKLIST */}
        {record.type === 'lesson' && (
          <section className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b pb-1">Ações Corretivas</h3>
              <p className="text-slate-600 text-sm">{record.preventiveActions}</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Status da Padronização</h3>
              {[
                { key: 'procedure', label: 'Procedimento Atualizado' },
                { key: 'training', label: 'Treinamento Realizado' },
                { key: 'communication', label: 'Comunicação em DDS' }
              ].map(item => (
                <div key={item.key} className={`flex items-center gap-3 p-3 rounded-xl border ${record.standardizationChecklist?.[item.key as keyof typeof record.standardizationChecklist] ? 'bg-emerald-50 border-emerald-100 text-[#2F5D50]' : 'bg-slate-50 border-slate-100 text-slate-400 opacity-50'}`}>
                  <span className="text-sm">{record.standardizationChecklist?.[item.key as keyof typeof record.standardizationChecklist] ? '✅' : '⭕'}</span>
                  <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MÍDIAS */}
        {record.media.length > 0 && (
            <section className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b pb-1">Evidências Visuais</h3>
                <div className="grid grid-cols-2 gap-4">
                    {record.media.map(m => (
                        <div key={m.id} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm aspect-square bg-slate-50">
                            {m.type === 'image' ? (
                                <img src={m.url} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-900">
                                   <span className="text-white text-xs font-bold">VÍDEO</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        )}

        <footer className="pt-10 flex flex-col items-center gap-2 opacity-30 text-[9px] font-black uppercase tracking-[0.3em]">
            <img src="https://images.smart.com.br/api/v1/content/be7e38c3-3054-474c-87d5-0f04e848981f/file/be7e38c3-3054-474c-87d5-0f04e848981f.png" className="h-4 grayscale" alt="BDG" />
            <span>BDG Inova+ • Inteligência Coletiva</span>
        </footer>
      </div>
    </div>
  );
};
