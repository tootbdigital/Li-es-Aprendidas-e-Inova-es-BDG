
import React, { useState } from 'react';
import { KnowledgeRecord, MediaItem, RecordType } from '../types';
import { COLORS } from '../constants';

interface RecordFormProps {
  type: RecordType;
  initialData?: KnowledgeRecord;
  onSubmit: (record: Partial<KnowledgeRecord>) => void;
  onCancel: () => void;
}

export const RecordForm: React.FC<RecordFormProps> = ({ type, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<KnowledgeRecord>>({
    project: initialData?.project || '',
    author: initialData?.author || '',
    idea: initialData?.idea || '',
    explanation: initialData?.explanation || '',
    type: type,
    sector: initialData?.sector || '',
    category: initialData?.category || '',
    problem: initialData?.problem || '',
    solution: initialData?.solution || '',
    impactEstimate: initialData?.impactEstimate || '',
    context: initialData?.context || '',
    fiveWhys: initialData?.fiveWhys || ['', '', '', '', ''],
    rootCause: initialData?.rootCause || '',
    lessonInOneSentence: initialData?.lessonInOneSentence || '',
    preventiveActions: initialData?.preventiveActions || '',
    standardizationChecklist: initialData?.standardizationChecklist || {
      procedure: false,
      training: false,
      communication: false,
    },
  });
  
  const [media, setMedia] = useState<MediaItem[]>(initialData?.media || []);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    const results = await Promise.all(Array.from(files).map(file => {
      return new Promise<MediaItem>(resolve => {
        const reader = new FileReader();
        reader.onload = ev => resolve({ 
          id: crypto.randomUUID(), 
          type: file.type.startsWith('video/') ? 'video' : 'image', 
          url: ev.target?.result as string 
        });
        reader.readAsDataURL(file);
      });
    }));
    setMedia(prev => [...prev, ...results]);
    setIsUploading(false);
  };

  return (
    <div className="animate-in slide-in-from-bottom-10 duration-500 pb-20 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onCancel} className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-primary transition-colors">← Cancelar Registro</button>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-gray-100 rounded-full text-gray-500">Formulário Oficial</span>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 space-y-10">
        <header className="space-y-2 border-b border-gray-50 pb-6">
          <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-2xl bg-gray-50 border border-gray-100 shadow-inner">
            {type === 'innovation' ? '💡' : '📝'}
          </div>
          <h2 className="text-3xl font-light text-gray-900 tracking-tight">
            Novo Registro de <span className="font-bold" style={{ color: COLORS.primary }}>{type === 'innovation' ? 'Inovação' : 'Lição Aprendida'}</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium">Preencha os dados técnicos com clareza para o acervo BDG.</p>
        </header>

        <form onSubmit={e => { e.preventDefault(); onSubmit({ ...formData, media }); }} className="space-y-8">
          
          <section className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent" style={{ color: COLORS.accent }}>01. Cabeçalho Técnico</h3>
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Obra / Projeto</label>
                <input required className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-primary focus:bg-white transition-all outline-none" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} placeholder="Nome da Obra" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Título do Conhecimento</label>
                <input required className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold" value={formData.idea} onChange={e => setFormData({...formData, idea: e.target.value})} placeholder="Ex: Método de impermeabilização X" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Autor do Registro</label>
                <input required className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-medium" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} placeholder="Nome do Responsável" />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent" style={{ color: COLORS.accent }}>02. Análise e Solução</h3>
            
            {type === 'lesson' ? (
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Contexto do Ocorrido</label>
                  <textarea required className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-primary focus:bg-white transition-all outline-none h-24 resize-none" value={formData.context} onChange={e => setFormData({...formData, context: e.target.value})} placeholder="Descreva as circunstâncias da lição aprendida..." />
                </div>
                <div className="space-y-3 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Análise de Causa (5 Porquês)</label>
                  {formData.fiveWhys?.map((why, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <span className="text-[10px] font-black text-gray-300 w-4">{idx+1}º</span>
                      <input className="flex-1 bg-white p-3 rounded-lg text-xs border border-gray-100 outline-none focus:border-primary transition-colors" value={why} onChange={e => {
                        const newWhys = [...(formData.fiveWhys || [])];
                        newWhys[idx] = e.target.value;
                        setFormData({...formData, fiveWhys: newWhys});
                      }} placeholder={`Por quê?`} />
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Aprendizado em uma Frase</label>
                  <input required className="w-full bg-primary/5 p-4 rounded-xl text-sm border border-primary/10 focus:border-primary outline-none font-bold" style={{ color: COLORS.primary }} value={formData.lessonInOneSentence} onChange={e => setFormData({...formData, lessonInOneSentence: e.target.value})} placeholder="Qual o ensinamento central para a empresa?" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Ações Corretivas Aplicadas</label>
                  <textarea required className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-primary focus:bg-white transition-all outline-none h-24 resize-none" value={formData.preventiveActions} onChange={e => setFormData({...formData, preventiveActions: e.target.value})} placeholder="Quais medidas foram tomadas para padronização?" />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Setor / Disciplina</label>
                    <select className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent outline-none focus:border-primary" value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})}>
                      <option value="">Selecionar...</option>
                      <option>Canteiro</option>
                      <option>Estrutura</option>
                      <option>Instalações</option>
                      <option>Acabamento</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Tipo de Impacto</label>
                    <select className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent outline-none focus:border-primary" value={formData.impactEstimate} onChange={e => setFormData({...formData, impactEstimate: e.target.value})}>
                      <option value="">Selecionar...</option>
                      <option>Custo</option>
                      <option>Prazo</option>
                      <option>Qualidade</option>
                      <option>Segurança</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Problema Identificado</label>
                  <textarea required className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-primary focus:bg-white transition-all outline-none h-24 resize-none" value={formData.problem} onChange={e => setFormData({...formData, problem: e.target.value})} placeholder="Qual era a dor ou desperdício encontrado?" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Solução e Resultados</label>
                  <textarea required className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-primary focus:bg-white transition-all outline-none h-32 resize-none" value={formData.solution} onChange={e => setFormData({...formData, solution: e.target.value})} placeholder="Descreva a inovação e o resultado prático..." />
                </div>
              </div>
            )}
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent" style={{ color: COLORS.accent }}>03. Documentação Fotográfica</h3>
            <div className="flex flex-wrap gap-4">
               <label className="w-24 h-24 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 hover:border-primary hover:bg-gray-50 transition-all cursor-pointer group">
                 <span className="text-2xl group-hover:scale-110 transition-transform">+</span>
                 <span className="text-[8px] font-black uppercase">Anexo</span>
                 <input type="file" multiple className="hidden" onChange={handleFileChange} />
               </label>
               {media.map(m => (
                 <div key={m.id} className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden relative group shadow-sm border border-gray-100">
                    <img src={m.url} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setMedia(media.filter(x => x.id !== m.id))} className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity">
                      <span>REMOVER</span>
                    </button>
                 </div>
               ))}
            </div>
            {isUploading && <p className="text-[9px] font-bold text-primary animate-pulse italic">Processando evidências...</p>}
          </section>

          <div className="flex flex-col gap-4 pt-6 border-t border-gray-50">
            <button type="submit" className="w-full py-5 rounded-xl text-white font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-95 hover:brightness-110" style={{ backgroundColor: COLORS.primary }}>
               {initialData ? 'Atualizar Conhecimento' : 'Enviar para o Acervo BDG'}
            </button>
            <p className="text-[9px] text-center text-gray-300 uppercase font-black tracking-widest">Este registro será validado pelo setor de Qualidade</p>
          </div>
        </form>
      </div>
    </div>
  );
};
