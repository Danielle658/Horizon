import React, { useState, useEffect } from 'react';
import { 
  AcademicSubject, CareerTech, PortfolioProject, BusinessMetric, 
  FinancialPot, Equipment, WeeklyReview, GamificationState 
} from './types';
import { 
  INITIAL_SUBJECTS, INITIAL_TECH_ROADMAP, INITIAL_PORTFOLIO, 
  INITIAL_BUSINESS, INITIAL_FINANCIAL_POTS, INITIAL_EQUIPMENT, 
  INITIAL_GAMIFICATION 
} from './data/initialData';

// Tabs components
import DashboardTab from './components/DashboardTab';
import CollegeTab from './components/CollegeTab';
import CareerTab from './components/CareerTab';
import PortfolioTab from './components/PortfolioTab';
import BusinessTab from './components/BusinessTab';
import FinanceTab from './components/FinanceTab';
import EquipmentTab from './components/EquipmentTab';
import WeeklyReviewTab from './components/WeeklyReviewTab';
import ReportsTab from './components/ReportsTab';
import BlueprintTab from './components/BlueprintTab';
import SettingsTab from './components/SettingsTab';
import HorizonLogo from './components/HorizonLogo';

// Lucide icons
import { 
  Trophy, BookOpen, Briefcase, Award, FolderTree, Compass, Code, 
  Wallet, Laptop, Calendar, FileBarChart, Layers, Moon, Sun, Flame, 
  CheckCircle, RefreshCw, Star, X, Cpu, Menu, LogOut, Settings, 
  ChevronLeft, ChevronRight, Play, Lock, UserCheck, AlertTriangle
} from 'lucide-react';

