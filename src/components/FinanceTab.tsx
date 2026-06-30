import React, { useState } from 'react';
import { FinancialPot } from '../types';
import { 
  DollarSign, ArrowUpRight, ArrowDownRight, Wallet, PieChart, 
  Trash2, Plus, Sparkles, AlertCircle, TrendingUp 
} from 'lucide-react';

interface FinanceTabProps {
  pots: FinancialPot[];
  setPots: React.Dispatch<React.SetStateAction<FinancialPot[]>>;
  addXp: (amount: number) => void;
}

interface Transaction {
  id: string;
  potId: string;
  type: 'Receita' | 'Despesa';
  amount: number;
  description: string;
  date: string;
}

export default function FinanceTab({ pots, setPots, addXp }: FinanceTabProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 't-1', potId: 'fp-1', type: 'Receita', amount: 1500, description: 'Bolsa de Iniciação Científica / Estágio', date: '2026-06-25' },
    { id: 't-2', potId: 'fp-2', type: 'Receita', amount: 8500, description: 'Freelance IoT - Supermercados Silva', date: '2026-06-28' },
    { id: 't-3', potId: 'fp-1', type: 'Despesa', amount: 450, description: 'Livros de Algoritmos & Eletrônica', date: '2026-06-29' }
  ]);

  // Form states
  const [showAddTx, setShowAddTx] = useState(false);
  const [selectedPotId, setSelectedPotId] = useState(pots[0]?.id || '');
  const [txType, setTxType] = useState<'Receita' | 'Despesa'>('Receita');
  const [txAmount, setTxAmount] = useState('');
  const [txDesc, setTxDesc] = useState('');

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(txAmount);
    if (!selectedPotId || isNaN(amount) || amount <= 0 || !txDesc.trim()) return;

    const newTx: Transaction = {
      id: `t-${Date.now()}`,
      potId: selectedPotId,
      type: txType,
      amount,
      description: txDesc,
      date: new Date().toISOString().split('T')[0]
    };

    // Update pots balance
    setPots(prev => prev.map(pot => {
      if (pot.id === selectedPotId) {
        const adjustment = txType === 'Receita' ? amount : -amount;
        return {
          ...pot,
          currentAmount: Math.max(0, pot.currentAmount + adjustment)
        };
      }
      return pot;
    }));

    setTransactions(prev => [newTx, ...prev]);
    addXp(60); // XP Reward for organizing ledgers!

    // Reset Form
    setTxAmount('');
    setTxDesc('');
    setShowAddTx(false);
  };

  const handleDeleteTransaction = (tx: Transaction) => {
    setPots(prev => prev.map(pot => {
      if (pot.id === tx.potId) {
        // Revert balance adjustment
        const adjustment = tx.type === 'Receita' ? -tx.amount : tx.amount;
        return {
          ...pot,
          currentAmount: Math.max(0, pot.currentAmount + adjustment)
        };
      }
      return pot;
    }));

    setTransactions(prev => prev.filter(t => t.id !== tx.id));
  };

  // Calculations
  const totalBalance = pots.reduce((sum, p) => sum + p.currentAmount, 0);
  const potLabels: Record<string, string> = {
    'fp-1': 'Pessoal',
    'fp-2': 'Empresa',
    'fp-3': 'Equipamentos',
    'fp-4': 'Reserva de Emergência',
    'fp-5': 'Investimentos'
  };

  return (
    <div id="finance-tab" className="space-y-6">
      {/* Overview Finances Grid */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#34C759] bg-[#34C759]/10 px-2 py-0.5 rounded-full border border-[#34C759]/20 font-bold">
            Conselho Fiscal & Tesouraria
          </span>
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wallet className="text-[#34C759] w-6 h-6" /> Evolução Financeira Geral
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl font-medium">
            Acompanhe o capital segmentado para garantir que a transição para sua startup de engenharia seja estável, protegendo sua reserva de emergência e investimentos.
          </p>
        </div>

        {/* Global balance card */}
        <div className="bg-slate-100/80 dark:bg-black/20 border border-slate-200 dark:border-white/5 px-6 py-4 rounded-2xl text-center shadow-inner">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Patrimônio Líquido Unificado</span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 dark:text-white mt-1">
            R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Main split: Segmented balances vs transaction ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Distribution Graph & Pots (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-5 shadow-xl">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <PieChart className="text-[#7C3AED] w-4 h-4" /> Alocação de Ativos (SVG Chart)
            </h3>

            {/* Visual pure CSS SVG Stacked bar chart representing asset ratios */}
            <div className="space-y-3">
              <div className="w-full bg-slate-200 dark:bg-black/30 h-8 rounded-xl overflow-hidden flex">
                {pots.map((pot) => {
                  const ratio = totalBalance > 0 ? (pot.currentAmount / totalBalance) * 100 : 0;
                  const colorClass = 
                    pot.category === 'Pessoal' ? 'bg-[#34C759]' :
                    pot.category === 'Empresa' ? 'bg-[#7C3AED]' :
                    pot.category === 'Equipamentos' ? 'bg-blue-500' :
                    pot.category === 'Reserva de Emergência' ? 'bg-orange-500' : 'bg-cyan-500';

                  return (
                    <div 
                      key={pot.id}
                      className={`${colorClass} h-full transition-all duration-300`}
                      style={{ width: `${ratio}%` }}
                      title={`${pot.name}: ${ratio.toFixed(1)}%`}
                    />
                  );
                })}
              </div>

              {/* Legends */}
              <div className="flex flex-wrap gap-4 pt-1.5 justify-center">
                {pots.map((pot) => {
                  const ratio = totalBalance > 0 ? (pot.currentAmount / totalBalance) * 100 : 0;
                  const dotColor = 
                    pot.category === 'Pessoal' ? 'bg-[#34C759]' :
                    pot.category === 'Empresa' ? 'bg-[#7C3AED]' :
                    pot.category === 'Equipamentos' ? 'bg-blue-500' :
                    pot.category === 'Reserva de Emergência' ? 'bg-orange-500' : 'bg-cyan-500';

                  return (
                    <div key={pot.id} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <span className={`w-3 h-3 rounded-full ${dotColor}`} />
                      <span>{pot.name} <span className="text-slate-400 dark:text-slate-500 font-mono">({ratio.toFixed(1)}%)</span></span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Segmented lists */}
            <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-white/10">
              {pots.map((pot) => {
                const barColor = 
                  pot.category === 'Pessoal' ? 'bg-[#34C759]' :
                  pot.category === 'Empresa' ? 'bg-[#7C3AED]' :
                  pot.category === 'Equipamentos' ? 'bg-blue-500' :
                  pot.category === 'Reserva de Emergência' ? 'bg-orange-500' : 'bg-cyan-500';

                return (
                  <div key={pot.id} className="bg-slate-100/50 dark:bg-black/20 border border-slate-200/50 dark:border-white/5 p-4 rounded-2xl flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${barColor}`} />
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white">{pot.name}</h4>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono bg-white dark:bg-black/20 px-2 py-0.5 rounded border border-slate-150 dark:border-white/5 font-bold">
                        {pot.category}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-slate-800 dark:text-white">
                        R$ {pot.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      {pot.targetAmount && (
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-medium">
                          Meta: R$ {pot.targetAmount.toLocaleString('pt-BR')}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Ledger Transaction list & Registry Form (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <TrendingUp className="text-[#34C759] w-4 h-4" /> Registro de Transações
              </h3>
              <button 
                id="toggle-add-tx"
                onClick={() => setShowAddTx(!showAddTx)}
                className="bg-[#34C759]/15 hover:bg-[#34C759]/25 text-[#34C759] border border-[#34C759]/20 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Lançamento
              </button>
            </div>

            {/* Add Transaction form */}
            {showAddTx && (
              <form onSubmit={handleAddTransaction} className="p-3 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Segmento de Destino</label>
                    <select 
                      id="tx-pot-select"
                      value={selectedPotId}
                      onChange={e => setSelectedPotId(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                    >
                      {pots.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Operação</label>
                    <select 
                      id="tx-type-select"
                      value={txType}
                      onChange={e => setTxType(e.target.value as any)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                    >
                      <option value="Receita">Depósito (+) </option>
                      <option value="Despesa">Retirada / Despesa (-)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Valor (R$)</label>
                    <input 
                      id="tx-amount-input"
                      type="number" 
                      step="0.01" 
                      required 
                      placeholder="Ex: 120.00"
                      value={txAmount}
                      onChange={e => setTxAmount(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold">Descrição da Movimentação</label>
                    <input 
                      id="tx-desc-input"
                      type="text" 
                      required 
                      placeholder="Ex: Assinatura de Servidor Cloud"
                      value={txDesc}
                      onChange={e => setTxDesc(e.target.value)}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white p-2.5 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <button 
                  id="submit-tx-btn"
                  type="submit" 
                  className="w-full bg-[#34C759] hover:bg-[#2cb04e] text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Confirmar Lançamento (+60 XP)
                </button>
              </form>
            )}

            {/* Transactions list */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {transactions.map(tx => (
                <div key={tx.id} className="p-3 bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-2xl flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className={`p-1.5 rounded-lg ${
                      tx.type === 'Receita' ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {tx.type === 'Receita' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <h4 className="text-slate-800 dark:text-white font-bold font-sans">{tx.description}</h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-medium">
                        {tx.date} • {pots.find(p => p.id === tx.potId)?.name || 'Pessoal'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <span className={`font-mono font-bold ${tx.type === 'Receita' ? 'text-[#34C759]' : 'text-red-500 dark:text-red-400'}`}>
                      {tx.type === 'Receita' ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR')}
                    </span>
                    <button 
                      id={`delete-tx-${tx.id}`}
                      onClick={() => handleDeleteTransaction(tx)}
                      className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Heuristic Advice */}
            <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs rounded-2xl flex gap-2 font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Conselho Smart:</strong> Mantenha sua <strong>Reserva de Emergência</strong> intacta rendendo liquidez diária. Ela garante fôlego para sua startup rejeitar propostas ruins e focar em produtos de grande escala.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
