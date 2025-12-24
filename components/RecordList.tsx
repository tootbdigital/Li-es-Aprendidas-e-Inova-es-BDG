
import React, { useState } from 'react';
import { KnowledgeRecord, RecordType } from '../types';
import { COLORS } from '../constants';

interface RecordListProps {
  type: RecordType;
  records: KnowledgeRecord[];
  onViewDetail: (record: KnowledgeRecord) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

export const RecordList: React.FC<RecordListProps> = ({ type, records, onViewDetail, onDelete, onAddNew }) => {
  const [search, setSearch] = useState('');

  const filtered = records.filter(r => 
    r.idea.toLowerCase().includes(search.toLowerCase()) || 
    r.project.toLowerCase().includes(search.toLowerCase()) ||
    r.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <header className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: COLORS.accent }}>
            Acervo Técnico
          </p>
          <h2 className="text-3xl font-light text-gray-900 tracking-tight">
            {type === 'innovation' ? 'Inovações' : 'Lições Aprendidas'} <span className="font-bold" style={{ color: COLORS.primary }}>BDG</span>
          </h2>
        </div>
        <button 
          onClick={onAddNew} 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl shadow-xl transition-all active:scale-90 hover:brightness-110" 
          style={{ backgroundColor: COLORS.primary }}
        >
          +
        </button>
      </header>

      <div className="relative px-2">
        <input 
          className="w-full bg-white border h-14 pl-12 pr-4 rounded-xl text-sm focus:ring-1 transition-all outline-none" 
          style={{ borderColor: COLORS.border, accentColor: COLORS.accent }}
          placeholder={`Buscar em ${type === 'innovation' ? 'inovações' : 'lições aprendidas'}...`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-30 text-lg">🔍</span>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Nenhum registro encontrado</p>
          </div>
        ) : (
          filtered.map(r => (
            <div 
              key={r.id} 
              onClick={() => onViewDetail(r)}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer group relative overflow-hidden" 
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-gray-50 text-gray-400">
                    {r.project}
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded" style={{ backgroundColor: `${COLORS.accent}15`, color: COLORS.accent }}>
                    {r.status}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-gray-300">#{r.registrationNumber.toString().padStart(3, '0')}</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors" style={{ color: COLORS.text }}>
                {r.idea}
              </h3>
              
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-6 font-medium">
                {r.type === 'innovation' ? r.problem : r.lessonInOneSentence || r.explanation}
              </p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                    {r.type === 'innovation' ? '💡' : '📸'}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{r.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black" style={{ color: COLORS.primary }}>+{r.points}</span>
                  <span className="text-[8px] font-bold text-gray-300 uppercase">pts</span>
                </div>
              </div>
              
              {/* Gold accent on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" style={{ backgroundColor: COLORS.accent }}></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
