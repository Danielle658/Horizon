import { AcademicSubject, CareerTech, Equipment, FinancialPot, GamificationState, BusinessMetric, BookCourse, StudySession, PortfolioProject } from '../types';

export const INITIAL_SUBJECTS: AcademicSubject[] = [
  {
    id: 'sub-1',
    name: 'Circuitos Digitais',
    code: 'EC-01',
    semester: 3,
    grade: 8.5,
    status: 'Concluído',
    professor: 'Dr. Roberto Cruz',
    schedule: 'Seg e Qua - 08:00 às 10:00',
    credits: 4,
    attendance: 92,
    exams: [
      { id: 'ex-1a', title: 'P1: Portas Lógicas e Simplificação', date: '2026-04-10', weight: 4, grade: 8.0 },
      { id: 'ex-1b', title: 'P2: Circuitos Sequenciais & VHDL', date: '2026-06-15', weight: 6, grade: 8.8 }
    ],
    tasks: [
      { id: 'tk-1a', title: 'Relatório do laboratório de Multiplexadores', dueDate: '2026-05-12', done: true, type: 'Trabalho' },
      { id: 'tk-1b', title: 'Mini-projeto de Contador Síncrono', dueDate: '2026-06-01', done: true, type: 'Projeto' }
    ],
    materials: [
      { name: 'Livro: Sistemas Digitais - Tocci', url: '#', category: 'Livro' },
      { name: 'Slides: Registradores e Contadores', url: '#', category: 'Slides' },
      { name: 'Resumo: VHDL Cheat Sheet', url: '#', category: 'Resumo' }
    ]
  },
  {
    id: 'sub-2',
    name: 'Estruturas de Dados e Algoritmos',
    code: 'EC-02',
    semester: 3,
    grade: 9.0,
    status: 'Concluído',
    professor: 'Dra. Ana Maria Santos',
    schedule: 'Ter e Qui - 10:00 às 12:00',
    credits: 4,
    attendance: 96,
    exams: [
      { id: 'ex-2a', title: 'P1: Alocação Dinâmica e Listas', date: '2026-04-15', weight: 5, grade: 9.5 },
      { id: 'ex-2b', title: 'P2: Árvores, Grafos e Ordenação', date: '2026-06-20', weight: 5, grade: 8.5 }
    ],
    tasks: [
      { id: 'tk-2a', title: 'Implementação de Árvore AVL em C++', dueDate: '2026-05-20', done: true, type: 'Projeto' },
      { id: 'tk-2b', title: 'Exercícios sobre Grafos', dueDate: '2026-06-10', done: true, type: 'Exercício' }
    ],
    materials: [
      { name: 'Livro: Algoritmos - Cormen', url: '#', category: 'Livro' },
      { name: 'Resumo: Complexidade de Algoritmos Big-O', url: '#', category: 'Resumo' }
    ]
  },
  {
    id: 'sub-3',
    name: 'Sistemas Operacionais',
    code: 'EC-03',
    semester: 4,
    grade: 0.0,
    status: 'Em Andamento',
    professor: 'Dr. Marcos Valério',
    schedule: 'Seg e Qua - 10:00 às 12:00',
    credits: 4,
    attendance: 88,
    exams: [
      { id: 'ex-3a', title: 'P1: Gerenciamento de Processos e Threads', date: '2026-07-20', weight: 4 },
      { id: 'ex-3b', title: 'P2: Gerenciamento de Memória e Sistemas de Arquivo', date: '2026-09-10', weight: 6 }
    ],
    tasks: [
      { id: 'tk-3a', title: 'Simulador de Escalonador em C/Linux', dueDate: '2026-07-15', done: false, type: 'Projeto' },
      { id: 'tk-3b', title: 'Lista de Exercícios: Semáforos e Mutexes', dueDate: '2026-07-08', done: false, type: 'Exercício' }
    ],
    materials: [
      { name: 'Livro: Modern Operating Systems - Tanenbaum', url: '#', category: 'Livro' },
      { name: 'Documentação: POSIX Threads API', url: '#', category: 'Link' }
    ]
  },
  {
    id: 'sub-4',
    name: 'Arquitetura de Computadores',
    code: 'EC-04',
    semester: 4,
    grade: 0.0,
    status: 'Em Andamento',
    professor: 'Dr. Flávio Ramos',
    schedule: 'Ter e Qui - 08:00 às 10:00',
    credits: 4,
    attendance: 94,
    exams: [
      { id: 'ex-4a', title: 'P1: Conjunto de Instruções MIPS', date: '2026-07-22', weight: 4 },
      { id: 'ex-4b', title: 'P2: Pipelining e Hierarquia de Memória Cache', date: '2026-09-15', weight: 6 }
    ],
    tasks: [
      { id: 'tk-4a', title: 'Codificação de Algoritmo em Assembly MIPS', dueDate: '2026-07-18', done: false, type: 'Projeto' },
      { id: 'tk-4b', title: 'Questionário sobre Microarquitetura', dueDate: '2026-07-10', done: false, type: 'Exercício' }
    ],
    materials: [
      { name: 'Livro: Organização e Projeto de Computadores - Patterson & Hennessy', url: '#', category: 'Livro' },
      { name: 'Simulador Mars MIPS Assembler', url: '#', category: 'Link' }
    ]
  },
  {
    id: 'sub-5',
    name: 'Engenharia de Software',
    code: 'EC-05',
    semester: 4,
    grade: 0.0,
    status: 'Em Andamento',
    professor: 'Dra. Luiza Melo',
    schedule: 'Sexta - 08:00 às 12:00',
    credits: 4,
    attendance: 100,
    exams: [
      { id: 'ex-5a', title: 'Avaliação Teórica: UML, Processos Ágeis e Clean Arch', date: '2026-07-24', weight: 5 }
    ],
    tasks: [
      { id: 'tk-5a', title: 'Modelagem UML do Sistema Horizon', dueDate: '2026-07-12', done: false, type: 'Trabalho' }
    ],
    materials: [
      { name: 'Clean Architecture Book - Uncle Bob', url: '#', category: 'Livro' },
      { name: 'Figma Model do Software', url: '#', category: 'Link' }
    ]
  }
];

