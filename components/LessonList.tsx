
import React, { useState } from 'react';
// Fix: Replace non-existent Lesson type with KnowledgeRecord
import { KnowledgeRecord } from '../types';

interface LessonListProps {
  lessons: KnowledgeRecord[];
  onViewDetail: (lesson: KnowledgeRecord) => void;
  onDelete: (id: string) => void;
}

export const LessonList: React.FC<LessonListProps> = ({ lessons, onViewDetail, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLessons = lessons.filter(l => 
    l.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.idea.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (lessons.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Nenhuma lição registrada</h3>
        <p className="text-slate-500 mt-1">Seja o primeiro a documentar um aprendizado!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2d5a3c] focus:border-transparent sm:text-sm transition-all shadow-sm"
          placeholder="Pesquisar por obra, ideia ou autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div 
            key={lesson.id} 
            className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 transition-all overflow-hidden flex flex-col"
          >
            <div className="relative h-40 bg-slate-100 overflow-hidden">
              {lesson.media.length > 0 ? (
                lesson.media[0].type === 'image' ? (
                  <img src={lesson.media[0].url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-[#2d5a3c] text-white px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
                #{lesson.registrationNumber.toString().padStart(3, '0')}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-[#2d5a3c] uppercase">{lesson.project}</span>
                <span className="text-xs text-slate-400">{new Date(lesson.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1">{lesson.idea}</h3>
              <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">
                {lesson.explanation}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {lesson.author.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{lesson.author}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onDelete(lesson.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => onViewDetail(lesson)}
                    className="text-[#2d5a3c] font-bold text-sm hover:underline"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
