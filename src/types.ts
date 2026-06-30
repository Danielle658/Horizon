export interface AcademicSubject {
  id: string;
  name: string;
  code: string;
  semester: number;
  grade: number;
  status: 'Em Andamento' | 'Concluído' | 'Trancado';
  professor: string;
  schedule: string;
  credits: number;
  attendance: number; // percentage
  exams: Exam[];
  tasks: Task[];
  materials: { name: string; url: string; category: 'Resumo' | 'Link' | 'Livro' | 'Slides' }[];
}

export interface Exam {
  id: string;
  title: string;
  date: string;
  weight: number;
  grade?: number;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  done: boolean;
  type: 'Trabalho' | 'Exercício' | 'Projeto';
}

export interface CareerTech {
  id: string;
  name: string;
  currentLevel: number; // 0 to 5 (Iniciante, Básico, Intermediário, Avançado, Especialista)
  desiredLevel: number;
  hoursStudied: number;
  coursesCount: number;
  certificatesCount: number;
  projectsCount: number;
}

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  problemSolved: string;
  learning: string;
  status: 'Ideia' | 'Em Andamento' | 'Concluído';
  githubUrl: string;
  futureImprovements: string;
  imageUrl?: string;
}

export interface BusinessMetric {
  mission: string;
  vision: string;
  values: string[];
  brandName: string;
  services: { id: string; name: string; price: number; description: string }[];
  clients: { id: string; name: string; status: 'Lead' | 'Ativo' | 'Finalizado'; value: number }[];
  marketingChannels: { channel: string; active: boolean; notes: string }[];
  financialGoal: number;
  currentRevenue: number;
  strategicGoals: { text: string; completed: boolean }[];
}

export interface FinancialPot {
  id: string;
  name: string;
  category: 'Pessoal' | 'Empresa' | 'Equipamentos' | 'Reserva de Emergência' | 'Investimentos';
  currentAmount: number;
  targetAmount?: number;
  color: string;
}

export interface Equipment {
  id: string;
  name: string;
  value: number;
  saved: number;
  priority: 'Alta' | 'Média' | 'Baixa';
  category: 'Tablet' | 'Notebook' | 'Câmera' | 'Monitor' | 'Setup' | 'Outro';
}

export interface WeeklyReview {
  id: string;
  date: string;
  progressed: string;
  learned: string;
  difficulty: string;
  proudOf: string;
  toImprove: string;
  focusNextWeek: string;
  weeklySummary: string;
}

export interface GamificationState {
  xp: number;
  level: number;
  streak: number; // in days
  lastStudyDate?: string;
  missions: Mission[];
  achievements: Achievement[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  type: 'weekly' | 'monthly';
  progress: number; // current
  target: number; // goal
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
  unlockedAt?: string;
}

export interface StudySession {
  id: string;
  date: string;
  hours: number;
  subjectId?: string;
  techId?: string;
  notes: string;
}

export interface BookCourse {
  id: string;
  title: string;
  type: 'Livro' | 'Curso' | 'Certificado';
  status: 'Não Iniciado' | 'Lendo/Fazendo' | 'Concluído';
  platformOrAuthor: string;
  hoursStudied?: number;
}
