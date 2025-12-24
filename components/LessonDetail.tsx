
import React from 'react';
// Fix: Replace non-existent Lesson type with KnowledgeRecord
import { KnowledgeRecord } from '../types';

interface LessonDetailProps {
  lesson: KnowledgeRecord;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({ lesson }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="bg-slate-900 p-8 text-white relative">
        <div className="absolute top-4 right-6 text-white/30 text-5xl font-black italic">
          #{lesson.registrationNumber.toString().padStart(3, '0')}
        </div>
        <div className="relative z-10">
          <span className="inline-block bg-[#2d5a3c] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-[#2d5a3c]/20">
            {lesson.project}
          </span>
          <h1 className="text-4xl font-bold mb-4 leading-tight">{lesson.idea}</h1>
          <div className="flex flex-wrap gap-6 text-slate-300 text-sm font-medium">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2d5a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{lesson.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2d5a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(lesson.date).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-[#2d5a3c] pl-4">Descrição da Lição</h2>
          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap mb-10">
            {lesson.explanation}
          </p>
        </div>

        {lesson.media.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-[#2d5a3c] pl-4">Evidências Visuais</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lesson.media.map((item) => (
                <div key={item.id} className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  {item.type === 'image' ? (
                    <img src={item.url} alt="" className="w-full h-auto" />
                  ) : (
                    <video controls className="w-full h-auto">
                      <source src={item.url} />
                      Seu navegador não suporta vídeos.
                    </video>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs">
          <p>BDG Construtora - Sistema de Lições Aprendidas</p>
          <p>Registro ID: {lesson.id}</p>
        </div>
      </div>
    </div>
  );
};
