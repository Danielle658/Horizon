import React, { useState, useEffect } from 'react';
import { AcademicSubject, CareerTech, Equipment, FinancialPot, GamificationState, BusinessMetric } from '../types';
import { 
  BookOpen, Sparkles, Trophy, Award, Flame, Calendar, Clock, ArrowUpRight, 
  CheckCircle, ChevronRight, AlertCircle, Play, Laptop, HelpCircle 
} from 'lucide-react';
import { COMPUTER_ENGINEERING_TIPS, MOTIVATIONAL_QUOTES } from '../data/initialData';
import HorizonLogo from './HorizonLogo';

interface DashboardProps {
  subjects: AcademicSubject[];
  techs: CareerTech[];
  equipments: Equipment[];
  pots: FinancialPot[];
  business: BusinessMetric;
  gamification: GamificationState;
  addXp: (amount: number) => void;
  onNavigate: (tab: string) => void;
}

export default function DashboardTab({
  subjects,
  techs,
  equipments,
  pots,
  business,
  gamification,
  addXp,
  onNavigate
}: DashboardProps) {
  const [tipIndex, setTipIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeMissions, setActiveMissions] = useState(gamification.missions);
  const [studySessionHours, setStudySessionHours] = useState('1');
  const [studyNotes, setStudyNotes] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.id || '');
  const [sessionCompletedMsg, setSessionCompletedMsg] = useState('');

  useEffect(() => {
    // Generate static but shifting tips based on current date
    const day = new Date().getDate();
    setTipIndex(day % COMPUTER_ENGINEERING_TIPS.length);
    setQuoteIndex(day % MOTIVATIONAL_QUOTES.length);
  }, []);

  // Compute stats
  const totalStudiedHours = techs.reduce((acc, curr) => acc + curr.hoursStudied, 0) + 
    subjects.reduce((acc, curr) => acc + (curr.attendance > 90 ? curr.credits * 15 : curr.credits * 12), 0);

  const completedSubjects = subjects.filter(s => s.status === 'Concluído').length;
  const totalSubjects = subjects.length;
  const graduationProgress = totalSubjects > 0 ? Math.round((completedSubjects / totalSubjects) * 100) : 0;

  const totalSavedEquipments = equipments.reduce((acc, curr) => acc + curr.saved, 0);
  const totalCostEquipments = equipments.reduce((acc, curr) => acc + curr.value, 0);
  const equipmentProgress = totalCostEquipments > 0 ? Math.round((totalSavedEquipments / totalCostEquipments) * 100) : 0;

  const totalRevenue = business.currentRevenue;
  const businessProgress = Math.round((totalRevenue / business.financialGoal) * 100);

  // Filter tasks not done yet
  const urgentTasks = subjects
    .flatMap(s => s.tasks.filter(t => !t.done).map(t => ({ ...t, subjectName: s.name })))
    .slice(0, 3);

  const handleQuickStudySession = (e: React.FormEvent) => {
    e.preventDefault();
    const hours = parseFloat(studySessionHours);
    if (isNaN(hours) || hours <= 0) return;

    // Add XP: 50 XP per studied hour!
    const earnedXp = Math.round(hours * 50);
    addXp(earnedXp);

    setSessionCompletedMsg(`Sessão registrada! +${earnedXp} XP recebido. Você está mais próxima do seu objetivo!`);
    setStudyNotes('');
    setTimeout(() => setSessionCompletedMsg(''), 5000);
  };

  const handleCompleteMission = (id: string, xpReward: number) => {
    setActiveMissions(prev => 
      prev.map(m => m.id === id ? { ...m, completed: true, progress: m.target } : m)
    );
    addXp(xpReward);
  };

  return (
    <div id="dashboard-tab" className="space-y-6">
      {/* Top Banner Greeting */}
      <div className="relative bg-gradient-to-br from-indigo-950/20 via-slate-900/30 to-emerald-950/20 dark:from-[#1c122e]/40 dark:via-[#181a26]/40 dark:to-[#121c16]/40 border border-slate-200/50 dark:border-white/10 p-6 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-radial from-[#7C3AED]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <HorizonLogo size="lg" animated className="hidden sm:flex" />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <HorizonLogo size="sm" animated className="sm:hidden" />
                <span className="text-xs font-mono text-[#34C759] uppercase tracking-wider bg-[#34C759]/10 px-2.5 py-1 rounded-full border border-[#34C759]/20 font-bold">
                  SISTEMA OPERACIONAL HORIZON v1.0 • ONLINE
                </span>
              </div>
              <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                Olá, {localStorage.getItem('horizon_username') || 'Danielle'}! <span className="text-[#34C759]">Engenheira da Computação</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
                "O único limite para o tamanho do seu sistema é a arquitetura da sua persistência." Acompanhe sua evolução diária abaixo.
              </p>
            </div>
          </div>

          {/* XP & Streak summary */}
          <div className="flex items-center gap-4 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-sm">
            <div className="text-center px-2">
              <div className="flex items-center gap-1.5 justify-center text-[#34C759]">
                <Flame className="w-5 h-5 fill-current" />
                <span className="text-2xl font-bold font-mono">{gamification.streak}</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Dias Seguidos</span>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
            <div className="text-center px-2">
              <div className="text-[#7C3AED] text-2xl font-bold font-mono">Nível {gamification.level}</div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                {gamification.xp} / {(gamification.level * 1000)} XP
              </span>
            </div>
          </div>
        </div>

        {/* Level progress bar */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
            <span>Progresso do Nível</span>
            <span className="font-bold">{Math.round((gamification.xp / (gamification.level * 1000)) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-white/5 h-2.5 rounded-full overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-[#34C759] to-[#7C3AED] h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, (gamification.xp / (gamification.level * 1000)) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Motivational Toast & Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Computer Engineering Tip Card */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/80 dark:border-white/10 p-5 rounded-3xl flex gap-4 items-start shadow-lg">
          <div className="bg-[#34C759]/15 p-3 rounded-2xl border border-[#34C759]/20 text-[#34C759] shrink-0">
            <Laptop className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-[#34C759] uppercase tracking-wider mb-1">Dica de Engenharia</h4>
            <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed font-sans font-medium">
              {COMPUTER_ENGINEERING_TIPS[tipIndex]}
            </p>
          </div>
        </div>

        {/* Motivation Heuristic Quote */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/80 dark:border-white/10 p-5 rounded-3xl flex gap-4 items-start shadow-lg">
          <div className="bg-[#7C3AED]/15 p-3 rounded-2xl border border-[#7C3AED]/20 text-[#7C3AED] shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-wider mb-1">Mantra do Dia</h4>
            <p className="text-slate-700 dark:text-slate-300 text-xs italic leading-relaxed font-sans font-medium">
              "{MOTIVATIONAL_QUOTES[quoteIndex]}"
            </p>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Study Time */}
        <div 
          onClick={() => onNavigate('carreira')}
          className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl hover:border-[#34C759]/40 cursor-pointer transition-all duration-300 group shadow-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold font-display">Tempo de Estudos Geral</span>
            <span className="bg-[#34C759]/10 text-[#34C759] p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mb-2">{totalStudiedHours} <span className="text-xs text-slate-500 dark:text-slate-400">horas</span></div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Universidade + Carreira</span>
            <ChevronRight className="w-4 h-4 text-[#34C759]" />
          </div>
        </div>

        {/* Metric 2: Graduation Progress */}
        <div 
          onClick={() => onNavigate('faculdade')}
          className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl hover:border-[#7C3AED]/40 cursor-pointer transition-all duration-300 group shadow-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold font-display">Progresso da Graduação</span>
            <span className="bg-[#7C3AED]/10 text-[#7C3AED] p-2 rounded-xl group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mb-2">{graduationProgress}%</div>
          <div className="w-full bg-slate-200 dark:bg-white/5 h-1.5 rounded-full overflow-hidden mb-2">
            <div className="bg-[#7C3AED] h-full rounded-full" style={{ width: `${graduationProgress}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{completedSubjects} de {totalSubjects} matérias</span>
            <ChevronRight className="w-4 h-4 text-[#7C3AED]" />
          </div>
        </div>

        {/* Metric 3: Finances / Equipment */}
        <div 
          onClick={() => onNavigate('equipamentos')}
          className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl hover:border-blue-500/40 cursor-pointer transition-all duration-300 group shadow-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold font-display">Reserva de Equipamentos</span>
            <span className="bg-blue-500/10 text-blue-500 dark:text-blue-400 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Trophy className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mb-2">R$ {totalSavedEquipments.toLocaleString('pt-BR')}</div>
          <div className="w-full bg-slate-200 dark:bg-white/5 h-1.5 rounded-full overflow-hidden mb-2">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${equipmentProgress}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{equipmentProgress}% da meta do Setup</span>
            <ChevronRight className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          </div>
        </div>

        {/* Metric 4: Business Revenue */}
        <div 
          onClick={() => onNavigate('empresa')}
          className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl hover:border-emerald-500/40 cursor-pointer transition-all duration-300 group shadow-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold font-display">Faturamento (Startup)</span>
            <span className="bg-emerald-500/10 text-[#34C759] p-2 rounded-xl group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mb-2">R$ {totalRevenue.toLocaleString('pt-BR')}</div>
          <div className="w-full bg-slate-200 dark:bg-white/5 h-1.5 rounded-full overflow-hidden mb-2">
            <div className="bg-[#34C759] h-full rounded-full" style={{ width: `${businessProgress}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Meta: R$ {business.financialGoal.toLocaleString('pt-BR')}</span>
            <ChevronRight className="w-4 h-4 text-[#34C759]" />
          </div>
        </div>
      </div>

      {/* Main Core Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Missions & Gamification Tracker */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="text-[#34C759] w-5 h-5" /> Missões & Objetivos Ativos
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Ganhe XP ao concluir</span>
            </div>

            <div className="space-y-4">
              {activeMissions.map((m) => {
                const percentage = Math.round((m.progress / m.target) * 100);
                return (
                  <div key={m.id} className="bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md ${
                            m.type === 'weekly' ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20' : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                          }`}>
                            {m.type === 'weekly' ? 'Semanal' : 'Mensal'}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h4>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{m.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">{m.progress} / {m.target}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-slate-200 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#34C759] to-[#7C3AED] h-full rounded-full" 
                          style={{ width: `${Math.min(100, percentage)}%` }}
                        />
                      </div>
                      
                      {!m.completed ? (
                        <button
                          id={`complete-mission-${m.id}`}
                          onClick={() => handleCompleteMission(m.id, m.xpReward)}
                          className="text-xs font-mono bg-[#34C759]/10 text-[#34C759] hover:bg-[#34C759]/25 border border-[#34C759]/20 px-3 py-1 rounded-lg transition-colors cursor-pointer font-bold"
                        >
                          +{m.xpReward} XP
                        </button>
                      ) : (
                        <span className="text-xs text-[#34C759] font-mono flex items-center gap-1 bg-[#34C759]/15 px-3 py-1 rounded-lg font-bold">
                          <CheckCircle className="w-3.5 h-3.5" /> Concluído
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Study Session Registration Form */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Play className="text-[#7C3AED] w-5 h-5 fill-current" /> Registrar Sessão de Estudo Rápido
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Estudou hoje fora da universidade? Registre as horas para atualizar seus conhecimentos e impulsionar seu XP imediatamente!
            </p>

            <form onSubmit={handleQuickStudySession} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Selecione a Matéria / Foco</label>
                  <select 
                    id="study-subject-select"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id} className="text-slate-900 dark:text-slate-900">{s.name} ({s.code})</option>
                    ))}
                    <option value="extra" className="text-slate-900 dark:text-slate-900">Estudos Livres de Portfólio / Startup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Horas Dedicadas</label>
                  <input 
                    id="study-hours-input"
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="12"
                    value={studySessionHours}
                    onChange={(e) => setStudySessionHours(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#7C3AED] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Notas de Evolução (Tópicos estudados)</label>
                <input 
                  id="study-notes-input"
                  type="text"
                  placeholder="Ex: Resolução de exercícios de Assembly, setup inicial de conexões Supabase..."
                  value={studyNotes}
                  onChange={(e) => setStudyNotes(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5 font-semibold">
                  <Award className="text-[#34C759] w-4 h-4" /> Recompensa de XP: {Math.round(parseFloat(studySessionHours || '0') * 50 || 0)} XP
                </span>
                <button
                  id="submit-study-btn"
                  type="submit"
                  className="bg-[#7C3AED] hover:bg-[#6d28d9] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-[#7C3AED]/20 cursor-pointer"
                >
                  Confirmar Sessão de Estudos
                </button>
              </div>

              {sessionCompletedMsg && (
                <div className="p-3 bg-[#34C759]/10 border border-[#34C759]/30 text-[#34C759] text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{sessionCompletedMsg}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Col: Urgent Tasks & Alerts */}
        <div className="space-y-6">
          {/* Calendar Agenda */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
              <Calendar className="text-[#7C3AED] w-5 h-5" /> Agenda de Prioridades
            </h3>

            {urgentTasks.length > 0 ? (
              <div className="space-y-3">
                {urgentTasks.map((t) => (
                  <div key={t.id} className="bg-slate-100/50 dark:bg-white/5 border-l-2 border-[#34C759] p-3 rounded-r-2xl space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-mono">{t.dueDate}</span>
                      <span className="text-[10px] bg-emerald-500/10 text-[#34C759] px-2 py-0.5 rounded font-mono uppercase font-bold">
                        {t.type}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{t.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.subjectName}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                <CheckCircle className="w-8 h-8 mx-auto text-[#34C759] mb-2 opacity-65" />
                Nenhum trabalho ou prova pendente no radar! Bom trabalho de planejamento.
              </div>
            )}

            <button 
              id="goto-academic-btn"
              onClick={() => onNavigate('faculdade')}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-white py-2.5 rounded-xl text-center font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Acessar Central Acadêmica <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Setup Economy Summary */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
              <Laptop className="text-blue-500 dark:text-blue-400 w-5 h-5" /> Economia do Setup
            </h3>

            <div className="space-y-4">
              {equipments.slice(0, 3).map((eq) => {
                const percent = Math.round((eq.saved / eq.value) * 100);
                return (
                  <div key={eq.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-900 dark:text-white font-bold text-xs truncate max-w-[150px]">{eq.name}</span>
                      <span className="text-slate-500 dark:text-slate-400 font-mono font-bold">{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full rounded-full" 
                        style={{ width: `${Math.min(100, percent)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              id="goto-equip-btn"
              onClick={() => onNavigate('equipamentos')}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-white py-2.5 rounded-xl text-center font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Ver Equipamentos <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
