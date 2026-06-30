import React, { useState, useEffect } from 'react';
import { WeeklyReview } from '../types';
import { Calendar, HelpCircle, Save, Award, Clipboard, CheckCircle, ChevronDown, BookOpen } from 'lucide-react';

interface WeeklyReviewTabProps {
  reviews: WeeklyReview[];
  setReviews: React.Dispatch<React.SetStateAction<WeeklyReview[]>>;
  addXp: (amount: number) => void;
}

export default function WeeklyReviewTab({ reviews, setReviews, addXp }: WeeklyReviewTabProps) {
  const [showForm, setShowForm] = useState(false);
  
  // Questionnaire states
  const [progressed, setProgressed] = useState('');
  const [learned, setLearned] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [proudOf, setProudOf] = useState('');
  const [toImprove, setToImprove] = useState('');
  const [focusNextWeek, setFocusNextWeek] = useState('');

  const [lastSummaryMsg, setLastSummaryMsg] = useState('');

  useEffect(() => {
    // Auto trigger on Sunday check
    const today = new Date();
    if (today.getDay() === 0 && reviews.length === 0) {
      setShowForm(true);
    }
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progressed.trim() || !learned.trim()) return;

    // Build automated smart summary synthesis based on answers
    const generatedSummary = `Danielle concluiu sua revisão com maestria. Nesta semana, focou ativamente em progredir em: "${progressed}". Teve como maior conquista de aprendizado: "${learned}", superando a barreira de "${difficulty}". O orgulho maior foi "${proudOf}". O planejamento para melhorias foca em "${toImprove}" com o objetivo central definido para a próxima semana: "${focusNextWeek}".`;

    const newReview: WeeklyReview = {
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      progressed,
      learned,
      difficulty,
      proudOf,
      toImprove,
      focusNextWeek,
      weeklySummary: generatedSummary
    };

    setReviews(prev => [newReview, ...prev]);
    addXp(300); // Massive XP for finishing weekly audit!
    setLastSummaryMsg('Revisão de Domingo salva! +300 XP e resumo gerado abaixo.');

    // Clear
    setProgressed('');
    setLearned('');
    setDifficulty('');
    setProudOf('');
    setToImprove('');
    setFocusNextWeek('');
    setShowForm(false);

    setTimeout(() => setLastSummaryMsg(''), 6000);
  };

  return (
    <div id="weekly-review-tab" className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded border border-purple-500/25 uppercase font-bold">
              Retrospectiva & Melhoria Contínua
            </span>
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clipboard className="text-[#34C759] w-6 h-6" /> Auditoria e Revisão Semanal de Domingo
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl font-medium">
              "Avaliar o passado é calibrar o futuro." Responda às 6 perguntas todo domingo para analisar seu ritmo de estudos, celebrar conquistas e focar no que realmente importa.
            </p>
          </div>

          <button 
            id="start-review-btn"
            onClick={() => setShowForm(!showForm)}
            className="bg-[#7C3AED] hover:bg-[#6d28d9] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-[#7C3AED]/20 cursor-pointer"
          >
            {showForm ? 'Fechar Questionário' : 'Iniciar Revisão Agora'}
          </button>
        </div>
      </div>

      {lastSummaryMsg && (
        <div className="p-4 bg-emerald-50/80 dark:bg-[#121c16]/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-[#34C759] text-xs rounded-xl flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-[#34C759]" />
          <span className="font-medium">{lastSummaryMsg}</span>
        </div>
      )}

      {/* Review Active Form */}
      {showForm && (
        <form onSubmit={handleSubmitReview} className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono border-b border-slate-200 dark:border-white/10 pb-2 flex items-center gap-2">
            <Calendar className="text-[#34C759] w-4.5 h-4.5" /> Formulário de Retrospectiva Semanal
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">1. O que eu avancei essa semana?</label>
              <textarea 
                id="review-progressed"
                required
                rows={2}
                placeholder="Ex: Entreguei o circuito sequencial da faculdade e configurei o banco Supabase."
                value={progressed}
                onChange={e => setProgressed(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">2. O que de mais valioso eu aprendi?</label>
              <textarea 
                id="review-learned"
                required
                rows={2}
                placeholder="Ex: Entendi profundamente políticas de RLS e como o escalonador preemptivo funciona no kernel."
                value={learned}
                onChange={e => setLearned(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">3. Qual foi minha maior dificuldade técnica?</label>
              <textarea 
                id="review-difficulty"
                required
                rows={2}
                placeholder="Ex: Depuração de race conditions nas pthreads em C."
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">4. Do que eu mais me orgulho nesta semana?</label>
              <textarea 
                id="review-proud"
                required
                rows={2}
                placeholder="Ex: Manter a sequência de estudos em 8 dias seguidos sem falhar."
                value={proudOf}
                onChange={e => setProudOf(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">5. O que eu sinto que devo melhorar no meu foco?</label>
              <textarea 
                id="review-to-improve"
                required
                rows={2}
                placeholder="Ex: Reduzir tempo no celular nas primeiras horas da manhã."
                value={toImprove}
                onChange={e => setToImprove(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">6. Qual será meu foco absoluto para a próxima semana?</label>
              <textarea 
                id="review-focus"
                required
                rows={2}
                placeholder="Ex: Finalizar a montagem do protótipo IoT do Vertex Lab."
                value={focusNextWeek}
                onChange={e => setFocusNextWeek(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              id="submit-review-btn"
              type="submit"
              className="bg-[#34C759] hover:bg-emerald-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" /> Finalizar Revisão e Resumir (+300 XP)
            </button>
          </div>
        </form>
      )}

      {/* Reviews History */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono">Histórico de Resumos Semanais</h3>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/10">
                  <span className="text-slate-800 dark:text-white font-bold text-xs flex items-center gap-1.5 font-mono">
                    <Calendar className="text-[#34C759] w-4 h-4" /> Semana de {rev.date}
                  </span>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold font-mono bg-purple-500/10 px-2.5 py-0.5 rounded">
                    Resumo Gerado
                  </span>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans italic bg-slate-50 dark:bg-black/40 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 font-medium">
                  "{rev.weeklySummary}"
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] pt-1.5">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-bold font-mono">O QUE AVANÇOU:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{rev.progressed}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-bold font-mono">MAIOR DIFICULDADE:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{rev.difficulty}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-bold font-mono">FOCO DA PRÓXIMA SEMANA:</span>
                    <span className="text-slate-800 dark:text-white font-bold">{rev.focusNextWeek}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-xs font-medium">
            <BookOpen className="w-10 h-10 mx-auto text-slate-400 dark:text-slate-600 mb-2 opacity-75" />
            Nenhuma revisão semanal registrada ainda. Elas abrem automaticamente aos domingos, ou você pode registrar clicando no botão acima.
          </div>
        )}
      </div>

    </div>
  );
}