export default function App() {
  // Theme state: dark (default) or light
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('horizon_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<string>(() => {
    const saved = localStorage.getItem('horizon_active_tab');
    return saved || 'dashboard';
  });

  // Splash Screen State
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootLog, setBootLog] = useState<string[]>([]);

  // Login Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('horizon_logged_in');
    return saved === 'true';
  });

  // Sidebar expanded / collapsed state (persisted)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(() => {
    const saved = localStorage.getItem('horizon_sidebar_expanded');
    return saved !== 'false'; // default is true
  });

  // Mobile Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Responsive device state
  const [isMobile, setIsMobile] = useState(false);

  // User Profile identity
  const [userName, setUserName] = useState<string>(() => {
    const saved = localStorage.getItem('horizon_username');
    return saved || 'Danielle';
  });

  const [userEmail, setUserEmail] = useState<string>(() => {
    const saved = localStorage.getItem('horizon_useremail');
    return saved || 'kawadanielle658@gmail.com';
  });

  // Login input state
  const [loginName, setLoginName] = useState('Danielle');
  const [loginEmail, setLoginEmail] = useState('kawadanielle658@gmail.com');
  const [loginPasscode, setLoginPasscode] = useState('2026');
  const [loginError, setLoginError] = useState('');

  // Core model state
  const [subjects, setSubjects] = useState<AcademicSubject[]>(() => {
    const saved = localStorage.getItem('horizon_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  const [techs, setTechs] = useState<CareerTech[]>(() => {
    const saved = localStorage.getItem('horizon_techs');
    return saved ? JSON.parse(saved) : INITIAL_TECH_ROADMAP;
  });

  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem('horizon_projects');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });

  const [business, setBusiness] = useState<BusinessMetric[]>(() => {
    const saved = localStorage.getItem('horizon_business');
    return saved ? JSON.parse(saved) : [INITIAL_BUSINESS];
  });

  const [pots, setPots] = useState<FinancialPot[]>(() => {
    const saved = localStorage.getItem('horizon_pots');
    return saved ? JSON.parse(saved) : INITIAL_FINANCIAL_POTS;
  });

  const [equipments, setEquipments] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('horizon_equipments');
    return saved ? JSON.parse(saved) : INITIAL_EQUIPMENT;
  });

  const [reviews, setReviews] = useState<WeeklyReview[]>(() => {
    const saved = localStorage.getItem('horizon_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  const [gamification, setGamification] = useState<GamificationState>(() => {
    const saved = localStorage.getItem('horizon_gamification');
    return saved ? JSON.parse(saved) : INITIAL_GAMIFICATION;
  });

  // Level up or achievement unlock notifications
  const [levelUpMessage, setLevelUpMessage] = useState('');
  const [unlockedAchievementMsg, setUnlockedAchievementMsg] = useState('');

  // Sincronização de tela de boot
  useEffect(() => {
    if (!showSplash) return;
    
    const logs = [
      '>> INITIALIZING COGNITIVE PERSISTENCE SYSTEM...',
      '>> LOADING SHADERS AND GLASMOPHISM LAYER...',
      '>> SYNCING LOCAL DATABASE (localStorage)...',
      '>> LOADING DANIELLE\'S ACADEMIC ENGINE...',
      '>> CONNECTING COMPUTATIONAL ROADMAP GRAPH...',
      '>> SECURE HANDSHAKE COMPLETED. ACCESS GRANTED.'
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setShowSplash(false);
        }, 300);
      }
      setBootProgress(currentProgress);
      
      const logIndex = Math.min(logs.length, Math.floor((currentProgress / 100) * (logs.length + 2)));
      setBootLog(logs.slice(0, logIndex));
    }, 60);

    return () => clearInterval(interval);
  }, [showSplash]);

  // Handle responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('horizon_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('horizon_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('horizon_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('horizon_techs', JSON.stringify(techs));
  }, [techs]);

  useEffect(() => {
    localStorage.setItem('horizon_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('horizon_business', JSON.stringify(business));
  }, [business]);

  useEffect(() => {
    localStorage.setItem('horizon_pots', JSON.stringify(pots));
  }, [pots]);

  useEffect(() => {
    localStorage.setItem('horizon_equipments', JSON.stringify(equipments));
  }, [equipments]);

  useEffect(() => {
    localStorage.setItem('horizon_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('horizon_gamification', JSON.stringify(gamification));
  }, [gamification]);

  useEffect(() => {
    localStorage.setItem('horizon_username', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('horizon_useremail', userEmail);
  }, [userEmail]);

  useEffect(() => {
    localStorage.setItem('horizon_logged_in', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('horizon_sidebar_expanded', isSidebarExpanded ? 'true' : 'false');
  }, [isSidebarExpanded]);

  // Handle dark/light tailwind body style
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#0A0A0A';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#F3F4F6';
    }
  }, [theme]);

  // Gamification helper: add XP
  const addXp = (amount: number) => {
    setGamification(prev => {
      let nextXp = prev.xp + amount;
      let nextLevel = prev.level;
      const xpNeeded = nextLevel * 1000;

      let leveledUp = false;
      if (nextXp >= xpNeeded) {
        nextXp = nextXp - xpNeeded;
        nextLevel += 1;
        leveledUp = true;
      }

      if (leveledUp) {
        setLevelUpMessage(`PARABÉNS! Você subiu de nível! Agora você é Nível ${nextLevel}. Continue codificando!`);
        setTimeout(() => setLevelUpMessage(''), 7000);
      }

      // Check for unlocking achievements dynamically
      const updatedAchievements = prev.achievements.map(ach => {
        if (!ach.unlocked) {
          let shouldUnlock = false;
          if (ach.id === 'ac-5' && reviews.length >= 1) shouldUnlock = true;
          if (ach.id === 'ac-6' && nextLevel >= 10) shouldUnlock = true;

          if (shouldUnlock) {
            setUnlockedAchievementMsg(`CONQUISTA DESBLOQUEADA: "${ach.title}" - ${ach.description}`);
            setTimeout(() => setUnlockedAchievementMsg(''), 6000);
            return { ...ach, unlocked: true, unlockedAt: new Date().toLocaleDateString('pt-BR') };
          }
        }
        return ach;
      });

      return {
        ...prev,
        xp: nextXp,
        level: nextLevel,
        achievements: updatedAchievements
      };
    });
  };

  const resetAllData = () => {
    if (confirm('Atenção: Isso redefinirá todos os seus dados personalizados de volta para o estado inicial de demonstração. Deseja continuar?')) {
      localStorage.clear();
      setSubjects(INITIAL_SUBJECTS);
      setTechs(INITIAL_TECH_ROADMAP);
      setProjects(INITIAL_PORTFOLIO);
      setBusiness([INITIAL_BUSINESS]);
      setPots(INITIAL_FINANCIAL_POTS);
      setEquipments(INITIAL_EQUIPMENT);
      setReviews([]);
      setGamification(INITIAL_GAMIFICATION);
      setUserName('Danielle');
      setUserEmail('kawadanielle658@gmail.com');
      setActiveTab('dashboard');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim()) {
      setLoginError('Insira um nome válido para inicializar seu perfil.');
      return;
    }
    setUserName(loginName);
    setUserEmail(loginEmail);
    setIsLoggedIn(true);
    setLoginError('');
  };

  const handleLogout = () => {
    if (confirm('Deseja realmente sair da sessão do Horizon OS?')) {
      setIsLoggedIn(false);
    }
  };

  // Nav items based on prompt requests and custom elements
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Layers className="w-4 h-4" /> },
    { id: 'faculdade', label: 'Faculdade', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'carreira', label: 'Carreira', icon: <Compass className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Portfólio', icon: <Code className="w-4 h-4" /> },
    { id: 'empresa', label: 'Empresa', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'financas', label: 'Finanças', icon: <Wallet className="w-4 h-4" /> },
    { id: 'equipamentos', label: 'Equipamentos', icon: <Laptop className="w-4 h-4" /> },
    { id: 'blueprints', label: 'Desenvolvimento', icon: <Cpu className="w-4 h-4" /> },
    { id: 'relatorios', label: 'Relatórios', icon: <FileBarChart className="w-4 h-4" /> },
    { id: 'revisao', label: 'Revisão Semanal', icon: <Calendar className="w-4 h-4" /> },
    { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4" /> },
  ];

  // Mobile navigation shortcuts
  const mobileShortcuts = [
    { id: 'dashboard', label: 'Home', icon: <Layers className="w-5 h-5" /> },
    { id: 'faculdade', label: 'Estudo', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'carreira', label: 'Carreira', icon: <Compass className="w-5 h-5" /> },
    { id: 'portfolio', label: 'Projetos', icon: <Code className="w-5 h-5" /> },
  ];

  // Render Splash Screen
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 bg-[#06070a] text-slate-100 flex flex-col items-center justify-center p-6 select-none font-mono">
        <div className="absolute inset-0 bg-radial from-[#7C3AED]/15 to-transparent pointer-events-none" />
        
        <div className="w-full max-w-md space-y-8 text-center relative z-10">
          <div className="flex flex-col items-center gap-4">
            <HorizonLogo size="xl" animated />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#34C759] via-[#5B75E3] to-[#7C3AED]">
                HORIZON OS
              </h1>
              <p className="text-[10px] text-slate-500 tracking-wider">
                COGNITIVE SYSTEMS • v1.0.4 • STABLE RELEASE
              </p>
            </div>
          </div>

          {/* Console logger block */}
          <div className="bg-black/40 border border-slate-800 rounded-2xl p-4 text-left h-36 overflow-hidden flex flex-col justify-end text-[10px] text-emerald-500/80 leading-relaxed font-mono">
            {bootLog.map((log, idx) => (
              <div key={idx} className="truncate">
                {log}
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-slate-400 mt-1">
              <RefreshCw className="w-3 h-3 animate-spin text-[#34C759]" /> 
              <span>Booting Kernel ... {bootProgress}%</span>
            </div>
          </div>

          {/* Linear Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-[#34C759] to-[#7C3AED] h-full transition-all duration-100 ease-out"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
          </div>

          <button 
            onClick={() => setShowSplash(false)}
            className="text-[10px] text-slate-500 hover:text-slate-300 font-mono border border-slate-800 hover:border-slate-700 px-4 py-1.5 rounded-full transition-all cursor-pointer"
          >
            SKIP SYSTEM LOADING [ESC]
          </button>
        </div>
      </div>
    );
  }

  // Render Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#07080d] text-slate-100 flex flex-col items-center justify-center p-6 relative font-sans">
        {/* Glowing environment ambient shapes */}
        <div className="absolute top-1/4 left-1/4 w-[25rem] h-[25rem] rounded-full bg-[#34C759]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-[#7C3AED]/10 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <HorizonLogo size="xl" animated />
            </div>
            <h1 className="text-3xl font-display font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              HORIZON OS
            </h1>
            <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto leading-relaxed">
              Sistema Operacional de Engenharia de Computação • Monitore seu progresso acadêmico, carreira e finanças.
            </p>
          </div>

          {/* Frosted Glass Login Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Lock className="text-[#34C759] w-4.5 h-4.5" />
              <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">Acesso de Engenheiro</span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1.5 font-bold">Nome do Perfil</label>
                <input 
                  type="text" 
                  value={loginName}
                  onChange={e => setLoginName(e.target.value)}
                  placeholder="Danielle"
                  required
                  className="w-full bg-black/40 border border-white/15 text-sm p-3 rounded-xl focus:outline-none focus:border-[#34C759] transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1.5 font-bold">E-mail Corporativo</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="kawadanielle658@gmail.com"
                  className="w-full bg-black/40 border border-white/15 text-sm p-3 rounded-xl focus:outline-none focus:border-[#34C759] transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Passcode PIN</label>
                  <span className="text-[9px] text-slate-500 font-mono">PIN padrão: 2026</span>
                </div>
                <input 
                  type="password" 
                  value={loginPasscode}
                  onChange={e => setLoginPasscode(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-black/40 border border-white/15 text-sm p-3 rounded-xl focus:outline-none focus:border-[#34C759] transition-all text-center tracking-widest"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#34C759] to-[#7C3AED] hover:from-emerald-500 hover:to-purple-600 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" /> Inicializar Sessão
              </button>
            </form>
          </div>

          <div className="text-center">
            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
              SECURE SYSTEM AUTHENTICATION
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0A0A0A] text-slate-100' : 'bg-[#F3F4F6] text-slate-800'} font-sans antialiased overflow-x-hidden`}>
      
      {/* Decorative ambient glowing backdrops for Frosted Glass theme */}
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-[#34C759]/10 dark:bg-[#34C759]/15 ambient-orb-1 pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[40rem] h-[40rem] rounded-full bg-[#7C3AED]/10 dark:bg-[#7C3AED]/15 ambient-orb-2 pointer-events-none z-0" />

      {/* Main Container stacked on top of ambient lights */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Visual Level Up Popup Modal */}
        {levelUpMessage && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            <div className="bg-gradient-to-r from-[#7C3AED] via-[#34C759] to-[#7C3AED] text-white p-4 rounded-xl shadow-2xl flex items-center justify-between border border-[#34C759]/40 animate-bounce">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-300 fill-current animate-spin" />
                <div>
                  <h4 className="text-sm font-bold font-display uppercase tracking-wider">Level Up!</h4>
                  <p className="text-xs text-purple-100">{levelUpMessage}</p>
                </div>
              </div>
              <button id="close-lvlup" onClick={() => setLevelUpMessage('')} className="text-white hover:text-gray-200">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Visual Achievement Unlock Popup Modal */}
        {unlockedAchievementMsg && (
          <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm px-4">
            <div className="bg-[#11131e] text-white p-4 rounded-xl border border-[#34C759] shadow-2xl flex items-center gap-3 animate-slide-in-right">
              <Award className="w-8 h-8 text-[#34C759] animate-pulse" />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-[#34C759] font-mono uppercase tracking-widest">Conquista Desbloqueada</h4>
                <p className="text-xs text-gray-300 font-sans mt-0.5">{unlockedAchievementMsg}</p>
              </div>
              <button id="close-ach" onClick={() => setUnlockedAchievementMsg('')} className="text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* MOBILE APP BAR AND NAVIGATION */}
        {isMobile ? (
          <>
            {/* AppBar Header */}
            <header className={`border-b sticky top-0 z-40 px-4 py-3 backdrop-blur-md flex items-center justify-between gap-4 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0A0A0A]/85 border-white/10' : 'bg-white/85 border-black/10'}`}>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsDrawerOpen(true)}
                  className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/5 text-slate-500 dark:text-slate-300"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                  <HorizonLogo size="sm" animated />
                  <div>
                    <span className="text-sm font-display font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                      HORIZON <span className="text-[8px] bg-[#34C759]/20 text-[#34C759] px-1.5 py-0.2 rounded-full border border-[#34C759]/20 font-bold">OS</span>
                    </span>
                    <span className="text-[8px] text-slate-500 dark:text-slate-400 block font-mono">computação</span>
                  </div>
                </div>
              </div>

              {/* Top Icons */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#34C759]/10 text-[#34C759] px-2 py-1 rounded-lg border border-[#34C759]/20 text-[10px] font-bold font-mono">
                  <Flame className="w-3 h-3 fill-current animate-pulse" />
                  <span>{gamification.streak}d</span>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-black/5 border-black/10 text-[#7C3AED]'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
              </div>
            </header>

            {/* Sliding Drawer Component */}
            {isDrawerOpen && (
              <div className="fixed inset-0 z-50 flex">
                {/* Backdrop overlay */}
                <div 
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setIsDrawerOpen(false)}
                />

                {/* Drawer Content */}
                <div className={`relative w-72 max-w-[80vw] h-full flex flex-col justify-between shadow-2xl border-r p-6 backdrop-blur-xl transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f1015]/95 border-white/10' : 'bg-white/95 border-black/10'}`}>
                  <div>
                    {/* Header with Close */}
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10 mb-6">
                      <div className="flex items-center gap-2">
                        <HorizonLogo size="sm" animated />
                        <span className="text-sm font-display font-black tracking-wider text-slate-900 dark:text-white">HORIZON DRAWER</span>
                      </div>
                      <button 
                        onClick={() => setIsDrawerOpen(false)}
                        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-white/5 text-slate-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Full Nav Drawer Items */}
                    <nav className="space-y-1 overflow-y-auto max-h-[60vh] pr-1">
                      {navItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsDrawerOpen(false);
                          }}
                          className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                            activeTab === item.id 
                              ? 'bg-gradient-to-r from-[#34C759]/10 to-[#7C3AED]/10 text-[#34C759] border-l-4 border-[#34C759] font-bold' 
                              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Profile info at bottom */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#34C759] to-[#7C3AED] flex items-center justify-center font-black text-white text-xs shadow-md">
                        {userName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white">{userName}</h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate max-w-[150px]">{userEmail}</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[11px] font-bold py-2 rounded-xl border border-red-500/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sair do Sistema
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* DESKTOP BRANDED HEADER */
          <header className={`border-b sticky top-0 z-40 px-8 py-4 backdrop-blur-md transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0A0A0A]/80 border-white/10' : 'bg-white/80 border-black/10'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              {/* Collapsible toggle & brand name */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                  className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' : 'bg-black/5 border-black/10 text-slate-600 hover:bg-black/10'
                  }`}
                  title={isSidebarExpanded ? 'Minimizar Sidebar' : 'Expandir Sidebar'}
                >
                  {isSidebarExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                  <HorizonLogo size="md" animated />
                  <div>
                    <span className="text-lg font-display font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 flex items-center gap-1.5">
                      HORIZON <span className="text-[10px] bg-[#34C759]/20 text-[#34C759] px-2 py-0.5 rounded-full font-mono border border-[#34C759]/20 font-bold">OS v1.0</span>
                    </span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-mono tracking-widest uppercase">Personal operating system</span>
                  </div>
                </div>
              </div>

              {/* Navigation widgets */}
              <div className="flex items-center gap-3.5">
                <div className="flex items-center gap-1.5 bg-[#34C759]/10 text-[#34C759] px-3.5 py-1.5 rounded-xl border border-[#34C759]/20 font-bold text-xs font-mono">
                  <Flame className="w-4 h-4 fill-current animate-pulse" />
                  <span>{gamification.streak} dias seguidos</span>
                </div>

                <div className="bg-slate-200/50 dark:bg-white/5 border border-slate-300/30 dark:border-white/10 px-3.5 py-1 rounded-xl text-xs font-mono font-bold text-[#7C3AED] dark:text-[#a78bfa] flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Nível {gamification.level}</span>
                </div>

                <button 
                  onClick={toggleTheme}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' 
                      : 'bg-black/5 border-black/10 text-[#7C3AED] hover:bg-black/10'
                  }`}
                  title="Alternar Tema"
                >
                  {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </button>

                <button 
                  onClick={resetAllData}
                  className="p-2 text-xs font-mono border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-500 dark:text-red-400 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  title="Reset completo para demonstração"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> <span>Reset OS</span>
                </button>
              </div>

            </div>
          </header>
        )}

        {/* BODY LAYOUT CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col lg:flex-row gap-8 w-full flex-1">
          
          {/* DESKTOP SIDEBAR OR COMPACT RAIL (Hidden on mobile) */}
          {!isMobile && (
            <aside 
              className={`shrink-0 space-y-6 transition-all duration-300 ease-in-out ${
                isSidebarExpanded ? 'w-64' : 'w-20'
              }`}
            >
              {/* Quick Navigation Cards */}
              <nav className={`p-4 rounded-3xl border backdrop-blur-md shadow-xl transition-all ${theme === 'dark' ? 'bg-[#141414]/75 border-white/10' : 'bg-white/75 border-black/5'} space-y-1.5`}>
                <span className={`text-[9px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400 block px-3 mb-2 font-black transition-opacity duration-300 ${!isSidebarExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                  Navegação Central
                </span>
                
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      id={`nav-${item.id}`}
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isSidebarExpanded ? 'px-4 py-3 gap-3' : 'p-3 justify-center'
                      } ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#34C759]/10 to-[#7C3AED]/10 text-[#34C759] border-l-4 border-[#34C759] font-bold shadow-inner' 
                          : 'text-slate-500 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
                      }`}
                      title={!isSidebarExpanded ? item.label : undefined}
                    >
                      <span className={`transition-transform duration-300 ${isActive ? 'scale-110 text-[#34C759]' : ''}`}>
                        {item.icon}
                      </span>
                      {isSidebarExpanded && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </nav>

              {/* Quick Gamification progress or medals */}
              <div className={`p-5 rounded-3xl border backdrop-blur-md shadow-xl transition-all ${theme === 'dark' ? 'bg-[#141414]/75 border-white/10' : 'bg-white/75 border-black/5'} space-y-4`}>
                <div className={`flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/10 ${!isSidebarExpanded ? 'justify-center' : ''}`}>
                  {isSidebarExpanded && (
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                      Conquistas
                    </span>
                  )}
                  <Trophy className="w-4 h-4 text-yellow-400" />
                </div>

                <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                  {gamification.achievements.slice(0, isSidebarExpanded ? 3 : 1).map((ach) => (
                    <div 
                      key={ach.id} 
                      className={`flex gap-2 text-xs p-2.5 rounded-2xl border transition-all ${
                        ach.unlocked 
                          ? 'bg-emerald-500/5 border-emerald-500/10' 
                          : 'bg-slate-200/20 dark:bg-white/5 border-transparent'
                      } ${!isSidebarExpanded ? 'justify-center p-2' : ''}`}
                      title={`${ach.title}: ${ach.description}`}
                    >
                      <span className={`p-1.5 rounded-lg shrink-0 ${ach.unlocked ? 'text-[#34C759] bg-[#34C759]/10' : 'text-slate-400 dark:text-slate-600'}`}>
                        <Star className="w-3 h-3 fill-current" />
                      </span>
                      {isSidebarExpanded && (
                        <div className="truncate">
                          <h5 className={`font-bold text-[11px] truncate ${ach.unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                            {ach.title}
                          </h5>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{ach.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand Profile section on bottom of Sidebar */}
              <div className={`p-4 rounded-3xl border backdrop-blur-md shadow-xl transition-all ${theme === 'dark' ? 'bg-[#141414]/75 border-white/10' : 'bg-white/75 border-black/5'} space-y-3`}>
                <div className={`flex items-center gap-3 ${!isSidebarExpanded ? 'justify-center' : ''}`}>
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#34C759] to-[#7C3AED] flex items-center justify-center font-black text-white text-xs shadow-md shrink-0">
                    {userName.substring(0, 2).toUpperCase()}
                  </div>
                  {isSidebarExpanded && (
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">{userName}</h4>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 truncate block">{userEmail}</span>
                    </div>
                  )}
                </div>

                {isSidebarExpanded ? (
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-bold py-2 rounded-xl border border-red-500/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sair do OS
                  </button>
                ) : (
                  <button 
                    onClick={handleLogout}
                    className="w-full flex justify-center p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                    title="Desconectar do OS"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            </aside>
          )}

          {/* MAIN CONTAINER CONTENT VIEWPORT */}
          <main className="flex-1 min-w-0 pb-20 lg:pb-0">
            {activeTab === 'dashboard' && (
              <DashboardTab 
                subjects={subjects}
                techs={techs}
                equipments={equipments}
                pots={pots}
                business={business[0]}
                gamification={gamification}
                addXp={addXp}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'faculdade' && (
              <CollegeTab 
                subjects={subjects}
                setSubjects={setSubjects}
                addXp={addXp}
              />
            )}

            {activeTab === 'carreira' && (
              <CareerTab 
                techs={techs}
                setTechs={setTechs}
                addXp={addXp}
              />
            )}

            {activeTab === 'portfolio' && (
              <PortfolioTab 
                projects={projects}
                setProjects={setProjects}
                addXp={addXp}
              />
            )}

            {activeTab === 'empresa' && (
              <BusinessTab 
                business={business[0]}
                setBusiness={(b) => setBusiness([b as any])}
                addXp={addXp}
              />
            )}

            {activeTab === 'financas' && (
              <FinanceTab 
                pots={pots}
                setPots={setPots}
                addXp={addXp}
              />
            )}

            {activeTab === 'equipamentos' && (
              <EquipmentTab 
                equipments={equipments}
                setEquipments={setEquipments}
                addXp={addXp}
              />
            )}

            {activeTab === 'revisao' && (
              <WeeklyReviewTab 
                reviews={reviews}
                setReviews={setReviews}
                addXp={addXp}
              />
            )}

            {activeTab === 'relatorios' && (
              <ReportsTab 
                subjects={subjects}
                techs={techs}
                projects={projects}
                pots={pots}
                equipments={equipments}
              />
            )}

            {activeTab === 'blueprints' && (
              <BlueprintTab />
            )}

            {activeTab === 'settings' && (
              <SettingsTab 
                userName={userName}
                setUserName={setUserName}
                userEmail={userEmail}
                setUserEmail={setUserEmail}
                theme={theme}
                setTheme={setTheme}
                gamification={gamification}
                setGamification={setGamification}
                resetAllData={resetAllData}
              />
            )}
          </main>

        </div>

        {/* MOBILE BOTTOM NAVIGATION BAR */}
        {isMobile && (
          <nav className={`fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-lg flex justify-around items-center py-2 px-3 shadow-2xl transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0A0A0A]/90 border-white/10' : 'bg-white/90 border-black/10'}`}>
            {mobileShortcuts.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center p-1 px-3 rounded-xl transition-all cursor-pointer ${
                    isActive ? 'text-[#34C759]' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  <div className={`p-1 rounded-xl transition-transform ${isActive ? 'scale-110 bg-[#34C759]/10' : ''}`}>
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-bold mt-0.5 tracking-tight font-sans">
                    {item.label}
                  </span>
                </button>
              );
            })}
            {/* Drawer button shortcut */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex flex-col items-center justify-center p-1 px-3 rounded-xl text-slate-400 dark:text-slate-500"
            >
              <div className="p-1">
                <Menu className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-bold mt-0.5 tracking-tight font-sans">Menu</span>
            </button>
          </nav>
        )}

        {/* Humble Footer */}
        <footer className={`border-t py-6 mt-12 text-center text-xs relative z-10 ${theme === 'dark' ? 'bg-[#0d0e14]/50 border-white/10 text-gray-400' : 'bg-white/50 border-black/10 text-gray-500'} backdrop-blur-md`}>
          <p>© 2026 HORIZON Personal OS. Projetado com carinho para estudantes de Engenharia da Computação.</p>
          <p className="mt-1 font-mono text-[10px]">Material Design 3 Theme • React TypeScript Engine • Frosted Glass Edition</p>
        </footer>

      </div>
    </div>
  );
}
