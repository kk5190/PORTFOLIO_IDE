
import { FileNode, Theme } from './types';
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
  },
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    isLight: true,
    colors: {
      background: '#fdf6e3',
      sidebar: '#eee8d5',
      activityBar: '#073642',
      primary: '#268bd2',
      editorBg: '#fdf6e3',
      text: '#586e75',
      comment: '#93a1a1',
      string: '#859900',
      keyword: '#859900',
      variable: '#268bd2',
      type: '#cb4b16',
      border: 'rgba(0,0,0,0.1)'
    }
  },
  {
    id: 'quiet-light',
    name: 'Quiet Light',
    isLight: true,
    colors: {
      background: '#f2f2f2',
      sidebar: '#e8e8e8',
      activityBar: '#c4c4c4',
      primary: '#705697',
      editorBg: '#f2f2f2',
      text: '#333333',
      comment: '#aaaaaa',
      string: '#448c27',
      keyword: '#705697',
      variable: '#7a3e9d',
      type: '#aa3731',
      border: 'rgba(0,0,0,0.05)'
    }
  }
];

export const INITIAL_FILES: FileNode[] = [
  {
    id: 'about',
    name: 'AboutMe.md',
    type: 'markdown',
    icon: 'description',
    iconColor: 'text-orange-400',
    path: 'PORTFOLIO > src > AboutMe.md',
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
    icon: 'code',
    iconColor: 'text-yellow-400',
    path: 'PORTFOLIO > src > Experience.json',
    content: JSON.stringify({ work_history: PORTFOLIO_CONFIG.experience }, null, 2)
  },
  {
    id: 'skills',
    name: 'Skills.yaml',
    type: 'yaml',
    icon: 'list_alt',
    iconColor: 'text-primary',
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
    icon: 'terminal',
    iconColor: 'text-blue-400',
    path: 'PORTFOLIO > src > Projects.md',
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
    icon: 'menu_book',
    iconColor: 'text-blue-500',
    path: 'PORTFOLIO > README.md',
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
- **Material Symbols**: Sharp, consistent iconography

### 🎨 Customization
You can customize all the content by editing \`portfolio.config.ts\`. To change the IDE behavior, look into \`App.tsx\` and \`constants.tsx\`.`
  },
  {
    id: 'contributing',
    name: 'CONTRIBUTING.md',
    type: 'markdown',
    icon: 'handshake',
    iconColor: 'text-purple-400',
    path: 'PORTFOLIO > CONTRIBUTING.md',
    content: `# Contributing to IDE Portfolio

First off, thank you for considering contributing to this template! It's people like you that make the web a cooler place for developers.

### 📝 Reporting Bugs
- Check the issues tab to see if the bug has already been reported.
- If not, open a new issue with a clear title and description of the problem.

### 💡 Feature Requests
- We welcome new IDE-like features! 
- Ideas: Git Graph view, Debugger simulation, Search in files, etc.

### 👨‍💻 Code Contributions
1. Fork the repo.
2. Create a feature branch.
3. Ensure your code follows the **Atomic Design** principles used in this project.
4. Submit a Pull Request with a detailed summary of your changes.

### 🎨 Adding New Themes
To add a theme:
1. Open \`constants.tsx\`.
2. Add a new object to the \`THEMES\` array.
3. Define your colors using the \`Theme\` interface.

Happy Coding!`
  }
];