export const INITIAL_TECH_ROADMAP: CareerTech[] = [
  { id: 'tech-git', name: 'Git', currentLevel: 4, desiredLevel: 5, hoursStudied: 32, coursesCount: 2, certificatesCount: 1, projectsCount: 12 },
  { id: 'tech-github', name: 'GitHub', currentLevel: 3, desiredLevel: 5, hoursStudied: 20, coursesCount: 1, certificatesCount: 0, projectsCount: 12 },
  { id: 'tech-html', name: 'HTML', currentLevel: 4, desiredLevel: 5, hoursStudied: 15, coursesCount: 1, certificatesCount: 1, projectsCount: 8 },
  { id: 'tech-css', name: 'CSS', currentLevel: 3, desiredLevel: 5, hoursStudied: 25, coursesCount: 2, certificatesCount: 1, projectsCount: 8 },
  { id: 'tech-js', name: 'JavaScript', currentLevel: 4, desiredLevel: 5, hoursStudied: 80, coursesCount: 3, certificatesCount: 2, projectsCount: 10 },
  { id: 'tech-ts', name: 'TypeScript', currentLevel: 3, desiredLevel: 5, hoursStudied: 45, coursesCount: 2, certificatesCount: 1, projectsCount: 6 },
  { id: 'tech-react', name: 'React', currentLevel: 3, desiredLevel: 5, hoursStudied: 95, coursesCount: 3, certificatesCount: 2, projectsCount: 5 },
  { id: 'tech-node', name: 'Node.js', currentLevel: 2, desiredLevel: 4, hoursStudied: 50, coursesCount: 2, certificatesCount: 1, projectsCount: 4 },
  { id: 'tech-flutter', name: 'Flutter', currentLevel: 3, desiredLevel: 5, hoursStudied: 120, coursesCount: 4, certificatesCount: 3, projectsCount: 3 },
  { id: 'tech-supabase', name: 'Supabase', currentLevel: 2, desiredLevel: 4, hoursStudied: 30, coursesCount: 1, certificatesCount: 0, projectsCount: 2 },
  { id: 'tech-postgres', name: 'PostgreSQL', currentLevel: 3, desiredLevel: 4, hoursStudied: 40, coursesCount: 2, certificatesCount: 1, projectsCount: 4 },
  { id: 'tech-docker', name: 'Docker', currentLevel: 2, desiredLevel: 4, hoursStudied: 25, coursesCount: 1, certificatesCount: 0, projectsCount: 1 },
  { id: 'tech-linux', name: 'Linux', currentLevel: 3, desiredLevel: 5, hoursStudied: 60, coursesCount: 2, certificatesCount: 1, projectsCount: 15 },
  { id: 'tech-cloud', name: 'Cloud Computing', currentLevel: 1, desiredLevel: 4, hoursStudied: 15, coursesCount: 1, certificatesCount: 0, projectsCount: 0 },
  { id: 'tech-structs', name: 'Estruturas de Dados', currentLevel: 4, desiredLevel: 5, hoursStudied: 90, coursesCount: 2, certificatesCount: 1, projectsCount: 8 },
  { id: 'tech-algos', name: 'Algoritmos', currentLevel: 4, desiredLevel: 5, hoursStudied: 110, coursesCount: 3, certificatesCount: 1, projectsCount: 10 },
  { id: 'tech-ai', name: 'Inteligência Artificial', currentLevel: 2, desiredLevel: 4, hoursStudied: 35, coursesCount: 1, certificatesCount: 1, projectsCount: 2 }
];

