import React, { useState } from 'react';
import { BusinessMetric } from '../types';
import { 
  Building2, Plus, CheckSquare, Trash2, ArrowUpRight, Award, 
  Settings, Users, Briefcase, FileText, CheckCircle, Flame 
} from 'lucide-react';

interface BusinessTabProps {
  business: BusinessMetric;
  setBusiness: React.Dispatch<React.SetStateAction<BusinessMetric>>;
  addXp: (amount: number) => void;
}

export default function BusinessTab({ business, setBusiness, addXp }: BusinessTabProps) {
  // Add service state
  const [showAddService, setShowAddService] = useState(false);
  const [srvName, setSrvName] = useState('');
  const [srvPrice, setSrvPrice] = useState('');
  const [srvDesc, setSrvDesc] = useState('');

  // Add client state
  const [showAddClient, setShowAddClient] = useState(false);
  const [cliName, setCliName] = useState('');
  const [cliStatus, setCliStatus] = useState<'Lead' | 'Ativo' | 'Finalizado'>('Lead');
  const [cliValue, setCliValue] = useState('');

  // Add goal state
  const [newGoalText, setNewGoalText] = useState('');

  // Editing core info
  const [editCore, setEditCore] = useState(false);
  const [brandName, setBrandName] = useState(business.brandName);
  const [mission, setMission] = useState(business.mission);
  const [vision, setVision] = useState(business.vision);
  const [valuesString, setValuesString] = useState(business.values.join(', '));

  const handleSaveCore = (e: React.FormEvent) => {
    e.preventDefault();
    setBusiness(prev => ({
      ...prev,
      brandName,
      mission,
      vision,
      values: valuesString.split(',').map(v => v.trim()).filter(v => v.length > 0)
    }));
    setEditCore(false);
    addXp(100);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvName.trim()) return;

    const newService = {
      id: `srv-${Date.now()}`,
      name: srvName,
      price: parseFloat(srvPrice) || 0,
      description: srvDesc
    };

    setBusiness(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
    addXp(80);

    setSrvName('');
    setSrvPrice('');
    setSrvDesc('');
    setShowAddService(false);
  };

  const handleDeleteService = (id: string) => {
    setBusiness(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliName.trim()) return;

    const val = parseFloat(cliValue) || 0;
    const newClient = {
      id: `cli-${Date.now()}`,
      name: cliName,
      status: cliStatus,
      value: val
    };

    setBusiness(prev => {
      const nextRevenue = cliStatus === 'Ativo' ? prev.currentRevenue + val : prev.currentRevenue;
      return {
        ...prev,
        clients: [...prev.clients, newClient],
        currentRevenue: nextRevenue
      };
    });
    addXp(120);

    setCliName('');
    setCliValue('');
    setCliStatus('Lead');
    setShowAddClient(false);
  };

  const handleToggleGoal = (index: number) => {
    setBusiness(prev => {
      const updatedGoals = prev.strategicGoals.map((g, idx) => {
        if (idx === index) {
          const nextState = !g.completed;
          if (nextState) addXp(150); // Strategic milestone complete!
          return { ...g, completed: nextState };
        }
        return g;
      });
      return { ...prev, strategicGoals: updatedGoals };
    });
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;

    setBusiness(prev => ({
      ...prev,
      strategicGoals: [...prev.strategicGoals, { text: newGoalText, completed: false }]
    }));
    addXp(50);
    setNewGoalText('');
  };

  const handleDeleteGoal = (index: number) => {
    setBusiness(prev => ({
      ...prev,
      strategicGoals: prev.strategicGoals.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div id="business-tab" className="space-y-6">
      {/* Top Brand Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#34C759] bg-[#34C759]/10 px-2.5 py-1 rounded-full border border-[#34C759]/20 font-bold">
              Conselho Administrativo & Startup
            </span>
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
              {business.brandName} <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">by Danielle Dev</span>
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 italic max-w-xl font-medium">
              "Missão: {business.mission}"
            </p>
          </div>

          <button 
            id="edit-core-btn"
            onClick={() => {
              setEditCore(!editCore);
              // prefill
              setBrandName(business.brandName);
              setMission(business.mission);
              setVision(business.vision);
              setValuesString(business.values.join(', '));
            }}
            className="text-xs bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all cursor-pointer font-bold shadow-sm"
          >
            {editCore ? 'Cancelar Edição' : 'Editar Identidade'}
          </button>
        </div>
      </div>

      {/* Identidade Form */}
      {editCore && (
        <form onSubmit={handleSaveCore} className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-5 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase font-mono">Editar Identidade da Startup</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Nome de Marca</label>
              <input 
                id="brand-name-edit"
                type="text" 
                value={brandName} 
                onChange={e => setBrandName(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Valores (separados por vírgula)</label>
              <input 
                id="brand-values-edit"
                type="text" 
                value={valuesString} 
                onChange={e => setValuesString(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Missão</label>
              <textarea 
                id="brand-mission-edit"
                rows={2}
                value={mission} 
                onChange={e => setMission(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Visão</label>
              <textarea 
                id="brand-vision-edit"
                rows={2}
                value={vision} 
                onChange={e => setVision(e.target.value)}
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
              />
            </div>
          </div>
          <button 
            id="save-core-btn"
            type="submit" 
            className="bg-[#34C759] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            Salvar Identidade Corporativa
          </button>
        </form>
      )}

      {/* Main Corporate Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Services & Clients CRM (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Services Section */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Briefcase className="text-[#34C759] w-4 h-4" /> Portfólio de Serviços
              </h3>
              <button 
                id="toggle-add-srv"
                onClick={() => setShowAddService(!showAddService)}
                className="bg-[#34C759]/10 hover:bg-[#34C759]/20 text-[#34C759] border border-[#34C759]/30 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Serviço
              </button>
            </div>

            {/* Add service form */}
            {showAddService && (
              <form onSubmit={handleAddService} className="p-4 bg-slate-100/50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5 rounded-2xl space-y-3 shadow-inner">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Nome do Serviço</label>
                    <input 
                      id="srv-name-input"
                      type="text" 
                      required 
                      placeholder="Ex: Desenvolvimento Firmware"
                      value={srvName} 
                      onChange={e => setSrvName(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Preço Médio (R$)</label>
                    <input 
                      id="srv-price-input"
                      type="number" 
                      required 
                      placeholder="Ex: 5000"
                      value={srvPrice} 
                      onChange={e => setSrvPrice(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl font-mono focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-sans font-bold">Escopo do Serviço</label>
                  <input 
                    id="srv-desc-input"
                    type="text" 
                    placeholder="Ex: Codificação em C++/RTOS, 1 ano de suporte"
                    value={srvDesc} 
                    onChange={e => setSrvDesc(e.target.value)}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                  />
                </div>
                <button 
                  id="submit-srv-btn"
                  type="submit" 
                  className="bg-[#34C759] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  Salvar Serviço (+80 XP)
                </button>
              </form>
            )}

            {/* Services List */}
            <div className="space-y-2">
              {business.services.map(srv => (
                <div key={srv.id} className="p-3 bg-slate-100/30 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-2xl flex justify-between items-center text-xs">
                  <div className="pr-2 truncate">
                    <h4 className="text-slate-800 dark:text-white font-bold truncate">{srv.name}</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">{srv.description}</p>
                  </div>
                  <div className="text-right flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-[#34C759] font-bold">R$ {srv.price.toLocaleString('pt-BR')}</span>
                    <button 
                      id={`delete-srv-${srv.id}`}
                      onClick={() => handleDeleteService(srv.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CRM Clients Section */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Users className="text-[#7C3AED] w-4 h-4" /> CRM de Clientes & Projetos
              </h3>
              <button 
                id="toggle-add-cli"
                onClick={() => setShowAddClient(!showAddClient)}
                className="bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Cliente
              </button>
            </div>

            {/* Add client form */}
            {showAddClient && (
              <form onSubmit={handleAddClient} className="p-4 bg-slate-100/50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5 rounded-2xl space-y-3 shadow-inner">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Nome do Cliente</label>
                    <input 
                      id="cli-name-input"
                      type="text" 
                      required 
                      placeholder="Ex: SmartFarm Ltda"
                      value={cliName} 
                      onChange={e => setCliName(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Faturamento Estimado</label>
                    <input 
                      id="cli-val-input"
                      type="number" 
                      placeholder="Ex: 8000"
                      value={cliValue} 
                      onChange={e => setCliValue(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Fase do Funil</label>
                    <select 
                      id="cli-status-select"
                      value={cliStatus} 
                      onChange={e => setCliStatus(e.target.value as any)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2 rounded-xl focus:outline-none"
                    >
                      <option value="Lead">Lead (Negociação)</option>
                      <option value="Ativo">Contrato Ativo</option>
                      <option value="Finalizado">Concluído</option>
                    </select>
                  </div>
                </div>
                <button 
                  id="submit-cli-btn"
                  type="submit" 
                  className="bg-[#7C3AED] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-600 transition-colors cursor-pointer"
                >
                  Confirmar Contrato (+120 XP)
                </button>
              </form>
            )}

            {/* Clients List */}
            <div className="space-y-2">
              {business.clients.map(cli => (
                <div key={cli.id} className="p-3 bg-slate-100/30 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-2xl flex justify-between items-center text-xs">
                  <div className="space-y-0.5">
                    <h4 className="text-slate-800 dark:text-white font-bold font-sans">{cli.name}</h4>
                    <span className={`text-[9px] px-2 py-0.2 rounded-md font-mono font-bold uppercase ${
                      cli.status === 'Ativo' ? 'bg-[#34C759]/10 text-[#34C759]' : cli.status === 'Lead' ? 'bg-amber-500/10 text-amber-500 dark:text-amber-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {cli.status}
                    </span>
                  </div>
                  <div className="font-mono text-slate-700 dark:text-slate-200 font-bold">
                    R$ {cli.value.toLocaleString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: OKRs / Strategic Goals (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-white/10">
              <CheckSquare className="text-purple-500 dark:text-purple-400 w-4 h-4" /> Planejamento Estratégico & OKRs
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans font-medium">
              Metas corporativas claras alinham os sprints do portfólio. Marque conforme avança no desenvolvimento.
            </p>

            {/* Add strategic goal form */}
            <form onSubmit={handleAddGoal} className="flex gap-2">
              <input 
                id="new-goal-text"
                type="text" 
                required
                placeholder="Ex: Lançar firmware v2.0 do IoT..."
                value={newGoalText} 
                onChange={e => setNewGoalText(e.target.value)}
                className="flex-1 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
              />
              <button 
                id="submit-goal-btn"
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3 rounded-xl cursor-pointer shadow-sm"
              >
                Salvar
              </button>
            </form>

            {/* Goals list */}
            <div className="space-y-2 pt-2">
              {business.strategicGoals.map((goal, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 bg-slate-100/30 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-2xl">
                  <div className="flex items-start gap-2.5 flex-1 pr-2">
                    <input 
                      id={`toggle-goal-${idx}`}
                      type="checkbox" 
                      checked={goal.completed}
                      onChange={() => handleToggleGoal(idx)}
                      className="rounded-md border-slate-300 dark:border-white/20 text-[#7C3AED] focus:ring-[#7C3AED] h-4.5 w-4.5 bg-white dark:bg-black/20 cursor-pointer mt-0.5"
                    />
                    <span className={`text-xs font-medium ${goal.completed ? 'line-through text-slate-400 dark:text-slate-500 font-sans' : 'text-slate-700 dark:text-slate-200 font-sans'}`}>
                      {goal.text}
                    </span>
                  </div>
                  <button 
                    id={`delete-goal-${idx}`}
                    onClick={() => handleDeleteGoal(idx)}
                    className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Values Display */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
              <h4 className="text-xs uppercase font-mono text-slate-500 dark:text-slate-400 font-bold">Valores da Marca</h4>
              <div className="flex flex-wrap gap-1.5">
                {business.values.map((v, idx) => (
                  <span key={idx} className="text-[10px] font-bold bg-[#34C759]/15 text-[#34C759] px-2.5 py-0.5 rounded-full border border-[#34C759]/10">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
