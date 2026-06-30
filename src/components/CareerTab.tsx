import React, { useState } from 'react';
import { CareerTech } from '../types';
import { 
  Compass, Flame, Clock, BookOpen, Award, CheckCircle, ChevronUp, 
  Settings, ArrowUpRight, Plus, HelpCircle, Layers 
} from 'lucide-react';

interface CareerTabProps {
  techs: CareerTech[];
  setTechs: React.Dispatch<React.SetStateAction<CareerTech[]>>;
  addXp: (amount: number) => void;
}

const LEVEL_NAMES = ['Não Iniciado', 'Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Especialista'];

export default function CareerTab({ techs, setTechs, addXp }: CareerTabProps) {
  const [selectedTechId, setSelectedTechId] = useState<string>(techs[0]?.id || '');
  
  // Hours & certs inputs
  const [hoursToAdd, setHoursToAdd] = useState('2');
  const [certsToAdd, setCertsToAdd] = useState('0');
  const [coursesToAdd, setCoursesToAdd] = useState('0');
  const [projectsToAdd, setProjectsToAdd] = useState('0');

  const selectedTech = techs.find(t => t.id === selectedTechId) || techs[0];

  const handleUpdateLevel = (techId: string, isCurrent: boolean, newValue: number) => {
    setTechs(prev => prev.map(t => {
      if (t.id === techId) {
        if (isCurrent) {
          const oldLevel = t.currentLevel;
          if (newValue > oldLevel) {
            // Level Up XP reward: 200 XP times level difference!
            addXp((newValue - oldLevel) * 200);
          }
          return { ...t, currentLevel: Math.min(5, Math.max(0, newValue)) };
        } else {
          return { ...t, desiredLevel: Math.min(5, Math.max(0, newValue)) };
        }
      }
      return t;
    }));
  };

  const handleIncrementStats = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTechId) return;

    const hours = parseFloat(hoursToAdd) || 0;
    const certs = parseInt(certsToAdd) || 0;
    const courses = parseInt(coursesToAdd) || 0;
    const projects = parseInt(projectsToAdd) || 0;

    setTechs(prev => prev.map(t => {
      if (t.id === selectedTechId) {
        // Calculate XP Reward
        // 40 XP per studied hour, 150 XP per certificate, 100 XP per course, 200 XP per project!
        const xpEarned = Math.round((hours * 40) + (certs * 150) + (courses * 100) + (projects * 200));
        if (xpEarned > 0) {
          addXp(xpEarned);
        }

        return {
          ...t,
          hoursStudied: t.hoursStudied + hours,
          certificatesCount: t.certificatesCount + certs,
          coursesCount: t.coursesCount + courses,
          projectsCount: t.projectsCount + projects
        };
      }
      return t;
    }));

    // Reset inputs
    setHoursToAdd('2');
    setCertsToAdd('0');
    setCoursesToAdd('0');
    setProjectsToAdd('0');
  };

  // Helper to draw progress bars or colors
  const getLevelColor = (level: number) => {
    if (level <= 1) return 'bg-gray-600 text-gray-300';
    if (level === 2) return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
    if (level === 3) return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    if (level === 4) return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
    return 'bg-[#34C759]/20 text-[#34C759] border border-[#34C759]/30';
  };

  // Stats
  const totalRoadmapHours = techs.reduce((sum, t) => sum + t.hoursStudied, 0);
  const totalCerts = techs.reduce((sum, t) => sum + t.certificatesCount, 0);
  const totalCourses = techs.reduce((sum, t) => sum + t.coursesCount, 0);
  const totalProjects = techs.reduce((sum, t) => sum + t.projectsCount, 0);

  return (
    <div id="career-tab" className="space-y-6">
      {/* Top Professional Summary */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="text-[#34C759] w-6 h-6" /> Hub de Desenvolvimento de Carreira
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl font-medium">
            Acompanhe sua capacitação técnica e o nível de dominância em hardware, firmware e engenharia de software para preencher a lacuna entre a universidade e a liderança de mercado.
          </p>
        </div>

        {/* Global career counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-100/80 dark:bg-black/20 border border-slate-200 dark:border-white/5 p-4 rounded-2xl shadow-inner">
          <div className="text-center px-1">
            <div className="text-slate-800 dark:text-white font-bold font-mono text-base">{totalRoadmapHours}h</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase font-sans">Estudadas</div>
          </div>
          <div className="text-center px-1">
            <div className="text-[#7C3AED] font-bold font-mono text-base">{totalCourses}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase font-sans">Cursos</div>
          </div>
          <div className="text-center px-1">
            <div className="text-[#34C759] font-bold font-mono text-base">{totalCerts}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase font-sans">Certificados</div>
          </div>
          <div className="text-center px-1">
            <div className="text-blue-500 dark:text-blue-400 font-bold font-mono text-base">{totalProjects}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase font-sans">Projetos</div>
          </div>
        </div>
      </div>

      {/* Grid containing techs list vs details panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Columns: Techs Cards Grid (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-xl">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <Layers className="text-[#7C3AED] w-4 h-4" /> Grade de Tecnologias
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {techs.map((t) => {
                const isFinished = t.currentLevel >= t.desiredLevel;
                const percentageOfTarget = Math.round((t.currentLevel / t.desiredLevel) * 100);

                return (
                  <div 
                    key={t.id}
                    onClick={() => setSelectedTechId(t.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      selectedTechId === t.id 
                        ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-purple-500/40 dark:border-purple-400/50 shadow-md' 
                        : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="truncate pr-1">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white font-display truncate">{t.name}</h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium">
                          {t.hoursStudied}h estudadas
                        </span>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase font-mono flex-shrink-0 ${getLevelColor(t.currentLevel)}`}>
                        {LEVEL_NAMES[t.currentLevel]}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium">
                        <span>Alvo: {LEVEL_NAMES[t.desiredLevel]}</span>
                        <span>{percentageOfTarget}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-black/30 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${isFinished ? 'bg-[#34C759]' : 'bg-[#7C3AED]'}`} 
                          style={{ width: `${Math.min(100, percentageOfTarget)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Columns: Focus / Interactive upgrade station (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedTech ? (
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-6 shadow-xl">
              
              {/* Header Details */}
              <div className="space-y-2 pb-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">{selectedTech.name}</h3>
                  <span className="text-[10px] font-mono uppercase bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 px-2 py-0.5 rounded-md font-bold">
                    ID: {selectedTech.id}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans font-medium">
                  Sua dominância de competência para <strong>{selectedTech.name}</strong> está sendo mapeada abaixo. 
                  Você pode evoluir níveis ou registrar esforços de cursos.
                </p>
              </div>

              {/* Slider / Button level controls */}
              <div className="space-y-4 bg-slate-100/50 dark:bg-black/20 border border-slate-200/50 dark:border-white/5 p-4 rounded-2xl shadow-inner">
                <h4 className="text-xs uppercase font-mono text-slate-500 dark:text-slate-400 font-bold">Ajustes de Competência</h4>
                
                {/* Current level control */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">Nível Atual: <strong className="text-slate-900 dark:text-white">{LEVEL_NAMES[selectedTech.currentLevel]}</strong></span>
                    <span className="text-slate-400 dark:text-slate-500 font-mono">({selectedTech.currentLevel} / 5)</span>
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    {[0,1,2,3,4,5].map((lvl) => (
                      <button
                        id={`set-curr-level-${lvl}`}
                        key={lvl}
                        onClick={() => handleUpdateLevel(selectedTech.id, true, lvl)}
                        className={`flex-1 text-xs font-mono py-1 rounded-lg transition-colors cursor-pointer ${
                          selectedTech.currentLevel === lvl 
                            ? 'bg-[#34C759] text-white font-bold' 
                            : 'bg-white dark:bg-black/20 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desired level control */}
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">Nível Desejado: <strong className="text-slate-900 dark:text-white">{LEVEL_NAMES[selectedTech.desiredLevel]}</strong></span>
                    <span className="text-slate-400 dark:text-slate-500 font-mono">({selectedTech.desiredLevel} / 5)</span>
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    {[1,2,3,4,5].map((lvl) => (
                      <button
                        id={`set-des-level-${lvl}`}
                        key={lvl}
                        onClick={() => handleUpdateLevel(selectedTech.id, false, lvl)}
                        className={`flex-1 text-xs font-mono py-1 rounded-lg transition-colors cursor-pointer ${
                          selectedTech.desiredLevel === lvl 
                            ? 'bg-[#7C3AED] text-white font-bold' 
                            : 'bg-white dark:bg-black/20 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Log Stats Form */}
              <form onSubmit={handleIncrementStats} className="space-y-4">
                <h4 className="text-xs uppercase font-mono text-slate-500 dark:text-slate-400 font-bold">Registrar Novo Avanço</h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Adicionar Horas de Estudo</label>
                    <input 
                      id="log-tech-hours"
                      type="number" 
                      step="0.5" 
                      min="0"
                      value={hoursToAdd}
                      onChange={e => setHoursToAdd(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none focus:border-[#7C3AED] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Certificados Obtidos</label>
                    <input 
                      id="log-tech-certs"
                      type="number" 
                      min="0"
                      value={certsToAdd}
                      onChange={e => setCertsToAdd(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Cursos Concluídos</label>
                    <input 
                      id="log-tech-courses"
                      type="number" 
                      min="0"
                      value={coursesToAdd}
                      onChange={e => setCoursesToAdd(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-sans font-bold">Projetos Relacionados</label>
                    <input 
                      id="log-tech-projects"
                      type="number" 
                      min="0"
                      value={projectsToAdd}
                      onChange={e => setProjectsToAdd(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <button 
                  id="submit-advance-btn"
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#34C759] to-[#7C3AED] hover:from-emerald-600 hover:to-purple-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shadow-md"
                >
                  <Flame className="w-4 h-4 fill-current" /> Confirmar Avanço de Capacitação
                </button>

                <p className="text-[10px] text-slate-500 dark:text-slate-500 font-mono text-center font-medium">
                  *Ao registrar avanços, o Horizon credita XP proporcional para acelerar o seu nível pessoal!*
                </p>
              </form>

            </div>
          ) : (
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-12 rounded-3xl text-center text-slate-500 dark:text-slate-400 font-medium shadow-xl">
              Selecione uma tecnologia à esquerda para auditar ou certificar avanços.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
