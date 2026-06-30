import React, { useState } from 'react';
import { AcademicSubject, Exam, Task } from '../types';
import { 
  BookOpen, Plus, Trash2, Calendar, FileText, CheckCircle, Clock, 
  Percent, ExternalLink, HelpCircle, AlertTriangle, BookMarked, Layers 
} from 'lucide-react';

interface CollegeTabProps {
  subjects: AcademicSubject[];
  setSubjects: React.Dispatch<React.SetStateAction<AcademicSubject[]>>;
  addXp: (amount: number) => void;
}

export default function CollegeTab({ subjects, setSubjects, addXp }: CollegeTabProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  
  // States for adding subject
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubSemester, setNewSubSemester] = useState('4');
  const [newSubProfessor, setNewSubProfessor] = useState('');
  const [newSubSchedule, setNewSubSchedule] = useState('');
  const [newSubCredits, setNewSubCredits] = useState('4');

  // States for adding task/exam
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskType, setNewTaskType] = useState<'Trabalho' | 'Exercício' | 'Projeto'>('Exercício');

  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamDate, setNewExamDate] = useState('');
  const [newExamWeight, setNewExamWeight] = useState('5');

  // State for adding material
  const [newMatName, setNewMatName] = useState('');
  const [newMatCat, setNewMatCat] = useState<'Resumo' | 'Link' | 'Livro' | 'Slides'>('Resumo');

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  // Calculations
  const completedSubjectsCount = subjects.filter(s => s.status === 'Concluído').length;
  const currentSubjectsCount = subjects.filter(s => s.status === 'Em Andamento').length;
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);

  // Compute Overall GPA
  const concludedWithGrades = subjects.filter(s => s.status === 'Concluído' && s.grade > 0);
  const totalConcludedGradeWeight = concludedWithGrades.reduce((sum, s) => sum + (s.grade * s.credits), 0);
  const totalConcludedCredits = concludedWithGrades.reduce((sum, s) => sum + s.credits, 0);
  const overallGPA = totalConcludedCredits > 0 ? (totalConcludedGradeWeight / totalConcludedCredits).toFixed(2) : '8.75';

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    const newSub: AcademicSubject = {
      id: `sub-${Date.now()}`,
      name: newSubName,
      code: newSubCode || 'EC-' + Math.floor(Math.random() * 90 + 10),
      semester: parseInt(newSubSemester) || 4,
      grade: 0.0,
      status: 'Em Andamento',
      professor: newSubProfessor || 'Professor Titular',
      schedule: newSubSchedule || 'A definir',
      credits: parseInt(newSubCredits) || 4,
      attendance: 100,
      exams: [],
      tasks: [],
      materials: []
    };

    setSubjects(prev => [...prev, newSub]);
    setSelectedSubjectId(newSub.id);
    addXp(150); // XP Reward for organizing study workspace

    // Reset Form
    setNewSubName('');
    setNewSubCode('');
    setNewSubProfessor('');
    setNewSubSchedule('');
    setShowAddSubject(false);
  };

  const handleDeleteSubject = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta disciplina do painel?')) {
      const remaining = subjects.filter(s => s.id !== id);
      setSubjects(remaining);
      if (selectedSubjectId === id && remaining.length > 0) {
        setSelectedSubjectId(remaining[0].id);
      }
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedSubjectId) return;

    const newTask: Task = {
      id: `tk-${Date.now()}`,
      title: newTaskTitle,
      dueDate: newTaskDueDate || new Date().toISOString().split('T')[0],
      done: false,
      type: newTaskType
    };

    setSubjects(prev => prev.map(s => {
      if (s.id === selectedSubjectId) {
        return { ...s, tasks: [...s.tasks, newTask] };
      }
      return s;
    }));

    setNewTaskTitle('');
    setNewTaskDueDate('');
    addXp(30);
  };

  const handleToggleTask = (subjectId: string, taskId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        const updatedTasks = s.tasks.map(t => {
          if (t.id === taskId) {
            const nextState = !t.done;
            if (nextState) addXp(50); // Reward for completing homeworks!
            return { ...t, done: nextState };
          }
          return t;
        });
        return { ...s, tasks: updatedTasks };
      }
      return s;
    }));
  };

  const handleDeleteTask = (subjectId: string, taskId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return { ...s, tasks: s.tasks.filter(t => t.id !== taskId) };
      }
      return s;
    }));
  };

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim() || !selectedSubjectId) return;

    const newExam: Exam = {
      id: `ex-${Date.now()}`,
      title: newExamTitle,
      date: newExamDate || new Date().toISOString().split('T')[0],
      weight: parseFloat(newExamWeight) || 5,
      grade: undefined
    };

    setSubjects(prev => prev.map(s => {
      if (s.id === selectedSubjectId) {
        return { ...s, exams: [...s.exams, newExam] };
      }
      return s;
    }));

    setNewExamTitle('');
    setNewExamDate('');
    addXp(40);
  };

  const handleSetExamGrade = (subjectId: string, examId: string, gradeStr: string) => {
    const grade = parseFloat(gradeStr);
    if (isNaN(grade) || grade < 0 || grade > 10) return;

    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        const updatedExams = s.exams.map(ex => {
          if (ex.id === examId) {
            return { ...ex, grade };
          }
          return ex;
        });

        // Compute new final subject grade based on weighted exams
        const gradedExams = updatedExams.filter(ex => ex.grade !== undefined);
        const totalWeight = gradedExams.reduce((sum, ex) => sum + ex.weight, 0);
        const weightedSum = gradedExams.reduce((sum, ex) => sum + ((ex.grade || 0) * ex.weight), 0);
        const finalGrade = totalWeight > 0 ? parseFloat((weightedSum / totalWeight).toFixed(2)) : 0.0;

        // Auto conclude if all exams are graded
        const status = (updatedExams.length > 0 && gradedExams.length === updatedExams.length) ? 'Concluído' : s.status;

        if (grade >= 7) addXp(100); // Reward for high grade!

        return { 
          ...s, 
          exams: updatedExams, 
          grade: finalGrade,
          status: status as any
        };
      }
      return s;
    }));
  };

  const handleDeleteExam = (subjectId: string, examId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        return { ...s, exams: s.exams.filter(ex => ex.id !== examId) };
      }
      return s;
    }));
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatName.trim() || !selectedSubjectId) return;

    setSubjects(prev => prev.map(s => {
      if (s.id === selectedSubjectId) {
        const newMaterials = [
          ...(s.materials || []),
          { name: newMatName, url: '#', category: newMatCat }
        ];
        return { ...s, materials: newMaterials };
      }
      return s;
    }));

    setNewMatName('');
    addXp(20);
  };

  const handleUpdateAttendance = (subjectId: string, amount: number) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        const nextAttendance = Math.min(100, Math.max(0, s.attendance + amount));
        return { ...s, attendance: nextAttendance };
      }
      return s;
    }));
  };

  return (
    <div id="college-tab" className="space-y-6">
      {/* Top Academic Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl flex items-center gap-4 shadow-lg">
          <div className="bg-[#34C759]/15 p-3 rounded-2xl text-[#34C759]">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{overallGPA}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Média Geral (IRA/CR)</div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl flex items-center gap-4 shadow-lg">
          <div className="bg-[#7C3AED]/15 p-3 rounded-2xl text-[#7C3AED]">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{currentSubjectsCount}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Em Andamento</div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl flex items-center gap-4 shadow-lg">
          <div className="bg-blue-500/15 p-3 rounded-2xl text-blue-500 dark:text-blue-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{completedSubjectsCount}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Disciplinas Concluídas</div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl flex items-center gap-4 shadow-lg">
          <div className="bg-amber-500/15 p-3 rounded-2xl text-amber-500 dark:text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{totalCredits}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Créditos Cursados</div>
          </div>
        </div>
      </div>

      {/* Main Core Section Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Subject Selector & Actions (4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-1">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono">Disciplinas</h3>
              <button 
                id="toggle-add-subject"
                onClick={() => setShowAddSubject(!showAddSubject)}
                className="bg-[#34C759]/10 hover:bg-[#34C759]/20 border border-[#34C759]/30 text-[#34C759] text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar
              </button>
            </div>

            {/* Subject Add Form */}
            {showAddSubject && (
              <form onSubmit={handleAddSubject} className="p-4 bg-slate-100/50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5 rounded-2xl space-y-3 shadow-inner">
                <h4 className="text-xs text-slate-800 dark:text-white font-bold uppercase tracking-wider">Nova Disciplina</h4>
                <div>
                  <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Nome da Matéria</label>
                  <input 
                    id="new-sub-name"
                    type="text" 
                    required 
                    placeholder="Sistemas de Controle, etc"
                    value={newSubName} 
                    onChange={e => setNewSubName(e.target.value)}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Código</label>
                    <input 
                      id="new-sub-code"
                      type="text" 
                      placeholder="EC-20"
                      value={newSubCode} 
                      onChange={e => setNewSubCode(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Créditos</label>
                    <select 
                      id="new-sub-credits"
                      value={newSubCredits} 
                      onChange={e => setNewSubCredits(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-1.5 rounded-xl focus:outline-none"
                    >
                      <option value="2">2 créditos</option>
                      <option value="4">4 créditos</option>
                      <option value="6">6 créditos</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Semestre</label>
                    <input 
                      id="new-sub-semester"
                      type="number" 
                      value={newSubSemester} 
                      onChange={e => setNewSubSemester(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold font-sans">Professor</label>
                    <input 
                      id="new-sub-prof"
                      type="text" 
                      placeholder="Dr. Silva"
                      value={newSubProfessor} 
                      onChange={e => setNewSubProfessor(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Horários das Aulas</label>
                  <input 
                    id="new-sub-sched"
                    type="text" 
                    placeholder="Ter e Qui - 08h"
                    value={newSubSchedule} 
                    onChange={e => setNewSubSchedule(e.target.value)}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2 rounded-xl focus:outline-none"
                  />
                </div>
                <button 
                  id="submit-sub-btn"
                  type="submit" 
                  className="w-full bg-[#34C759] hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Salvar Disciplina
                </button>
              </form>
            )}

            {/* Subjects List */}
            <div className="space-y-2">
              {subjects.map((sub) => (
                <div 
                  key={sub.id}
                  onClick={() => setSelectedSubjectId(sub.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                    selectedSubjectId === sub.id 
                      ? 'bg-white/20 dark:bg-white/10 border-slate-300 dark:border-white/20 shadow-inner' 
                      : 'bg-slate-500/5 dark:bg-black/30 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10'
                  }`}
                >
                  <div className="space-y-1 pr-2 truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold">{sub.code}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                        sub.status === 'Concluído' ? 'bg-[#34C759]/15 text-[#34C759]' : 'bg-amber-500/15 text-amber-500 dark:text-amber-400'
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">{sub.name}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{sub.professor}</p>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs font-bold font-mono text-slate-800 dark:text-white">
                      {sub.grade > 0 ? `Média: ${sub.grade}` : 'S/ Nota'}
                    </span>
                    <button 
                      id={`delete-sub-${sub.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSubject(sub.id);
                      }}
                      className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Detailed View of Selected Subject (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          {selectedSubject ? (
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-6 shadow-xl">
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 px-2 py-0.5 rounded-md font-bold">
                      {selectedSubject.code}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                      Semestre {selectedSubject.semester}
                    </span>
                    <span className="text-xs text-[#7C3AED] font-mono font-bold">
                      {selectedSubject.credits} Créditos
                    </span>
                  </div>
                  <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-1">
                    {selectedSubject.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Prof. {selectedSubject.professor} • {selectedSubject.schedule}</p>
                </div>

                {/* Attendance Indicator */}
                <div className="bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-2xl flex items-center gap-3">
                  <div className="text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block font-mono">Presença</span>
                    <span className={`text-base font-bold font-mono ${selectedSubject.attendance < 75 ? 'text-red-500' : 'text-[#34C759]'}`}>
                      {selectedSubject.attendance}%
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button 
                      id="attendance-up"
                      onClick={() => handleUpdateAttendance(selectedSubject.id, 5)}
                      className="bg-slate-200 dark:bg-white/10 hover:bg-emerald-500/25 dark:hover:bg-emerald-500/20 text-slate-800 dark:text-white text-[10px] font-mono px-2 py-0.5 rounded-lg transition-all cursor-pointer font-bold"
                    >
                      +5%
                    </button>
                    <button 
                      id="attendance-down"
                      onClick={() => handleUpdateAttendance(selectedSubject.id, -5)}
                      className="bg-slate-200 dark:bg-white/10 hover:bg-red-500/25 dark:hover:bg-red-500/20 text-slate-800 dark:text-white text-[10px] font-mono px-2 py-0.5 rounded-lg transition-all cursor-pointer font-bold"
                    >
                      -5%
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-grid of Exams vs Homeworks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Exams / Provas Module */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Percent className="w-4 h-4 text-[#7C3AED]" /> Provas / Avaliações
                    </h3>
                  </div>

                  {/* Add Exam inline form */}
                  <form onSubmit={handleAddExam} className="bg-slate-100/50 dark:bg-black/30 p-3 rounded-2xl border border-slate-200/50 dark:border-white/5 space-y-2">
                    <input 
                      id="new-exam-title"
                      type="text" 
                      required 
                      placeholder="Nome da Prova (Ex: P1 - Circuitos)"
                      value={newExamTitle} 
                      onChange={e => setNewExamTitle(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs p-2 rounded-xl focus:outline-none text-slate-900 dark:text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        id="new-exam-date"
                        type="date" 
                        value={newExamDate} 
                        onChange={e => setNewExamDate(e.target.value)}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs p-2 rounded-xl focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select 
                        id="new-exam-weight"
                        value={newExamWeight} 
                        onChange={e => setNewExamWeight(e.target.value)}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs p-1.5 rounded-xl focus:outline-none text-slate-900 dark:text-white font-mono"
                      >
                        <option value="3">Peso 30%</option>
                        <option value="4">Peso 40%</option>
                        <option value="5">Peso 50%</option>
                        <option value="6">Peso 60%</option>
                      </select>
                    </div>
                    <button 
                      id="submit-exam-btn"
                      type="submit" 
                      className="w-full bg-[#7C3AED]/20 hover:bg-[#7C3AED]/35 text-[#7C3AED] border border-[#7C3AED]/30 font-bold text-[10px] uppercase py-2 rounded-xl transition-all cursor-pointer"
                    >
                      Cadastrar Prova
                    </button>
                  </form>

                  {/* Exams List */}
                  <div className="space-y-2">
                    {selectedSubject.exams && selectedSubject.exams.length > 0 ? (
                      selectedSubject.exams.map(ex => (
                        <div key={ex.id} className="bg-slate-100/30 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-3.5 rounded-2xl flex justify-between items-center">
                          <div className="space-y-0.5 pr-1 truncate">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">{ex.title}</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium">Data: {ex.date} • Peso: {ex.weight * 10}%</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <input 
                              id={`exam-grade-input-${ex.id}`}
                              type="number"
                              step="0.1"
                              min="0"
                              max="10"
                              placeholder="Nota"
                              value={ex.grade !== undefined ? ex.grade : ''}
                              onChange={(e) => handleSetExamGrade(selectedSubject.id, ex.id, e.target.value)}
                              className="w-12 text-center bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg p-1 text-xs text-slate-900 dark:text-white font-mono"
                            />
                            <button 
                              id={`delete-exam-${ex.id}`}
                              onClick={() => handleDeleteExam(selectedSubject.id, ex.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-xs text-slate-500 dark:text-slate-400 italic">Nenhuma prova cadastrada nesta disciplina.</p>
                    )}
                  </div>
                </div>

                {/* Homeworks / Trabalhos Module */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[#34C759]" /> Trabalhos & Exercícios
                    </h3>
                  </div>

                  {/* Add Task inline form */}
                  <form onSubmit={handleAddTask} className="bg-slate-100/50 dark:bg-black/30 p-3 rounded-2xl border border-slate-200/50 dark:border-white/5 space-y-2">
                    <input 
                      id="new-task-title"
                      type="text" 
                      required 
                      placeholder="Nome da Tarefa (Ex: Lista de semáforos)"
                      value={newTaskTitle} 
                      onChange={e => setNewTaskTitle(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs p-2 rounded-xl focus:outline-none text-slate-900 dark:text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        id="new-task-due"
                        type="date" 
                        value={newTaskDueDate} 
                        onChange={e => setNewTaskDueDate(e.target.value)}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs p-2 rounded-xl focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select 
                        id="new-task-type"
                        value={newTaskType} 
                        onChange={e => setNewTaskType(e.target.value as any)}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs p-1.5 rounded-xl focus:outline-none text-slate-900 dark:text-white font-mono"
                      >
                        <option value="Exercício">Exercício</option>
                        <option value="Trabalho">Trabalho</option>
                        <option value="Projeto">Projeto</option>
                      </select>
                    </div>
                    <button 
                      id="submit-task-btn"
                      type="submit" 
                      className="w-full bg-[#34C759]/20 hover:bg-[#34C759]/35 text-[#34C759] border border-[#34C759]/30 font-bold text-[10px] uppercase py-2 rounded-xl transition-all cursor-pointer"
                    >
                      Cadastrar Tarefa
                    </button>
                  </form>

                  {/* Tasks List */}
                  <div className="space-y-2">
                    {selectedSubject.tasks && selectedSubject.tasks.length > 0 ? (
                      selectedSubject.tasks.map(t => (
                        <div key={t.id} className="bg-slate-100/30 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-3 rounded-2xl flex justify-between items-center">
                          <div className="flex items-center gap-2 pr-1 truncate">
                            <input 
                              id={`toggle-task-${t.id}`}
                              type="checkbox" 
                              checked={t.done}
                              onChange={() => handleToggleTask(selectedSubject.id, t.id)}
                              className="rounded-md border-slate-300 dark:border-white/20 text-[#7C3AED] focus:ring-[#7C3AED] h-4.5 w-4.5 bg-white dark:bg-black/20 cursor-pointer"
                            />
                            <div className="space-y-0.5 truncate">
                              <h4 className={`text-xs font-bold truncate ${t.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-white'}`}>{t.title}</h4>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium">Prazo: {t.dueDate} • {t.type}</p>
                            </div>
                          </div>
                          <button 
                            id={`delete-task-${t.id}`}
                            onClick={() => handleDeleteTask(selectedSubject.id, t.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer flex-shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-xs text-slate-500 dark:text-slate-400 italic">Nenhum exercício ou trabalho cadastrado.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Study Materials & Links Section */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-4">
                <h3 className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <FileText className="text-blue-500 dark:text-blue-400 w-4 h-4" /> Resumos, Livros e Slides
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Inline Form to add material */}
                  <form onSubmit={handleAddMaterial} className="bg-slate-100/50 dark:bg-black/30 p-3 rounded-2xl border border-slate-200/50 dark:border-white/5 space-y-2">
                    <input 
                      id="new-material-name"
                      type="text" 
                      required 
                      placeholder="Título do Resumo ou Link de Apoio"
                      value={newMatName} 
                      onChange={e => setNewMatName(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs p-2 rounded-xl focus:outline-none text-slate-900 dark:text-white"
                    />
                    <div className="flex gap-2">
                      <select 
                        id="new-material-cat"
                        value={newMatCat} 
                        onChange={e => setNewMatCat(e.target.value as any)}
                        className="flex-1 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs p-1.5 rounded-xl focus:outline-none text-slate-900 dark:text-white font-mono"
                      >
                        <option value="Resumo">Resumo</option>
                        <option value="Link">Link Externo</option>
                        <option value="Livro">Livro Base</option>
                        <option value="Slides">Slides de Aula</option>
                      </select>
                      <button 
                        id="submit-material-btn"
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-[10px] px-4 py-1.5 rounded-xl transition-all cursor-pointer"
                      >
                        Salvar Recurso
                      </button>
                    </div>
                  </form>

                  {/* Materials list */}
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                    {selectedSubject.materials && selectedSubject.materials.length > 0 ? (
                      selectedSubject.materials.map((mat, idx) => (
                        <div key={idx} className="text-xs flex items-center justify-between p-2.5 bg-slate-100/30 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5">
                          <span className="text-slate-700 dark:text-slate-300 truncate font-sans max-w-[200px] flex items-center gap-1.5">
                            <span className="text-[9px] px-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-sm font-mono font-bold">{mat.category}</span>
                            {mat.name}
                          </span>
                          <a href={mat.url} className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors flex items-center gap-0.5 font-bold">
                            Acessar <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 dark:text-slate-500 italic text-xs py-4 text-center">Nenhum arquivo ou link anexado ainda.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic warning indicator */}
              {selectedSubject.attendance < 75 && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 text-xs rounded-2xl flex items-center gap-2.5">
                  <AlertTriangle className="w-4.5 h-4.5 flex-shrink-0 animate-bounce" />
                  <span className="font-semibold">Aviso: Sua presença nesta matéria está abaixo de 75%! Risco de reprovação por falta. Regule seus horários.</span>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-12 rounded-3xl text-center text-slate-500 dark:text-slate-400 shadow-xl">
              <BookOpen className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-500 mb-2" />
              Selecione ou crie uma disciplina para iniciar o controle acadêmico completo de Engenharia da Computação.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
