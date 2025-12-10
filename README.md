# Rexplore MVP

Rexplore is a platform to help people discover free learning and earning opportunities online.

## Features
- **Resource Discovery**: Browse curated courses, jobs, and events.
- **Submission System**: Users can submit new resources.
- **Admin Dashboard**: Admins can approve or reject submissions.
- **Authentication**: Powered by Clerk.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 + Shadcn UI
- **Auth**: Clerk
- **Database**: Supabase 

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Copy `env.example` to `.env.local` and fill in your keys:
    ```bash
    cp env.example .env.local
    ```
    You need keys for:
    - [Clerk](https://clerk.com/)
    - [Supabase](https://supabase.com/)

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

## Project Structure
- `src/app`: Next.js App Router pages.
- `src/components`: UI components (Navbar, ResourceCard, etc.).
- `src/lib`: Utility functions and Supabase client.

## 📁 Repository Structure
📁 Project Structure
.
├── 📂 app/                 – App router entry
├── 📂 components/          – Reusable UI components
├── 📂 lib/                 – Logic, utils, Supabase client
├── 📂 types/               – TS interfaces & types
├── 📂 styles/              – Global & module CSS
├── 🔐 middleware.ts        – Authentication (Clerk)
│
├── 🗄️ supabase/
│   └── 📄 schema.sql       – Database schema
│
└── 📂 src/
    └── 📂 app/
        ├── 📄 layout.tsx    – HTML/Body wrapper
        ├── 📄 page.tsx      – Home page
        ├── 📄 globals.css   – Global styles
        ├── 📂 api/          
        ├── 📂 admin/
        ├── 📂 submit/
        └── 📂 resources/

At the root level you will find the following files and configurations:

| File / Config | Purpose / Description |
|---------------|----------------------|
| `.env.local` / `.env.example` | Environment-variable configuration files (e.g. API keys for Supabase, Clerk, etc.). `.env.example` provides a template for required variables. |
| `next.config.js` | Configuration for :contentReference[oaicite:0]{index=0} — settings for build, environment, and other framework-level configurations. |
| `postcss.config.js` | Configuration for :contentReference[oaicite:1]{index=1} — handles PostCSS transformations (e.g. autoprefixing, Tailwind preprocessing). |
| `tailwind.config.js` | Configuration for :contentReference[oaicite:2]{index=2} — sets design tokens, customizations, and theming for your CSS styles. |
| `tsconfig.json` | Configuration for :contentReference[oaicite:3]{index=3} — controls compiler options, module resolution, and type checking settings. |
| `package.json` | Lists project dependencies (e.g. React, Next.js, `lucide-react`, etc.), scripts for building/running the project, and other metadata. |
| `eslint.config.mjs` | Configuration for :contentReference[oaicite:4]{index=4} — a linting tool that analyzes your code to catch errors and enforce coding/convention rules. |
| `.prettierrc` | Configuration for :contentReference[oaicite:5]{index=5} — ensures consistent code formatting across different editors. |
| `.gitignore` | Specifies which files or directories Git should ignore — useful to exclude build artifacts, sensitive files, or OS/editor-specific files. |
| `.nvmrc` | Specifies the Node.js version to use (via :contentReference[oaicite:6]{index=6}) so contributors use a consistent runtime environment. |
| `.editorconfig` | Configuration for consistent editor behavior across different IDEs/editors — helps enforce consistent indentation, line endings, etc. |
| `components.json` | Configuration for your UI library (here, :contentReference[oaicite:7]{index=7}) — tells its CLI where your components live, what styling system you use, and where to scaffold new components when you run commands like `shadcn-ui@latest add button`. |
| `LICENSE` | The license file — defines legal terms under which others can use, modify, and distribute your code. |
| `next-env.d.ts` | A TypeScript declaration file automatically generated and managed by Next.js — provides type definitions for the Next.js environment. |
| `README.md` | (This file) — documentation for the project: explains what the project does, how to set up, structure, and how to contribute / run. |
| (project root) | The root folder serves as the “home base” — it contains all configuration, metadata, and the entry point for the project. |



## Note on Backend
The UI is fully implemented with mock data. To enable real data persistence:
1.  Set up a Supabase project.
2.  Create a `resources` table.
3.  Implement API routes to fetch/save data using the `supabase` client in `src/lib/supabase.ts`.
