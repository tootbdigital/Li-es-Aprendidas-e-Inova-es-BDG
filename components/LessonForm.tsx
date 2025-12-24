
import React, { useState } from 'react';
// Fix: Replace non-existent Lesson type with KnowledgeRecord
import { KnowledgeRecord, MediaItem } from '../types';

interface LessonFormProps {
  // Use Partial<KnowledgeRecord> to be consistent with App.tsx and RecordForm.tsx
  onSubmit: (lesson: Partial<KnowledgeRecord>) => void;
  onCancel: () => void;
}

export const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    project: '',
    author: '',
    idea: '',
    explanation: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newMedia: MediaItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;
      
      const reader = new FileReader();
      
      const promise = new Promise<MediaItem>((resolve) => {
        reader.onload = (event) => {
          resolve({
            id: crypto.randomUUID(),
            type: file.type.startsWith('video/') ? 'video' : 'image',
            url: event.target?.result as string,
          });
        };
      });
      
      reader.readAsDataURL(file);
      newMedia.push(await promise);
    }
    
    setMedia([...media, ...newMedia]);
  };

  const removeMedia = (id: string) => {
    setMedia(media.filter(m => m.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate brief processing
    setTimeout(() => {
      // Fix: Add missing type field 'lesson' to the submitted object
      onSubmit({
        ...formData,
        media,
        type: 'lesson'
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 block">Obra / Projeto</label>
          <input
            required
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#2d5a3c] focus:border-transparent outline-none transition-all"
            placeholder="Ex: Edifício Horizonte"
            value={formData.project}
            onChange={e => setFormData({ ...formData, project: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 block">Autor do Registro</label>
          <input
            required
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#2d5a3c] focus:border-transparent outline-none transition-all"
            placeholder="Seu nome completo"
            value={formData.author}
            onChange={e => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">Ideia Central / Título</label>
        <input
          required
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#2d5a3c] focus:border-transparent outline-none transition-all"
          placeholder="Resumo do aprendizado"
          value={formData.idea}
          onChange={e => setFormData({ ...formData, idea: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">Explicação Detalhada</label>
        <textarea
          required
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#2d5a3c] focus:border-transparent outline-none transition-all resize-none"
          placeholder="Descreva o que aconteceu, qual foi a solução e como evitar problemas futuros ou repetir o sucesso."
          value={formData.explanation}
          onChange={e => setFormData({ ...formData, explanation: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 block">Data do Evento</label>
          <input
            required
            type="date"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#2d5a3c] focus:border-transparent outline-none transition-all"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-semibold text-slate-700 block">Fotos e Vídeos</label>
        <div className="flex flex-wrap gap-4">
          <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-[#2d5a3c] hover:bg-slate-50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs text-slate-500 mt-2 font-medium">Adicionar</span>
            <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
          </label>
          
          {media.map((item) => (
            <div key={item.id} className="relative w-32 h-32 rounded-xl overflow-hidden group border border-slate-200 shadow-sm">
              {item.type === 'image' ? (
                <img src={item.url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              <button 
                type="button"
                onClick={() => removeMedia(item.id)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
        >
          Cancelar
        </button>
        <button
          disabled={isSubmitting}
          type="submit"
          className="flex-1 bg-[#2d5a3c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e3a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Registro'}
        </button>
      </div>
    </form>
  );
};
