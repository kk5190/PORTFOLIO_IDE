
import { FileNode } from './types';

export const INITIAL_FILES: FileNode[] = [
  {
    id: 'about',
    name: 'About.md',
    type: 'markdown',
    icon: 'description',
    iconColor: 'text-orange-400',
    path: 'PORTFOLIO_PROJECT > src > About.md',
    content: `---
# Profile Summary
# Last updated: November 2023
---

# Profile

Senior Software Engineer with a passion for building robust, scalable systems and elegant user experiences. Expert in distributed architectures and modern web technologies.

## Philosophy

I believe in clean code, automated testing, and the power of collaborative problem-solving. My approach focuses on creating maintainable systems that evolve alongside business needs without compromising performance or reliability.

## Core Focus

* System Design: Architecting high-throughput distributed services.
* Scalability: Optimizing cloud infrastructure and database performance.
* Leadership: Mentoring engineering teams and driving technical roadmaps.
* DX: Improving developer experience through better tooling.

## Professional Highlights

### Senior Software Engineer
TechNova Solutions | 2021 - Present
- Led cross-functional initiatives between DevOps and Product teams to reduce deployment cycles by 40%.
- Spearheaded the migration of legacy monolith to microservices using Go and K8s.
- Established new engineering standards for API design and documentation.`
  },
  {
    id: 'experience',
    name: 'Experience.json',
    type: 'json',
    icon: 'code',
    iconColor: 'text-yellow-400',
    path: 'PORTFOLIO_PROJECT > src > Experience.json',
    content: `// Professional Experience | John Doe
// Last updated: November 2023

{
  "work_history": [
    {
      "position": "Senior Software Engineer",
      "company": "TechNova Solutions",
      "location": "Remote",
      "period": "// 2021 — PRESENT",
      "tech_stack": ["React", "Node.js", "Kubernetes", "Go"],
      "achievements": [
        "Led migration to microservices",
        "Optimized CI/CD pipelines",
        "Mentored junior engineers"
      ]
    },
    {
      "position": "Full Stack Developer",
      "company": "CloudScale Systems",
      "period": "// 2018 — 2021",
      "tech_stack": ["Vue.js", "Python", "AWS", "PostgreSQL"],
      "achievements": [
        "Built real-time dashboard",
        "Reduced query latency by 50%"
      ]
    },
    {
      "position": "Software Intern",
      "company": "InnoSoft Inc.",
      "period": "// Summer 2017",
      "tech_stack": ["JavaScript", "CSS", "PHP"],
      "achievements": [
        "Assisted in UI redesign"
      ]
    }
  ]
}`
  },
  {
    id: 'skills',
    name: 'Skills.yaml',
    type: 'yaml',
    icon: 'list_alt',
    iconColor: 'text-primary',
    path: 'PORTFOLIO_PROJECT > src > Skills.yaml',
    content: `# Skills & Technologies | John Doe
# Last updated: November 2023

Frontend:
  frameworks:
    - "React 18"
    - "Next.js"
    - "Vue.js 3"
  styling:
    - "Tailwind CSS"
    - "SASS/SCSS"
    - "Framer Motion"

Backend:
  languages:
    - "Node.js (TypeScript)"
    - "Python (FastAPI)"
    - "Go (Golang)"
  databases:
    - "PostgreSQL"
    - "MongoDB"
    - "Redis"

Data_AI:
  stack:
    - "PyTorch"
    - "Pandas/NumPy"
    - "LangChain"

Tools:
  devops:
    - "Docker & Kubernetes"
    - "AWS (EC2, S3, Lambda)"
    - "GitHub Actions"

# Achievement added for Senior Software Engineer role:
# Led cross-functional team of 8 to migrate legacy architecture to microservices.`
  },
  {
    id: 'projects',
    name: 'Projects.md',
    type: 'markdown',
    icon: 'terminal',
    iconColor: 'text-blue-400',
    path: 'PORTFOLIO_PROJECT > src > Projects.md',
    content: `# Technical Projects & Achievements
# Last updated: November 2023

## Current Role: Senior Software Engineer
- Successfully led cross-functional team of 8 to launch core infrastructure migration, reducing latency by 40%.
- Mentored junior developers and established code review standards for the engineering organization.

## Featured Projects

### AI Powered Analytics Dashboard
Role: Lead Architect
- Developed a real-time data ingestion pipeline using Go and Kafka.
- Implemented TensorFlow models for predictive churn analysis.
- Visualization layer built with React and D3.js.

### Open Source Personalization Module
Role: Principal Contributor
- Created a plug-and-play middleware for Node.js applications.
- Automated A/B testing variations using cookie-based partitioning.
- Integrated Redis for sub-5ms profile lookups.

## Tech Stack Spotlight
// Primary languages and tools

- TypeScript
- Rust
- Kubernetes
- GraphQL`
  },
  {
    id: 'eslint',
    name: '.eslintrc.js',
    type: 'settings',
    icon: 'settings',
    iconColor: 'text-blue-300',
    path: 'PORTFOLIO_PROJECT > .eslintrc.js',
    content: `module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  env: {
    browser: true,
    node: true
  },
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
};`
  },
  {
    id: 'package',
    name: 'package.json',
    type: 'settings',
    icon: 'info',
    iconColor: 'text-orange-400',
    path: 'PORTFOLIO_PROJECT > package.json',
    content: `{
  "name": "john-doe-portfolio",
  "version": "2.0.0",
  "description": "IDE themed portfolio",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "tailwindcss": "^3.3.0"
  }
}`
  }
];
