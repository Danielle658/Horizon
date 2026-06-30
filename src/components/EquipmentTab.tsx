import React, { useState } from 'react';
import { Equipment } from '../types';
import { 
  Laptop, Tablet, Camera, Monitor, Smartphone, Plus, Trash2, 
  DollarSign, TrendingUp, Sparkles, CheckCircle, Flame 
} from 'lucide-react';

interface EquipmentTabProps {
  equipments: Equipment[];
  setEquipments: React.Dispatch<React.SetStateAction<Equipment[]>>;
  addXp: (amount: number) => void;
}

export default function EquipmentTab({ equipments, setEquipments, addXp }: EquipmentTabProps) {
  // Add equipment states
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [saved, setSaved] = useState('');
  const [priority, setPriority] = useState<'Alta' | 'Média' | 'Baixa'>('Média');
  const [category, setCategory] = useState<'Tablet' | 'Notebook' | 'Câmera' | 'Monitor' | 'Setup' | 'Outro'>('Notebook');

  // Contribute money state
  const [selectedEqId, setSelectedEqId] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState('');
  const [contribMsg, setContribMsg] = useState('');

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isNaN(parseFloat(value))) return;

    const newEq: Equipment = {
      id: `eq-${Date.now()}`,
      name,
      value: parseFloat(value),
      saved: parseFloat(saved) || 0,
      priority,
      category
    };

    setEquipments(prev => [...prev, newEq]);
    addXp(120); // XP Reward for optimizing resources

    // Reset
    setName('');
    setValue('');
    setSaved('');
    setPriority('Média');
    setShowAddForm(false);
  };

  const handleDeleteEquipment = (id: string) => {
    if (confirm('Tem certeza de que deseja remover este equipamento de sua lista de desejos?')) {
      setEquipments(prev => prev.filter(eq => eq.id !== id));
    }
  };

  const handleContribute = (id: string) => {
    const amount = parseFloat(contributionAmount);
    if (isNaN(amount) || amount <= 0) return;

    setEquipments(prev => prev.map(eq => {
      if (eq.id === id) {
        const nextSaved = Math.min(eq.value, eq.saved + amount);
        const addedValue = nextSaved - eq.saved;
        if (addedValue > 0) {
          // Gain XP proportional to contribution: 0.2 XP per Real saved!
          addXp(Math.round(addedValue * 0.2));
        }

        setContribMsg(`R$ ${amount.toLocaleString('pt-BR')} adicionados com sucesso ao seu ${eq.name}!`);
        setTimeout(() => setContribMsg(''), 4000);

        return { ...eq, saved: nextSaved };
      }
      return eq;
    }));

    setContributionAmount('');
    setSelectedEqId(null);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Tablet': return <Tablet className="w-5 h-5" />;
      case 'Notebook': return <Laptop className="w-5 h-5" />;
      case 'Câmera': return <Camera className="w-5 h-5" />;
      case 'Monitor': return <Monitor className="w-5 h-5" />;
      default: return <Smartphone className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (prio: string) => {
    switch (prio) {
      case 'Alta': return 'bg-red-500/15 text-red-400 border border-red-500/25';
      case 'Média': return 'bg-amber-500/15 text-amber-400 border border-amber-500/25';
      default: return 'bg-gray-700/50 text-gray-400 border border-gray-600/30';
    }
  };

  // Stats
  const totalCost = equipments.reduce((sum, eq) => sum + eq.value, 0);
  const totalSaved = equipments.reduce((sum, eq) => sum + eq.saved, 0);
  const remainingTarget = totalCost - totalSaved;

  return (
    <div id="equipment-tab" className="space-y-6">
      
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold font-sans">Total do Setup de Sonhos</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">R$ {totalCost.toLocaleString('pt-BR')}</div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Valor somado de todos os equipamentos</span>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold font-sans">Total Já Economizado</span>
          <div className="text-2xl font-bold font-mono text-[#34C759] mt-1">R$ {totalSaved.toLocaleString('pt-BR')}</div>
          <span className="text-[10px] text-[#34C759] font-bold">
            {totalCost > 0 ? Math.round((totalSaved / totalCost) * 100) : 0}% da meta geral batida!
          </span>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold font-sans">Restante Necessário (Gap)</span>
          <div className="text-2xl font-bold font-mono text-amber-500 dark:text-amber-400 mt-1">R$ {remainingTarget.toLocaleString('pt-BR')}</div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Quanto falta para completar o setup ideal</span>
        </div>
      </div>

      {/* Control panel for contribution messages */}
      {contribMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-2xl flex items-center gap-2 font-semibold">
          <CheckCircle className="w-5 h-5 text-[#34C759]" />
          <span>{contribMsg}</span>
        </div>
      )}

      {/* Main split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Equipments list (8 columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono">Listagem de Equipamentos</h3>
              <button 
                id="toggle-add-eq"
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-[#34C759]/15 hover:bg-[#34C759]/25 text-[#34C759] border border-[#34C759]/20 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Item
              </button>
            </div>

            {/* Equipments Loop Cards */}
            <div className="space-y-4">
              {equipments.map((eq) => {
                const percent = Math.round((eq.saved / eq.value) * 100);
                const costToGo = eq.value - eq.saved;

                return (
                  <div key={eq.id} className="bg-slate-100/30 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#7C3AED]/10 p-2.5 rounded-xl text-[#7C3AED]">
                          {getCategoryIcon(eq.category)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white font-display flex items-center gap-1.5">
                            {eq.name}
                            <span className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${getPriorityColor(eq.priority)}`}>
                              {eq.priority}
                            </span>
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium">Categoria: {eq.category}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          id={`contribute-eq-trigger-${eq.id}`}
                          onClick={() => setSelectedEqId(eq.id === selectedEqId ? null : eq.id)}
                          className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] uppercase font-mono px-2.5 py-1 rounded-lg border border-blue-500/20 cursor-pointer font-bold"
                        >
                          Economizar
                        </button>
                        <button 
                          id={`delete-eq-${eq.id}`}
                          onClick={() => handleDeleteEquipment(eq.id)}
                          className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Inline contribution drawer */}
                    {selectedEqId === eq.id && (
                      <div className="bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 p-3 rounded-xl flex gap-2 items-center">
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-mono font-semibold">Valor Poupado (R$):</span>
                        <input 
                          id={`contrib-amount-input-${eq.id}`}
                          type="number" 
                          placeholder="Ex: 250"
                          value={contributionAmount}
                          onChange={e => setContributionAmount(e.target.value)}
                          className="flex-1 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2 rounded-lg font-mono focus:outline-none"
                        />
                        <button
                          id={`contrib-confirm-btn-${eq.id}`}
                          onClick={() => handleContribute(eq.id)}
                          className="bg-[#34C759] text-white text-[10px] font-bold px-3 py-2 rounded-lg transition-all cursor-pointer"
                        >
                          Confirmar
                        </button>
                      </div>
                    )}

                    {/* Progress tracking */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium">
                        <span>Poupado: R$ {eq.saved.toLocaleString('pt-BR')} de R$ {eq.value.toLocaleString('pt-BR')}</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-black/30 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-[#34C759] h-full" 
                          style={{ width: `${Math.min(100, percent)}%` }}
                        />
                      </div>
                      {costToGo > 0 && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono text-right font-medium">Falta poupar: R$ {costToGo.toLocaleString('pt-BR')}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: New equipment register form (4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1">
              <TrendingUp className="text-[#34C759] w-4 h-4" /> Planejar Aquisição
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans font-medium">
              Antes de comprar por impulso, planeje o aporte no Horizon. Isso gera maturidade financeira e foca na sua real produtividade.
            </p>

            <form onSubmit={handleAddEquipment} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Nome do Equipamento</label>
                <input 
                  id="eq-name-input"
                  type="text" 
                  required 
                  placeholder="Ex: Teclado Keychron K3"
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Preço Estimado</label>
                  <input 
                    id="eq-price-input"
                    type="number" 
                    required 
                    placeholder="Ex: 850"
                    value={value} 
                    onChange={e => setValue(e.target.value)}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Economizado Inicial</label>
                  <input 
                    id="eq-saved-input"
                    type="number" 
                    placeholder="Ex: 100"
                    value={saved} 
                    onChange={e => setSaved(e.target.value)}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Prioridade</label>
                  <select 
                    id="eq-prio-select"
                    value={priority} 
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Categoria</label>
                  <select 
                    id="eq-cat-select"
                    value={category} 
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Notebook">Notebook</option>
                    <option value="Câmera">Câmera</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Setup">Setup</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <button 
                id="submit-eq-btn"
                type="submit" 
                className="w-full bg-[#7C3AED] hover:bg-[#6d28d9] text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
              >
                Planejar Compra (+120 XP)
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
