# Clinica Veterinaria

## Stack do Projeto

### Frameworks e Runtime

| Tecnologia | Tipo | Uso no projeto |
| --- | --- | --- |
| Next.js 16 | Framework full-stack React | Estrutura a aplicacao com App Router, renderizacao server/client e rotas para auth. |
| React 19 | Biblioteca de UI | Construi os componentes e a interface da aplicacao. |
| React DOM 19 | Renderer web do React | Faz a renderizacao dos componentes React no navegador e no fluxo de hidratacao. |
| Node.js | Runtime JavaScript no servidor | Executa o ambiente de desenvolvimento, build e servidor Next.js. |

### Backend e Dados

| Tecnologia | Tipo | Uso no projeto |
| --- | --- | --- |
| Supabase | Plataforma backend (BaaS) | Fornece banco Postgres, autenticacao e APIs para o sistema da clinica. |
| @supabase/supabase-js | SDK JavaScript do Supabase | Permite consultar tabelas e chamar recursos do Supabase no app. |
| @supabase/ssr | Integracao SSR para Supabase | Cria clientes Supabase para browser, server components e middleware com cookies de sessao. |

### Estilizacao

| Tecnologia | Tipo | Uso no projeto |
| --- | --- | --- |
| Tailwind CSS 4 | Framework CSS utilitario | Define o estilo da interface usando classes utilitarias no JSX/TSX. |
| PostCSS | Processador de CSS | Processa o CSS do projeto com o plugin oficial do Tailwind. |
| @tailwindcss/postcss | Plugin PostCSS do Tailwind | Integra o Tailwind CSS 4 ao pipeline de estilos da aplicacao. |
| next/font (Geist e Geist Mono) | Sistema de fontes do Next.js | Carrega e otimiza fontes do Google automaticamente no layout global. |

### Qualidade e Linguagem

| Tecnologia | Tipo | Uso no projeto |
| --- | --- | --- |
| TypeScript 5 | Linguagem tipada para JavaScript | Garante tipagem estatica e melhor manutencao do codigo. |
| ESLint 9 | Linter de codigo | Identifica problemas de qualidade e padrao no codigo-fonte. |
| eslint-config-next | Regras ESLint do ecossistema Next | Aplica regras recomendadas de Next.js, React e Core Web Vitals. |
| @types/node, @types/react, @types/react-dom | Tipos TypeScript | Fornecem definicoes de tipos para Node.js e bibliotecas React. |

### Compilacao e Otimizacao

| Tecnologia | Tipo | Uso no projeto |
| --- | --- | --- |
| React Compiler (reactCompiler + babel-plugin-react-compiler) | Otimizacao de compilacao React | Ativa transformacoes de compilacao para melhorar desempenho e reduzir trabalho manual de memoizacao. |

### CLI e Scripts

| Comando | Ferramenta | Uso no projeto |
| --- | --- | --- |
| npm run dev | Next.js CLI | Sobe o ambiente de desenvolvimento da aplicacao. |
| npm run build | Next.js CLI | Gera a build de producao do projeto. |
| npm run start | Next.js CLI | Inicia o servidor da build de producao. |
| npm run lint | ESLint CLI | Executa analise estatica para encontrar problemas de codigo. |
| supabase | Supabase CLI | Gerencia recursos do projeto Supabase (migracoes, banco local e operacoes de desenvolvimento). |
