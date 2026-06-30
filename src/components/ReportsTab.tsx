import React, { useState } from 'react';
import { AcademicSubject, CareerTech, Equipment, FinancialPot, PortfolioProject } from '../types';
import { 
  FileBarChart, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, 
  BookOpen, Award, DollarSign, Calendar, TrendingUp, Layers, BookMarked 
} from 'lucide-react';

interface ReportsTabProps {
  subjects: AcademicSubject[];
  techs: CareerTech[];
  projects: PortfolioProject[];
  pots: FinancialPot[];
  equipments: Equipment[];
}

type Period = 'diário' | 'semanal' | 'mensal' | 'anual';

export default function ReportsTab({
  subjects,
  techs,
  projects,
  pots,
  equipments
}: ReportsTabProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('semanal');

  // Aggregates
  const totalHoursStudied = techs.reduce((sum, t) => sum + t.hoursStudied, 0);
  const finishedProjectsCount = projects.filter(p => p.status === 'Concluído').length;
  const completedCourses = techs.reduce((sum, t) => sum + t.coursesCount, 0);
  const totalCerts = techs.reduce((sum, t) => sum + t.certificatesCount, 0);
  const totalSavedFinances = pots.reduce((sum, p) => sum + p.currentAmount, 0);

  // Compute average academic grade
  const completedSubjects = subjects.filter(s => s.status === 'Concluído' && s.grade > 0);
  const avgGrade = completedSubjects.length > 0 
    ? (completedSubjects.reduce((sum, s) => sum + s.grade, 0) / completedSubjects.length).toFixed(1) 
    : '8.8';

  // Period specific scaling multipliers just to represent logical dashboard variations
  const getPeriodStats = (period: Period) => {
    switch (period) {
      case 'diário':
        return {
          hours: 3.5,
          hoursCompare: '+15%',
          projects: 0,
          projectsCompare: 'Estável',
          courses: 0,
          certs: 0,
          financesSaved: 120,
          financesCompare: '+2%',
          gpa: avgGrade,
          summary: 'Danielle manteve alto foco hoje com foco focado em depuração de Assembly MIPS. O rendimento geral de estudos diários superou a meta mínima de 3 horas.'
        };
      case 'semanal':
        return {
          hours: Math.round(totalHoursStudied * 0.15) || 18,
          hoursCompare: '+8%',
          projects: 1,
          projectsCompare: '+100%',
          courses: 1,
          certs: 0,
          financesSaved: 540,
          financesCompare: '+5%',
          gpa: avgGrade,
          summary: 'Excelente semana acadêmica e profissional. Danielle completou o mini-projeto de circuitos e adicionou novos aportes à poupança de setups de notebook.'
        };
      case 'mensal':
        return {
          hours: Math.round(totalHoursStudied * 0.6) || 72,
          hoursCompare: '+12%',
          projects: 2,
          projectsCompare: '+50%',
          courses: 3,
          certs: 1,
          financesSaved: 2200,
          financesCompare: '+18%',
          gpa: avgGrade,
          summary: 'Mês de alta consistência. Foram concluídas as revisões de domingo, consolidando resumos importantes de Engenharia de Software e garantindo notas superiores a 8.5.'
        };
      case 'anual':
        return {
          hours: totalHoursStudied || 450,
          hoursCompare: '+32% vs ano anterior',
          projects: finishedProjectsCount || 3,
          projectsCompare: 'Alta Produtividade',
          courses: completedCourses || 12,
          certs: totalCerts || 4,
          financesSaved: totalSavedFinances || 15000,
          financesCompare: '+45%',
          gpa: avgGrade,
          summary: 'Análise anual consolidada de altíssimo nível. Danielle demonstrou grande evolução em Flutter, Docker e PostgreSQL, construindo uma marca sólida.'
        };
    }
  };

  const stats = getPeriodStats(selectedPeriod);

  return (
    <div id="reports-tab" className="space-y-6">
      
      {/* Selector Tab Header */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileBarChart className="text-[#34C759] w-6 h-6" /> Centro de Relatórios Consolidados
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Relatórios estatísticos automáticos baseados nos dados acadêmicos, de portfólio e das suas reservas.
          </p>
        </div>

        {/* Period Selector Buttons */}
        <div className="flex bg-slate-100/80 dark:bg-black/20 p-1 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-inner">
          {(['diário', 'semanal', 'mensal', 'anual'] as Period[]).map((p) => (
            <button
              id={`select-period-${p}`}
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`text-xs font-mono font-bold px-4 py-1.5 rounded-lg transition-all capitalize cursor-pointer ${
                selectedPeriod === p 
                  ? 'bg-gradient-to-r from-[#34C759] to-[#7C3AED] text-white shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Main Executive Summary Card */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono border-b border-slate-200 dark:border-white/10 pb-2 flex items-center gap-1.5">
          <Calendar className="text-[#7C3AED] w-4.5 h-4.5" /> Sumário do Ciclo ({selectedPeriod})
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans italic bg-slate-50 dark:bg-black/20 p-4 rounded-2xl border border-slate-200 dark:border-white/5 font-medium">
          "{stats.summary}"
        </p>
      </div>

      {/* Grid of Report KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* studied hours */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-bold">
            <span>Tempo Estudado</span>
            <span className="text-[#34C759] font-mono text-xs flex items-center gap-0.5 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> {stats.hoursCompare}
            </span>
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
            {stats.hours} <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">horas</span>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">Total acumulado de esforço</div>
        </div>

        {/* projects completed */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-bold">
            <span>Projetos Concluídos</span>
            <span className="text-[#34C759] font-mono text-xs flex items-center gap-0.5 font-bold">
              {stats.projectsCompare}
            </span>
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
            {stats.projects} <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">sprint</span>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">No portfólio de engenharia</div>
        </div>

        {/* Finances Saved */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-bold">
            <span>Finanças Guardadas</span>
            <span className="text-[#34C759] font-mono text-xs flex items-center gap-0.5 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> {stats.financesCompare}
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white truncate">
            R$ {stats.financesSaved.toLocaleString('pt-BR')}
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">Poupados em todos os caixas</div>
        </div>

        {/* academic performance */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl space-y-2 shadow-lg">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-bold">
            <span>Média Acadêmica</span>
            <span className="text-blue-500 dark:text-blue-400 font-mono text-xs font-bold">Excelente</span>
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
            {stats.gpa}
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">Média ponderada do CR</div>
        </div>

      </div>

      {/* Comparisons and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* University & Courses Tracker */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-white/10">
            <BookMarked className="text-purple-500 dark:text-purple-400 w-4.5 h-4.5" /> Distribuição de Conhecimento
          </h3>
          
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between p-3 bg-slate-100/50 dark:bg-black/20 rounded-xl font-medium text-slate-700 dark:text-slate-300">
              <span className="text-slate-500 dark:text-slate-400">Total de Certificados Ativos</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold">{totalCerts}</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-100/50 dark:bg-black/20 rounded-xl font-medium text-slate-700 dark:text-slate-300">
              <span className="text-slate-500 dark:text-slate-400">Cursos de Extensão Concluídos</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold">{completedCourses}</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-100/50 dark:bg-black/20 rounded-xl font-medium text-slate-700 dark:text-slate-300">
              <span className="text-slate-500 dark:text-slate-400">Disciplinas Cursadas C/ Sucesso</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold">{completedSubjects.length}</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-100/50 dark:bg-black/20 rounded-xl font-medium text-slate-700 dark:text-slate-300">
              <span className="text-slate-500 dark:text-slate-400">Fidelidade às Revisões de Domingo</span>
              <span className="text-[#34C759] font-bold">100%</span>
            </div>
          </div>
        </div>

        {/* Financial comparison table */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-white/10">
            <TrendingUp className="text-[#34C759] w-4.5 h-4.5" /> Auditoria de Metas do Setup
          </h3>

          <div className="space-y-3">
            {equipments.map(eq => {
              const remaining = eq.value - eq.saved;
              return (
                <div key={eq.id} className="flex justify-between items-center text-xs p-1">
                  <span className="text-slate-600 dark:text-slate-300 font-sans truncate max-w-[180px] font-medium">{eq.name}</span>
                  <span className={`font-mono font-bold ${remaining === 0 ? 'text-[#34C759]' : 'text-amber-500 dark:text-amber-400'}`}>
                    {remaining === 0 ? 'Concluído!' : `Falta R$ ${remaining.toLocaleString('pt-BR')}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
