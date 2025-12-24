
import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { RecordList } from './components/RecordList';
import { RecordForm } from './components/RecordForm';
import { RecordDetail } from './components/RecordDetail';
import { Ranking } from './components/Ranking';
import { BottomTabs } from './components/BottomTabs';
import { TopBar } from './components/TopBar';
import { KnowledgeRecord, ViewMode, RecordType } from './types';
import { COLORS } from './constants';

const App: React.FC = () => {
  const [records, setRecords] = useState<KnowledgeRecord[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [activeCreateType, setActiveCreateType] = useState<RecordType>('lesson');
  const [selectedRecord, setSelectedRecord] = useState<KnowledgeRecord | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('bdg_inova_plus_v2');
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse records", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bdg_inova_plus_v2', JSON.stringify(records));
  }, [records]);

  const handleSaveRecord = (formData: Partial<KnowledgeRecord>) => {
    if (viewMode === 'edit' && selectedRecord) {
      const updatedRecords = records.map(r => 
        r.id === selectedRecord.id ? { ...r, ...formData } : r
      );
      setRecords(updatedRecords);
      setViewMode(formData.type === 'innovation' ? 'innovation_list' : 'lesson_list');
    } else {
      const points = formData.type === 'innovation' ? 25 : 10;
      const newRecord: KnowledgeRecord = {
        ...formData,
        id: crypto.randomUUID(),
        registrationNumber: records.length + 1,
        points,
        status: 'Enviado',
        date: new Date().toISOString(),
      } as KnowledgeRecord;
      setRecords([newRecord, ...records]);
      setViewMode(formData.type === 'innovation' ? 'innovation_list' : 'lesson_list');
    }
    setSelectedRecord(null);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm('Deseja excluir este registro permanentemente?')) {
      setRecords(records.filter(r => r.id !== id));
      if (viewMode === 'detail') setViewMode('home');
    }
  };

  const navigateToCreate = (type: RecordType) => {
    setActiveCreateType(type);
    setSelectedRecord(null);
    setViewMode('create');
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: COLORS.bg }}>
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 pt-6">
        {viewMode === 'home' && (
          <Home 
            records={records}
            onNavigateRanking={() => setViewMode('profile')}
            onCreateLesson={() => navigateToCreate('lesson')}
            onCreateInnovation={() => navigateToCreate('innovation')}
          />
        )}

        {viewMode === 'innovation_list' && (
          <RecordList 
            type="innovation"
            records={records.filter(r => r.type === 'innovation')}
            onViewDetail={(r) => { setSelectedRecord(r); setViewMode('detail'); }}
            onDelete={handleDeleteRecord}
            onAddNew={() => navigateToCreate('innovation')}
          />
        )}

        {viewMode === 'lesson_list' && (
          <RecordList 
            type="lesson"
            records={records.filter(r => r.type === 'lesson')}
            onViewDetail={(r) => { setSelectedRecord(r); setViewMode('detail'); }}
            onDelete={handleDeleteRecord}
            onAddNew={() => navigateToCreate('lesson')}
          />
        )}

        {(viewMode === 'create' || viewMode === 'edit') && (
          <RecordForm 
            type={activeCreateType}
            initialData={selectedRecord || undefined}
            onSubmit={handleSaveRecord} 
            onCancel={() => setViewMode('home')} 
          />
        )}

        {viewMode === 'detail' && selectedRecord && (
          <RecordDetail 
            record={selectedRecord} 
            onBack={() => setViewMode(selectedRecord.type === 'innovation' ? 'innovation_list' : 'lesson_list')}
            onEdit={() => setViewMode('edit')}
          />
        )}

        {viewMode === 'profile' && (
          <Ranking records={records} />
        )}

        {viewMode === 'search' && (
          <div className="py-20 text-center">
            <h2 className="text-xl font-bold text-slate-400">Busca Avançada</h2>
            <p className="text-sm text-slate-300">Em desenvolvimento...</p>
          </div>
        )}
      </main>

      <BottomTabs currentMode={viewMode} onNavigate={setViewMode} />
    </div>
  );
};

export default App;
