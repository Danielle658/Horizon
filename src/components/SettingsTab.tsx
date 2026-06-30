import React, { useState } from 'react';
import { RefreshCw, User, Mail, Shield, ShieldCheck, Download, Upload, Info, Laptop, Cpu, Check } from 'lucide-react';
import HorizonLogo from './HorizonLogo';
import { GamificationState } from '../types';

interface SettingsTabProps {
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  gamification: GamificationState;
  setGamification: React.Dispatch<React.SetStateAction<GamificationState>>;
  resetAllData: () => void;
}

export default function SettingsTab({
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  theme,
  setTheme,
  gamification,
  setGamification,
  resetAllData
}: SettingsTabProps) {
  const [copied, setCopied] = useState(false);
  const [importString, setImportString] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const [editName, setEditName] = useState(userName);
  const [editEmail, setEditEmail] = useState(userEmail);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(editName || 'Danielle');
    setUserEmail(editEmail || 'kawadanielle658@gmail.com');
    setSavedMsg('Perfil atualizado com sucesso!');
    setTimeout(() => setSavedMsg(''), 4000);
  };

  const handleExportData = () => {
    const data: Record<string, string | null> = {};
    const keys = [
      'horizon_subjects',
      'horizon_techs',
      'horizon_projects',
      'horizon_business',
      'horizon_pots',
      'horizon_equipments',
      'horizon_reviews',
      'horizon_gamification',
      'horizon_active_tab',
      'horizon_username',
      'horizon_useremail'
    ];
    keys.forEach(key => {
      data[key] = localStorage.getItem(key);
    });
    
    const jsonStr = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleImportData = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(importString);
      Object.keys(parsed).forEach(key => {
        if (parsed[key]) {
          localStorage.setItem(key, parsed[key]);
        }
      });
      setImportSuccess(true);
      setImportString('');
      setTimeout(() => {
        setImportSuccess(false);
        window.location.reload();
      }, 1500);
    } catch (err) {
      alert('Erro ao importar dados. Verifique a sintaxe JSON e tente novamente.');
    }
  };

  const handleAddDemoXp = () => {
    setGamification(prev => {
      const newXp = prev.xp + 250;
      let level = prev.level;
      if (newXp >= level * 1000) {
        return {
          ...prev,
          xp: newXp - level * 1000,
          level: level + 1
        };
      }
      return { ...prev, xp: newXp };
    });
  };

  return (
    <div id="settings-tab" className="space-y-6 animate-fade-in">
      
      {/* Overview Banner */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <HorizonLogo size="lg" animated />
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
              Painel de Configurações
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Configure as variáveis de ambiente do seu cérebro, backup de dados locais e preferências visuais.
            </p>
          </div>
        </div>
        <span className="text-xs font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full border border-purple-500/20 font-bold">
          Horizon OS • Engine v1.0
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Profile Card */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono border-b border-slate-200 dark:border-white/10 pb-2 flex items-center gap-2">
            <User className="text-[#34C759] w-4.5 h-4.5" /> Identidade da Engenheira
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">Nome do Usuário</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white p-2.5 pl-9 rounded-xl focus:outline-none focus:border-[#7C3AED]"
                  placeholder="Seu nome"
                />
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">E-mail Cadastrado</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white p-2.5 pl-9 rounded-xl focus:outline-none focus:border-[#7C3AED]"
                  placeholder="Seu e-mail"
                />
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                {savedMsg}
              </span>
              <button 
                type="submit"
                className="bg-[#34C759] hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>

        {/* Theme and Sandbox Control */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono border-b border-slate-200 dark:border-white/10 pb-2 flex items-center gap-2">
            <Shield className="text-[#7C3AED] w-4.5 h-4.5" /> Tema & Ambiente Sandbox
          </h3>

          <div className="space-y-4">
            {/* Visual theme toggler */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-black/20 border border-slate-200/50 dark:border-white/5 rounded-2xl">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Modo Escuro (Recomendado)</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Diminui a fadiga ocular durante a codificação noturna.</p>
              </div>
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${theme === 'dark' ? 'bg-[#34C759]' : 'bg-slate-300'}`}
              >
                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Gamification cheat for XP testing */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-black/20 border border-slate-200/50 dark:border-white/5 rounded-2xl">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Simulador de Recompensa</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Adicione XP para testar transições e level-ups de demonstração.</p>
              </div>
              <button
                type="button"
                onClick={handleAddDemoXp}
                className="bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 border border-[#7C3AED]/20 text-[#7C3AED] text-[11px] font-bold px-3 py-1.5 rounded-xl cursor-pointer font-mono"
              >
                +250 XP
              </button>
            </div>

            {/* Clear all cache */}
            <div className="flex items-center justify-between p-3.5 bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-2xl">
              <div>
                <h4 className="text-xs font-bold text-red-600 dark:text-red-400">Apagar Dados de Fábrica</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Restaura todo o sistema de volta ao ponto zero.</p>
              </div>
              <button
                type="button"
                onClick={resetAllData}
                className="bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                Reset Total
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Backup & Import */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono border-b border-slate-200 dark:border-white/10 pb-2 flex items-center gap-2">
            <Download className="text-[#34C759] w-4.5 h-4.5" /> Cópia de Segurança (Backup)
          </h3>

          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              O Horizon OS armazena seus dados localmente com criptografia de sessão de navegador no <strong>localStorage</strong>. Exporte sua persistência ou cole um backup para restaurar.
            </p>

            <button 
              onClick={handleExportData}
              className="w-full bg-[#11131e] hover:bg-[#181a26] text-slate-300 border border-slate-700/50 text-xs font-mono py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#34C759]" /> Copiado para a Área de Transferência!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-purple-400" /> Exportar Dados de Persistência (JSON)
                </>
              )}
            </button>

            <form onSubmit={handleImportData} className="pt-2 space-y-2">
              <label className="block text-xs text-slate-500 dark:text-slate-400 font-bold">Importar Backup Existente</label>
              <textarea 
                rows={3}
                value={importString}
                onChange={e => setImportString(e.target.value)}
                placeholder='Cole o arquivo JSON copiado aqui...'
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-slate-200 p-2.5 rounded-xl font-mono focus:outline-none"
              />
              <button 
                type="submit"
                disabled={!importString}
                className="w-full bg-[#7C3AED] hover:bg-purple-600 disabled:opacity-40 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {importSuccess ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Restaurado! Recarregando...
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" /> Importar e Sincronizar Sistema
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Branded About page (Sobre) */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono border-b border-slate-200 dark:border-white/10 pb-2 flex items-center gap-2">
              <Info className="text-[#34C759] w-4.5 h-4.5" /> Sobre o Horizon OS
            </h3>

            <div className="flex gap-4 items-center py-4">
              <HorizonLogo size="lg" animated />
              <div>
                <h4 className="text-base font-display font-black text-slate-900 dark:text-white tracking-wider">
                  HORIZON <span className="text-[10px] bg-[#34C759]/20 text-[#34C759] px-2 py-0.5 rounded-full font-mono border border-[#34C759]/20 font-bold">OS v1.0</span>
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  Personal Operating System for Engineers
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 font-medium leading-relaxed">
                  Desenvolvido como uma suíte executiva unificada para acadêmicos e profissionais de engenharia eletrônica, IoT, firmwares e computação.
                </p>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-200/80 dark:border-white/10 pt-3 text-[11px] font-mono">
              <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
                <span>Arquitetura Core:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">React 18 + Vite SPA</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
                <span>Motor de Estilo:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">Tailwind CSS 4.0</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
                <span>Persistência:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">HTML5 Client-Side Engine</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
                <span>Desenvolvedor:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">Horizon Cybernetics Corp</span>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-[10px] text-[#34C759] bg-[#34C759]/10 px-3 py-1.5 rounded-xl border border-[#34C759]/10 font-bold uppercase tracking-widest font-mono inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Assinado Digitalmente • Seguro
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
