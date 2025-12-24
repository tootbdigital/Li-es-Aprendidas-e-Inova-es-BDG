
export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
}

export type RecordType = 'lesson' | 'innovation';

export type InnovationStatus = 'Rascunho' | 'Enviado' | 'Em análise' | 'Aprovado' | 'Publicado' | 'Padronizado';
export type LessonStatus = 'Rascunho' | 'Enviado' | 'Validado' | 'Ação em andamento' | 'Concluída' | 'Disseminada';

export interface KnowledgeRecord {
  id: string;
  type: RecordType;
  registrationNumber: number;
  project: string;
  author: string;
  idea: string;
  explanation: string;
  date: string;
  media: MediaItem[];
  points: number;
  status: InnovationStatus | LessonStatus;
  
  // Campos específicos de Inovação
  sector?: string;
  category?: string;
  problem?: string;
  solution?: string;
  impactEstimate?: string;
  reproducibility?: string;

  // Campos específicos de Lições Aprendidas
  context?: string;
  fiveWhys?: string[];
  rootCause?: string;
  lessonInOneSentence?: string;
  preventiveActions?: string;
  standardizationChecklist?: {
    procedure: boolean;
    training: boolean;
    communication: boolean;
  };
}

export type ViewMode = 'home' | 'innovation_list' | 'lesson_list' | 'search' | 'profile' | 'create' | 'detail' | 'edit';

export interface RankingEntry {
  name: string;
  points: number;
  count: number;
}