export const INITIAL_EQUIPMENT: Equipment[] = [
  { id: 'eq-1', name: 'iPad Air M2 (Anotações Acadêmicas)', value: 4500, saved: 3200, priority: 'Alta', category: 'Tablet' },
  { id: 'eq-2', name: 'MacBook Pro M3 (Compilação & Docker)', value: 14000, saved: 4500, priority: 'Alta', category: 'Notebook' },
  { id: 'eq-3', name: 'Monitor LG UltraWide 34"', value: 2800, saved: 1400, priority: 'Média', category: 'Monitor' },
  { id: 'eq-4', name: 'Câmera Sony ZV-E10 (Conteúdo & Git)', value: 5500, saved: 1000, priority: 'Baixa', category: 'Câmera' },
  { id: 'eq-5', name: 'Teclado Mecânico Keychron K3', value: 850, saved: 850, priority: 'Média', category: 'Setup' }
];

export const INITIAL_FINANCIAL_POTS: FinancialPot[] = [
  { id: 'fp-1', name: 'Conta Corrente Pessoal', category: 'Pessoal', currentAmount: 1850.50, targetAmount: 3000, color: 'emerald' },
  { id: 'fp-2', name: 'Caixa da Startup de IoT', category: 'Empresa', currentAmount: 12500.00, targetAmount: 25000, color: 'purple' },
  { id: 'fp-3', name: 'Fundo para Novos Equipamentos', category: 'Equipamentos', currentAmount: 10950.00, targetAmount: 27650, color: 'blue' },
  { id: 'fp-4', name: 'Reserva de Emergência (6 meses)', category: 'Reserva de Emergência', currentAmount: 9000.00, targetAmount: 12000, color: 'orange' },
  { id: 'fp-5', name: 'Fundos de Investimento (Ações/FIIs)', category: 'Investimentos', currentAmount: 3500.00, targetAmount: 10000, color: 'cyan' }
];

