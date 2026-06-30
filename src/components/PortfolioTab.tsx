import React, { useState } from 'react';
import { PortfolioProject } from '../types';
import { Briefcase, Github, Plus, Trash2, ExternalLink, Code, Lightbulb, Compass, AlertCircle } from 'lucide-react';

interface PortfolioTabProps {
  projects: PortfolioProject[];
  setProjects: React.Dispatch<React.SetStateAction<PortfolioProject[]>>;
  addXp: (amount: number) => void;
}

export default function PortfolioTab({ projects, setProjects, addXp }: PortfolioTabProps) {
  const [showAddProject, setShowAddProject] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [techsString, setTechsString] = useState('Flutter, Supabase, PostgreSQL');
  const [problemSolved, setProblemSolved] = useState('');
  const [learning, setLearning] = useState('');
  const [status, setStatus] = useState<'Ideia' | 'Em Andamento' | 'Concluído'>('Em Andamento');
  const [githubUrl, setGithubUrl] = useState('');
  const [futureImprovements, setFutureImprovements] = useState('');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProject: PortfolioProject = {
      id: `p-${Date.now()}`,
      name,
      description,
      technologies: techsString.split(',').map(t => t.trim()).filter(t => t.length > 0),
      problemSolved,
      learning,
      status,
      githubUrl: githubUrl || 'https://github.com/danielle-dev',
      futureImprovements
    };

    setProjects(prev => [newProject, ...prev]);
    addXp(250); // XP Reward for publishing research or code portfolio!

    // Reset Form
    setName('');
    setDescription('');
    setTechsString('Flutter, Supabase');
    setProblemSolved('');
    setLearning('');
    setGithubUrl('');
    setFutureImprovements('');
    setShowAddProject(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Tem certeza de que deseja remover este projeto de seu portfólio?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div id="portfolio-tab" className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Code className="text-[#34C759] w-6 h-6" /> Portfólio & Projetos de Engenharia
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl font-medium">
            Projetos práticos são o maior ativo de um engenheiro. Registre seus hardwares embarcados, firmware IoT, copiladores e softwares robustos para gerar valor de autoridade técnica.
          </p>
        </div>

        <button 
          id="toggle-add-project"
          onClick={() => setShowAddProject(!showAddProject)}
          className="bg-[#34C759] hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" /> Cadastrar Projeto
        </button>
      </div>

      {/* Add Project Modal / Form */}
      {showAddProject && (
        <form onSubmit={handleAddProject} className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-base font-display font-bold text-slate-800 dark:text-white">Novo Projeto de Engenharia</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Nome do Projeto</label>
                <input 
                  id="proj-name-input"
                  type="text" 
                  required 
                  placeholder="Ex: Drone Autônomo com Raspberry Pi"
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Tecnologias Usadas (separadas por vírgula)</label>
                <input 
                  id="proj-techs-input"
                  type="text" 
                  placeholder="Flutter, C++, Arduino, Supabase, Linux"
                  value={techsString} 
                  onChange={e => setTechsString(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Status do Projeto</label>
                  <select 
                    id="proj-status-select"
                    value={status} 
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                  >
                    <option value="Ideia">Ideia</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Link do GitHub</label>
                  <input 
                    id="proj-git-input"
                    type="url" 
                    placeholder="https://github.com/..."
                    value={githubUrl} 
                    onChange={e => setGithubUrl(e.target.value)}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Descrição Resumida</label>
                <textarea 
                  id="proj-desc-input"
                  rows={2}
                  placeholder="O que o sistema faz e qual é a arquitetura principal?"
                  value={description} 
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Problema Real Resolvido</label>
                <textarea 
                  id="proj-prob-input"
                  rows={2}
                  placeholder="Qual dor social, física ou operacional esse hardware/software soluciona?"
                  value={problemSolved} 
                  onChange={e => setProblemSolved(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Principais Aprendizados de Engenharia</label>
                <textarea 
                  id="proj-learn-input"
                  rows={2}
                  placeholder="Algoritmos de otimização, concorrência, drivers de hardware..."
                  value={learning} 
                  onChange={e => setLearning(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Melhorias e Evoluções Futuras</label>
                <textarea 
                  id="proj-improve-input"
                  rows={2}
                  placeholder="Refatorar padrões, migrar banco, adicionar IA, etc."
                  value={futureImprovements} 
                  onChange={e => setFutureImprovements(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              id="cancel-proj-btn"
              type="button" 
              onClick={() => setShowAddProject(false)}
              className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-bold cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              id="submit-proj-btn"
              type="submit" 
              className="bg-[#7C3AED] hover:bg-[#6d28d9] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
            >
              Publicar Projeto (+250 XP)
            </button>
          </div>
        </form>
      )}

      {/* Projects Cards List Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lg">
            
            {/* Visual Top Badge and Tags */}
            <div className="p-5 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/20 flex justify-between items-start">
              <div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md font-bold uppercase ${
                  proj.status === 'Concluído' ? 'bg-[#34C759]/15 text-[#34C759] border border-[#34C759]/30' : 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                }`}>
                  {proj.status}
                </span>
                <h3 className="text-base font-display font-bold text-slate-800 dark:text-white mt-1.5">{proj.name}</h3>
              </div>
              <button 
                id={`delete-proj-${proj.id}`}
                onClick={() => handleDeleteProject(proj.id)}
                className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-5 space-y-4 flex-1">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium line-clamp-3">
                {proj.description}
              </p>

              {/* Problem Solved */}
              {proj.problemSolved && (
                <div className="p-3 bg-white dark:bg-black/20 rounded-2xl border border-slate-200/50 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#34C759] text-[10px] font-bold uppercase font-mono">
                    <Lightbulb className="w-3.5 h-3.5" /> Dor / Problema Solvido
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-medium">
                    {proj.problemSolved}
                  </p>
                </div>
              )}

              {/* Technical learnings */}
              {proj.learning && (
                <div className="p-3 bg-white dark:bg-black/20 rounded-2xl border border-slate-200/50 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#7C3AED] text-[10px] font-bold uppercase font-mono">
                    <Compass className="w-3.5 h-3.5" /> Aprendizado Técnico
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-200 leading-relaxed font-sans font-medium">
                    {proj.learning}
                  </p>
                </div>
              )}

              {/* Future roadmap for this project */}
              {proj.futureImprovements && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  <span className="font-bold text-slate-700 dark:text-white">Evolução: </span>
                  {proj.futureImprovements}
                </div>
              )}
            </div>

            {/* Footer with technologies and links */}
            <div className="p-5 bg-slate-50/50 dark:bg-black/20 border-t border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex flex-wrap gap-1">
                {proj.technologies.map((t, idx) => (
                  <span key={idx} className="text-[9px] font-mono bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-300/30 dark:border-white/5 font-semibold">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                <a 
                  href={proj.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 font-mono flex items-center gap-1 transition-colors font-semibold"
                >
                  <Code className="w-3.5 h-3.5 text-[#34C759]" /> ver no GitHub
                </a>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">ID: {proj.id.slice(0, 8)}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
