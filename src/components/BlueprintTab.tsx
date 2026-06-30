import React, { useState } from 'react';
import { Copy, Check, FolderTree, Database, Cpu, Terminal, Layers } from 'lucide-react';

export default function BlueprintTab() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const cleanArchTree = `lib/
│
├── core/
│   ├── errors/
│   │   ├── failures.dart
│   │   └── exceptions.dart
│   ├── theme/
│   │   ├── app_theme.dart
│   │   └── app_colors.dart
│   └── utils/
│       ├── constants.dart
│       └── helpers.dart
│
├── services/
│   ├── supabase_service.dart
│   └── local_storage_service.dart
│
├── domain/ (Enterprise Business Logic)
│   ├── models/
│   │   ├── academic_subject.dart
│   │   ├── career_tech.dart
│   │   ├── portfolio_project.dart
│   │   ├── business_metric.dart
│   │   └── equipment_model.dart
│   └── repositories/
│       ├── academic_repository.dart
│       ├── career_repository.dart
│       ├── portfolio_repository.dart
│       ├── business_repository.dart
│       └── finance_repository.dart
│
├── data/ (Data Mapping & Infrastructure)
│   ├── datasources/
│   │   ├── remote/
│   │   │   └── supabase_remote_datasource.dart
│   │   └── local/
│   │       └── hive_local_datasource.dart
│   └── repositories_impl/
│       ├── academic_repository_impl.dart
│       ├── career_repository_impl.dart
│       ├── portfolio_repository_impl.dart
│       ├── business_repository_impl.dart
│       └── finance_repository_impl.dart
│
└── presentation/ (UI layer)
    ├── state_management/ (BLoC or Riverpod)
    │   ├── dashboard/
    │   ├── academic/
    │   ├── career/
    │   └── finances/
    ├── screens/
    │   ├── dashboard_screen.dart
    │   ├── academic_screen.dart
    │   ├── career_screen.dart
    │   ├── portfolio_screen.dart
    │   ├── business_screen.dart
    │   └── finance_screen.dart
    └── widgets/
        ├── progress_bar_widget.dart
        ├── customized_card.dart
        └── gamification_banner.dart`;

  const postgresSchema = `-- Tabela de Usuários (Estudante) - Integrada com Supabase Auth
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    streak INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- MÓDULO ACADÊMICO
CREATE TABLE IF NOT EXISTS public.academic_subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    code TEXT,
    semester INTEGER NOT NULL,
    status TEXT CHECK (status IN ('Em Andamento', 'Concluído', 'Trancado')) DEFAULT 'Em Andamento',
    professor TEXT,
    schedule TEXT,
    credits INTEGER DEFAULT 4,
    attendance INTEGER DEFAULT 100,
    grade NUMERIC(4, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.academic_exams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_id UUID REFERENCES public.academic_subjects(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    weight NUMERIC(3, 2) NOT NULL,
    grade NUMERIC(4, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.academic_tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_id UUID REFERENCES public.academic_subjects(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    due_date DATE NOT NULL,
    done BOOLEAN DEFAULT false,
    type TEXT CHECK (type IN ('Trabalho', 'Exercício', 'Projeto')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- MÓDULO CARREIRA (ROADMAP)
CREATE TABLE IF NOT EXISTS public.career_roadmap (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL, -- Ex: 'Git', 'Flutter', etc.
    current_level INTEGER CHECK (current_level BETWEEN 0 AND 5) DEFAULT 0,
    desired_level INTEGER CHECK (desired_level BETWEEN 0 AND 5) DEFAULT 5,
    hours_studied NUMERIC(8, 2) DEFAULT 0.00,
    courses_count INTEGER DEFAULT 0,
    certificates_count INTEGER DEFAULT 0,
    projects_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- MÓDULO PORTFÓLIO (PROJETOS)
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] NOT NULL,
    problem_solved TEXT,
    learning TEXT,
    status TEXT CHECK (status IN ('Ideia', 'Em Andamento', 'Concluído')) DEFAULT 'Ideia',
    github_url TEXT,
    future_improvements TEXT,
    image_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- MÓDULO EMPRESA
CREATE TABLE IF NOT EXISTS public.business_metadata (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    brand_name TEXT NOT NULL,
    mission TEXT,
    vision TEXT,
    values TEXT[] DEFAULT '{}',
    financial_goal NUMERIC(12, 2) DEFAULT 0.00,
    current_revenue NUMERIC(12, 2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS public.business_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.business_clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    status TEXT CHECK (status IN ('Lead', 'Ativo', 'Finalizado')) DEFAULT 'Lead',
    value NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- MÓDULO FINANÇAS & EQUIPAMENTOS
CREATE TABLE IF NOT EXISTS public.financial_pots (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    category TEXT CHECK (category IN ('Pessoal', 'Empresa', 'Equipamentos', 'Reserva de Emergência', 'Investimentos')) NOT NULL,
    current_amount NUMERIC(12, 2) DEFAULT 0.00,
    target_amount NUMERIC(12, 2),
    color TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.equipments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    value NUMERIC(10, 2) NOT NULL,
    saved NUMERIC(10, 2) DEFAULT 0.00,
    priority TEXT CHECK (priority IN ('Alta', 'Média', 'Baixa')) DEFAULT 'Média',
    category TEXT CHECK (category IN ('Tablet', 'Notebook', 'Câmera', 'Monitor', 'Setup', 'Outro')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- MÓDULO REVISÃO SEMANAL
CREATE TABLE IF NOT EXISTS public.weekly_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    progressed TEXT NOT NULL,
    learned TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    proud_of TEXT NOT NULL,
    to_improve TEXT NOT NULL,
    focus_next_week TEXT NOT NULL,
    weekly_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_roadmap ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_pots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_reviews ENABLE ROW LEVEL SECURITY;

-- Políticas Básicas: Usuário pode acessar apenas seus próprios registros
CREATE POLICY user_profile_policy ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY user_subjects_policy ON public.academic_subjects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_exams_policy ON public.academic_exams FOR ALL USING (subject_id IN (SELECT id FROM public.academic_subjects WHERE user_id = auth.uid()));
CREATE POLICY user_tasks_policy ON public.academic_tasks FOR ALL USING (subject_id IN (SELECT id FROM public.academic_subjects WHERE user_id = auth.uid()));
CREATE POLICY user_career_policy ON public.career_roadmap FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_portfolio_policy ON public.portfolio_projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_business_meta_policy ON public.business_metadata FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_business_services_policy ON public.business_services FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_business_clients_policy ON public.business_clients FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_finances_policy ON public.financial_pots FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_equipments_policy ON public.equipments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_reviews_policy ON public.weekly_reviews FOR ALL USING (auth.uid() = user_id);`;

  const nodeBackendRoadmap = `ROADMAP DE IMPLEMENTAÇÃO: BACKEND EM NODE.JS (TypeScript + Express + Supabase-js)

Este roteiro descreve as etapas para criar um servidor Node.js que atua como barramento de serviços, webhook para o Supabase ou motor de relatórios adicionais para o app.

Etapa 1: Inicialização do Projeto
  $ mkdir horizon-backend && cd horizon-backend
  $ npm init -y
  $ npm install express @supabase/supabase-js dotenv cors helmet
  $ npm install -D typescript @types/express @types/node ts-node @types/cors esbuild

Etapa 2: Configuração do TypeScript (tsconfig.json)
  Configurar para geração de ES6 modular, mapeamento de diretórios e tipagem estrita de nulos.

Etapa 3: Criação do Cliente do Supabase (src/services/supabase.ts)
  import { createClient } from '@supabase/supabase-js';
  import dotenv from 'dotenv';
  dotenv.config();

  export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

Etapa 4: Criação dos Controllers e Middlewares de Auth (src/middleware/auth.ts)
  Intercepta o token Bearer JWT enviado pelo Flutter e valida via:
  supabase.auth.getUser(token).

Etapa 5: Rotas de Integração / APIs customizadas:
  - GET /api/reports/summary: Consolida dados de finanças, horas estudadas e matérias em formato JSON estruturado.
  - POST /api/weekly-review/generate: Gera o resumo textual consolidando as respostas da revisão.
  - GET /api/gamification/status: Processa as pontuações do usuário e atualiza conquistas.

Etapa 6: Deploy em Nuvem (Cloud Run / Render)
  Configurar variáveis de ambiente do Supabase (URL, API_KEY) nas configurações de produção.`;

  const pubspecYaml = `name: horizon_app
description: "Horizon - Personal Operating System para Engenharia da Computação."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

  # Supabase & Integração de Banco de Dados
  supabase_flutter: ^2.6.0
  postgrest: ^4.1.0

  # Gerência de Estado & Injeção de Dependências
  flutter_bloc: ^8.1.3
  get_it: ^7.6.0

  # Persistência Local (Offline Cache)
  hive_flutter: ^1.1.0
  shared_preferences: ^2.2.3

  # UI/UX & Visualização de Dados
  google_fonts: ^6.1.0
  fl_chart: ^0.66.0      # Gráficos Financeiros e de Estudos
  lucide_icons: ^0.300.0  # Biblioteca unificada de ícones
  percent_indicator: ^4.2.3 # Barras de progresso e indicadores circulares
  shimmer: ^3.0.0         # Feedbacks de carregamento elegantes

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0`;

  return (
    <div id="blueprints-container" className="space-y-8">
      {/* Overview Card */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Layers className="text-[#34C759] w-6 h-6" /> Blueprints de Engenharia & Arquitetura
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
          Como Engenheiro de Software Sênior, projetei a especificação completa do ecossistema do **Horizon**. 
          Abaixo você encontra as especificações de **Clean Architecture para Flutter**, o **Script de Banco de Dados PostgreSQL para Supabase**, 
          o **Roteiro de API Node.js**, e as dependências oficiais do **pubspec.yaml**. Todos os códigos estão prontos para cópia direta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flutter Clean Architecture Directory Structure */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 flex justify-between items-center">
            <span className="text-slate-800 dark:text-white font-bold text-sm flex items-center gap-2">
              <FolderTree className="text-[#7C3AED] w-4 h-4" /> 1. Estrutura de Pastas (Clean Architecture)
            </span>
            <button
              id="copy-arch-btn"
              onClick={() => copyToClipboard(cleanArchTree, 'arch')}
              className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 bg-white dark:bg-white/5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 transition-all cursor-pointer font-semibold shadow-sm"
            >
              {copiedSection === 'arch' ? (
                <>
                  <Check className="w-3 h-3 text-[#34C759]" /> Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copiar
                </>
              )}
            </button>
          </div>
          <div className="p-4 flex-1 bg-slate-900 dark:bg-black/40">
            <pre className="text-xs text-emerald-400 dark:text-emerald-300 font-mono whitespace-pre overflow-x-auto max-h-[350px]">
              {cleanArchTree}
            </pre>
          </div>
        </div>

        {/* Flutter pubspec.yaml Dependencies */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 flex justify-between items-center">
            <span className="text-slate-800 dark:text-white font-bold text-sm flex items-center gap-2">
              <Cpu className="text-[#34C759] w-4 h-4" /> 2. Flutter pubspec.yaml (Dependências)
            </span>
            <button
              id="copy-pub-btn"
              onClick={() => copyToClipboard(pubspecYaml, 'pub')}
              className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 bg-white dark:bg-white/5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 transition-all cursor-pointer font-semibold shadow-sm"
            >
              {copiedSection === 'pub' ? (
                <>
                  <Check className="w-3 h-3 text-[#34C759]" /> Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copiar
                </>
              )}
            </button>
          </div>
          <div className="p-4 flex-1 bg-slate-900 dark:bg-black/40">
            <pre className="text-xs text-purple-300 font-mono whitespace-pre overflow-x-auto max-h-[350px]">
              {pubspecYaml}
            </pre>
          </div>
        </div>
      </div>

      {/* Database Schema (PostgreSQL for Supabase) */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 flex justify-between items-center">
          <span className="text-slate-800 dark:text-white font-bold text-sm flex items-center gap-2">
            <Database className="text-[#34C759] w-4 h-4" /> 3. Script PostgreSQL (Modelagem Supabase com RLS)
          </span>
          <button
            id="copy-sql-btn"
            onClick={() => copyToClipboard(postgresSchema, 'sql')}
            className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 bg-white dark:bg-white/5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 transition-all cursor-pointer font-semibold shadow-sm"
          >
            {copiedSection === 'sql' ? (
              <>
                <Check className="w-3 h-3 text-[#34C759]" /> Copiado!
              </>
            ) : (
                <>
                  <Copy className="w-3 h-3" /> Copiar Código SQL
                </>
              )}
          </button>
        </div>
        <div className="p-4 bg-slate-900 dark:bg-black/40">
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 font-medium">
            *Execute este script no <strong>Query Editor</strong> do seu console do Supabase para criar todas as tabelas organizadas por módulos e habilitar as políticas de segurança RLS.*
          </p>
          <pre className="text-[11px] text-blue-300 font-mono whitespace-pre overflow-x-auto max-h-[380px] leading-relaxed">
            {postgresSchema}
          </pre>
        </div>
      </div>

      {/* Node.js Backend Roteiro */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 flex justify-between items-center">
          <span className="text-slate-800 dark:text-white font-bold text-sm flex items-center gap-2">
            <Terminal className="text-[#7C3AED] w-4 h-4" /> 4. Roteiro Backend Node.js (TypeScript / Express / Supabase SDK)
          </span>
          <button
            id="copy-node-btn"
            onClick={() => copyToClipboard(nodeBackendRoadmap, 'node')}
            className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 bg-white dark:bg-white/5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 transition-all cursor-pointer font-semibold shadow-sm"
          >
            {copiedSection === 'node' ? (
              <>
                <Check className="w-3 h-3 text-[#34C759]" /> Copiado!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copiar Roteiro
              </>
            )}
          </button>
        </div>
        <div className="p-5 bg-slate-900 dark:bg-black/40 space-y-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-medium">
            Para estender as funcionalidades locais do aplicativo e prover um hub de APIs complementares para o app, o microserviço Node.js/Express conecta ao mesmo pool PostgreSQL e provê APIs autenticadas.
          </p>
          <pre className="text-xs text-slate-300 font-mono whitespace-pre overflow-x-auto max-h-[350px]">
            {nodeBackendRoadmap}
          </pre>
        </div>
      </div>

      {/* Recommended steps */}
      <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 p-6 rounded-3xl backdrop-blur-md">
        <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2">Próximos Passos Recomendados para Desenvolvimento</h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc list-inside font-medium">
          <li><strong>Passo 1:</strong> Crie um projeto no Supabase, crie as tabelas executando o script SQL acima no Query Editor.</li>
          <li><strong>Passo 2:</strong> Inicialize um novo projeto Flutter com <code className="text-purple-600 dark:text-purple-400 font-mono font-bold">flutter create horizon</code>.</li>
          <li><strong>Passo 3:</strong> Configure as dependências no <code className="text-purple-600 dark:text-purple-400 font-mono font-bold">pubspec.yaml</code> e estabeleça a estrutura de pastas Clean Architecture.</li>
          <li><strong>Passo 4:</strong> Implemente os DataSources usando a biblioteca <code className="text-purple-600 dark:text-purple-400 font-mono font-bold">supabase_flutter</code> e utilize Row Level Security para filtrar o UUID do usuário logado.</li>
          <li><strong>Passo 5:</strong> Configure as gerências de estados (BLoC/Cubit) no nível de Presentation para sincronizar as alterações e manter suporte offline inteligente com Hive.</li>
        </ul>
      </div>
    </div>
  );
}