export const INITIAL_BUSINESS: BusinessMetric = {
  brandName: 'Vertex Tech Lab',
  mission: 'Prover soluções embarcadas de IoT robustas e inteligentes para automação comercial.',
  vision: 'Ser referência nacional em integração hardware-software até 2028.',
  values: ['Excelência Técnica', 'Inovação Ética', 'Hardware Aberto', 'Transparência'],
  services: [
    { id: 'srv-1', name: 'Consultoria em Projetos de IoT', price: 2500, description: 'Arquitetura de hardware e recomendação de sensores' },
    { id: 'srv-2', name: 'Desenvolvimento de Firmware sob Demanda', price: 6000, description: 'Desenvolvimento em C/C++ baremetal ou FreeRTOS' },
    { id: 'srv-3', name: 'Dashboard Web de Telemetria', price: 4500, description: 'Integração com Supabase e painéis de dados em tempo real' }
  ],
  clients: [
    { id: 'cli-1', name: 'Supermercados Silva', status: 'Ativo', value: 8500 },
    { id: 'cli-2', name: 'AgroTec Soluções', status: 'Lead', value: 12000 },
    { id: 'cli-3', name: 'Smart Residência SP', status: 'Finalizado', value: 4500 }
  ],
  marketingChannels: [
    { channel: 'LinkedIn Artigos', active: true, notes: 'Postagens semanais sobre sistemas operacionais e arquitetura de computadores' },
    { channel: 'GitHub Portfólio', active: true, notes: 'Código aberto bem estruturado para atrair recrutadores e clientes' },
    { channel: 'Eventos Presenciais (SBC / Hackathons)', active: true, notes: 'Network direto em fóruns de robótica e computação' }
  ],
  financialGoal: 50000,
  currentRevenue: 25500,
  strategicGoals: [
    { text: 'Finalizar o MVP da placa controladora de sensores baseada em ESP32', completed: true },
    { text: 'Conseguir mais 2 clientes ativos mensais no segundo semestre', completed: false },
    { text: 'Estruturar o site institucional integrado com banco de dados Supabase', completed: false }
  ]
};

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'p-1',
    name: 'Módulo IoT de Monitoramento Industrial',
    description: 'Sistema completo com microcontrolador ESP32 que lê vibrações e temperaturas de motores, comunicando-se via protocolo MQTT com o broker HiveMQ e salvando logs estruturados em PostgreSQL no Supabase.',
    technologies: ['Flutter', 'ESP32', 'FreeRTOS', 'Supabase', 'PostgreSQL', 'Docker'],
    problemSolved: 'Identificação de desgaste de motores industriais de forma preditiva, evitando paradas na produção de até R$ 50 mil por hora.',
    learning: 'Cálculo de FFT em tempo real no firmware e consumo energético otimizado no ESP32 usando Deep Sleep.',
    status: 'Concluído',
    githubUrl: 'https://github.com/danielle-dev/esp32-industrial-vibration',
    futureImprovements: 'Criar uma rede mesh de sensores para cobrir galpões maiores sem depender de roteador central.',
    imageUrl: 'industrial_iot'
  },
  {
    id: 'p-2',
    name: 'Horizon Personal OS Dashboard',
    description: 'Painel de gerenciamento completo para estudantes de tecnologia e engenheiros, unificando trilhas de estudos acadêmicos, roadmap profissional com gamificação e finanças.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    problemSolved: 'Centralização de dados para quem divide o tempo entre graduação, freelas de engenharia e desenvolvimento de portfólio.',
    learning: 'Configuração avançada de tipos no TypeScript, gerenciamento de estado local para persistência de dados complexos e UX adaptada para telas densas.',
    status: 'Em Andamento',
    githubUrl: 'https://github.com/danielle-dev/horizon-personal-os',
    futureImprovements: 'Integrar relatórios automatizados por IA baseados em PDF ou texto, sinc do calendário com o Google Calendar.',
    imageUrl: 'horizon_dashboard'
  },
  {
    id: 'p-3',
    name: 'Compilador Simples da Linguagem C-Minus',
    description: 'Compilador que realiza análise léxica (Flex), sintática (Bison), semântica e gera código intermediário de três endereços para a arquitetura MIPS.',
    technologies: ['C++', 'Flex/Bison', 'MIPS Assembly', 'Linux'],
    problemSolved: 'Falta de ferramentas educacionais leves de simulação de compiladores para a universidade.',
    learning: 'Entendimento profundo sobre gramáticas livres de contexto, gerência de tabelas de símbolos e otimização de registradores na arquitetura de computadores.',
    status: 'Concluído',
    githubUrl: 'https://github.com/danielle-dev/c-minus-compiler',
    futureImprovements: 'Adicionar gerador de bytecode Java e uma interface web para visualizar o parser dinamicamente.',
    imageUrl: 'compiler_view'
  }
];

export const INITIAL_GAMIFICATION: GamificationState = {
  xp: 1420,
  level: 4,
  streak: 8,
  lastStudyDate: '2026-06-29',
  missions: [
    { id: 'm-1', title: 'Foco Absoluto Semanal', description: 'Registrar 12 horas totais de estudo na semana', xpReward: 350, completed: false, type: 'weekly', progress: 8.5, target: 12 },
    { id: 'm-2', title: 'Maratona Mensal', description: 'Completar 10 tarefas de faculdade ou projetos no mês', xpReward: 800, completed: true, type: 'monthly', progress: 10, target: 10 },
    { id: 'm-3', title: 'Equipamento Próximo', description: 'Economizar mais R$ 200 no fundo de equipamentos', xpReward: 200, completed: false, type: 'weekly', progress: 50, target: 200 },
    { id: 'm-4', title: 'Visão Estratégica', description: 'Responder à Revisão Semanal de domingo', xpReward: 300, completed: false, type: 'weekly', progress: 0, target: 1 }
  ],
  achievements: [
    { id: 'ac-1', title: 'Primeiro Passo', description: 'Configure o seu semestre e disciplinas acadêmicas', unlocked: true, icon: 'Award', unlockedAt: '2026-06-15' },
    { id: 'ac-2', title: 'Mestre do Código', description: 'Alcance o nível 4 em mais de 3 tecnologias do roadmap', unlocked: true, icon: 'Cpu', unlockedAt: '2026-06-22' },
    { id: 'ac-3', title: 'Sócio Fundador', description: 'Configure o Planejamento Estratégico da empresa', unlocked: true, icon: 'Briefcase', unlockedAt: '2026-06-25' },
    { id: 'ac-4', title: 'Hardware Hacker', description: 'Finalize um projeto que integre hardware e software', unlocked: true, icon: 'Zap', unlockedAt: '2026-06-28' },
    { id: 'ac-5', title: 'Revisor Fiel', description: 'Completou 3 Revisões Semanais consecutivas no domingo', unlocked: false, icon: 'Calendar' },
    { id: 'ac-6', title: 'Lenda da Computação', description: 'Chegue ao Nível 10 Geral no painel de controle Horizon', unlocked: false, icon: 'Crown' }
  ]
};

