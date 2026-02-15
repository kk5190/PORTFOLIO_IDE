
import { FileNode, Theme, GitCommit } from './types';
import { PORTFOLIO_CONFIG } from './portfolio.config';

export const THEMES: Theme[] = [
  {
    id: 'dracula',
    name: 'Dracula',
    colors: {
      background: '#1e1f29',
      sidebar: '#191a21',
      activityBar: '#15161d',
      primary: '#bd93f9',
      editorBg: '#282a36',
      text: '#f8f8f2',
      comment: '#6272a4',
      string: '#f1fa8c',
      keyword: '#ff79c6',
      variable: '#8be9fd',
      type: '#50fa7b',
      border: 'rgba(255,255,255,0.05)'
    }
  },
  {
    id: 'one-dark',
    name: 'One Dark Pro',
    colors: {
      background: '#21252b',
      sidebar: '#282c34',
      activityBar: '#1e2227',
      primary: '#61afef',
      editorBg: '#282c34',
      text: '#abb2bf',
      comment: '#5c6370',
      string: '#98c379',
      keyword: '#c678dd',
      variable: '#e06c75',
      type: '#d19a66',
      border: 'rgba(255,255,255,0.05)'
    }
  },
  {
    id: 'github-light',
    name: 'GitHub Light',
    isLight: true,
    colors: {
      background: '#ffffff',
      sidebar: '#f6f8fa',
      activityBar: '#24292f',
      primary: '#0969da',
      editorBg: '#ffffff',
      text: '#24292f',
      comment: '#6e7781',
      string: '#0a3069',
      keyword: '#cf222e',
      variable: '#953800',
      type: '#116329',
      border: 'rgba(0,0,0,0.08)'
    }
  }
];

export const MOCK_GIT_HISTORY: GitCommit[] = [
  {
    id: 'c7',
    hash: 'a7b8c9d',
    message: 'feat: add interactive terminal simulation',
    author: 'Krishna Kumar Singh',
    date: '2 hours ago',
    branch: 'main',
    color: '#bd93f9',
    lane: 0,
    parents: ['c6']
  },
  {
    id: 'c6',
    hash: 'e5f6g7h',
    message: 'merge: pull request #42 from feature/atomic-design',
    author: 'Krishna Kumar Singh',
    date: '5 hours ago',
    branch: 'main',
    color: '#bd93f9',
    lane: 0,
    parents: ['c5', 'f2']
  }
];

export const INITIAL_FILES: FileNode[] = [
  {
    id: 'about',
    name: 'AboutMe.md',
    type: 'markdown',
    icon: 'description',
    iconColor: 'text-blue-400',
    path: 'PORTFOLIO > src > AboutMe.md',
    gitStatus: 'modified',
    content: `# ${PORTFOLIO_CONFIG.name}
## ${PORTFOLIO_CONFIG.title} @ ${PORTFOLIO_CONFIG.company}

${PORTFOLIO_CONFIG.about.summary}

---

### Core Philosophy
${PORTFOLIO_CONFIG.about.philosophy}

### Contact Information
- Email: ${PORTFOLIO_CONFIG.email}
- GitHub: ${PORTFOLIO_CONFIG.github}
- LinkedIn: ${PORTFOLIO_CONFIG.linkedin}`
  },
  {
    id: 'experience',
    name: 'Experience.json',
    type: 'json',
    icon: 'data_object',
    iconColor: 'text-yellow-500',
    path: 'PORTFOLIO > src > Experience.json',
    gitStatus: 'added',
    content: JSON.stringify({ work_history: PORTFOLIO_CONFIG.experience }, null, 2)
  },
  {
    id: 'skills',
    name: 'Skills.yaml',
    type: 'yaml',
    icon: 'settings',
    iconColor: 'text-purple-400',
    path: 'PORTFOLIO > src > Skills.yaml',
    content: `Technical_Skills:
  Frontend:
    ${PORTFOLIO_CONFIG.skills.frontend.map(s => `- "${s}"`).join('\n    ')}
  Backend:
    ${PORTFOLIO_CONFIG.skills.backend.map(s => `- "${s}"`).join('\n    ')}
  DevOps:
    ${PORTFOLIO_CONFIG.skills.devops.map(s => `- "${s}"`).join('\n    ')}
  Tools:
    ${PORTFOLIO_CONFIG.skills.tools.map(s => `- "${s}"`).join('\n    ')}`
  },
  {
    id: 'projects',
    name: 'Projects.md',
    type: 'markdown',
    icon: 'description',
    iconColor: 'text-blue-400',
    path: 'PORTFOLIO > src > Projects.md',
    gitStatus: 'added',
    content: `# Featured Projects

${PORTFOLIO_CONFIG.projects.map(p => `## ${p.name}
- Description: ${p.description}
- Tech Stack: ${p.tech.join(', ')}
- Link: [${p.link}](https://${p.link})`).join('\n\n')}`
  },
  {
    id: 'readme',
    name: 'README.md',
    type: 'markdown',
    icon: 'description',
    iconColor: 'text-blue-400',
    path: 'PORTFOLIO > README.md',
    gitStatus: 'modified',
    content: `# IDE Portfolio v1.5.0

This is a professional developer portfolio designed to simulate a modern Integrated Development Environment (IDE). 

### 🚀 Local Development
To run this project on your own machine:
1.  **Clone** this repository to your local drive.
2.  **Serve** the root directory using any static server. 
    - E.g., \`npx serve .\` or use the "Live Server" VS Code extension.
3.  Open the provided URL in your browser.

### 🛠 Tech Stack
- **React 19**: UI Composition
- **Tailwind CSS**: Utility-first styling
- **ES Modules**: Direct browser imports (no heavy build step)
- **Material Symbols**: Sharp, consistent iconography`
  }
];