export const INITIAL_BOOKS_COURSES: BookCourse[] = [
  { id: 'bc-1', title: 'Código Limpo (Clean Code) - Robert C. Martin', type: 'Livro', status: 'Concluído', platformOrAuthor: 'Robert Martin' },
  { id: 'bc-2', title: 'Arquitetura Limpa (Clean Architecture) - Robert C. Martin', type: 'Livro', status: 'Lendo/Fazendo', platformOrAuthor: 'Robert Martin', hoursStudied: 12 },
  { id: 'bc-3', title: 'Curso Completo de Flutter e Dart', type: 'Curso', status: 'Concluído', platformOrAuthor: 'Udemy / Cod3r', hoursStudied: 42 },
  { id: 'bc-4', title: 'Certificado Redes de Computadores CCNA', type: 'Certificado', status: 'Lendo/Fazendo', platformOrAuthor: 'Cisco Networking Academy', hoursStudied: 28 },
  { id: 'bc-5', title: 'Sistemas Operacionais Modernos - Andrew S. Tanenbaum', type: 'Livro', status: 'Lendo/Fazendo', platformOrAuthor: 'Andrew Tanenbaum', hoursStudied: 15 }
];

export const STUDY_HISTORY_MOCK: StudySession[] = [
  { id: 'sh-1', date: '2026-06-24', hours: 2.5, subjectId: 'sub-3', notes: 'Estudo de fork(), threads e chamadas de sistema no Linux.' },
  { id: 'sh-2', date: '2026-06-25', hours: 3, techId: 'tech-flutter', notes: 'Implementação de interfaces Material Design 3 e gerenciamento de estado com BLoC.' },
  { id: 'sh-3', date: '2026-06-26', hours: 2, subjectId: 'sub-4', notes: 'Simulação de Assembly MIPS usando simulador MARS. Resolvidos 5 exercícios de loops.' },
  { id: 'sh-4', date: '2026-06-27', hours: 1.5, techId: 'tech-supabase', notes: 'Estudo e configuração de políticas de RLS (Row Level Security) no Supabase.' },
  { id: 'sh-5', date: '2026-06-28', hours: 4, subjectId: 'sub-5', notes: 'Modelagem UML do sistema Horizon para a entrega da disciplina de Engenharia de Software.' }
];

export const MOTIVATIONAL_QUOTES = [
  "O único lugar onde o sucesso vem antes do trabalho é no dicionário. Para o engenheiro de computação, persistência é o compilador da alma.",
  "O hardware é o corpo, o software é a mente. Desenvolver ambos é a arte suprema de um Engenheiro da Computação.",
  "Grandes sistemas não são escritos do nada; eles são reescritos, testados, lidos, refinados e otimizados com disciplina diária.",
  "A consistência de 1 hora por dia supera 10 horas de estudo acumuladas no domingo. Codifique o seu futuro hoje.",
  "Seu cérebro aprende como redes neurais: conexões fortes requerem ativação repetida. Não desista se o código falhar hoje!"
];

export const COMPUTER_ENGINEERING_TIPS = [
  "Dica de Arquitetura: Em projetos Flutter, mantenha a UI livre de lógica de negócios. Separe seus dados em Data Sources e isole a lógica no Domain (Usecases).",
  "Dica de Supabase: Nunca exponha chaves secretas (service_role) no cliente. Use RLS (Row Level Security) inteligentes para garantir que os dados pessoais fiquem protegidos.",
  "Dica de Hardware: Otimize laços de repetição (Loop Nesting) para favorecer a Cache L1. Acessar a memória de forma sequencial previne Cache Misses e acelera o tempo de CPU.",
  "Dica de PostgreSQL: Utilize índices (B-Tree ou GIST) para campos que aparecem com frequência em filtros WHERE. Isso reduz a complexidade das consultas de O(N) para O(log N).",
  "Dica de Docker: Use imagens multi-stage builds em seus deploys Node.js ou Flutter Web. Isso reduz drasticamente o tamanho final da imagem e acelera o deploy."
];
