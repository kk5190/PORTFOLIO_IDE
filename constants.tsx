
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
  },
  {
    id: 'atom-one-light',
    name: 'Atom One Light',
    isLight: true,
    colors: {
      background: '#fafafa',
      sidebar: '#f0f0f0',
      activityBar: '#e5e5e5',
      primary: '#4078f2',
      editorBg: '#fafafa',
      text: '#383a42',
      comment: '#696c77',
      string: '#50a14f',
      keyword: '#a626a4',
      variable: '#e45649',
      type: '#c18401',
      border: 'rgba(0,0,0,0.08)'
    }
  },
  {
    id: 'nord-light',
    name: 'Nord Light',
    isLight: true,
    colors: {
      background: '#eceff4',
      sidebar: '#e5e9f0',
      activityBar: '#d8dee9',
      primary: '#88c0d0',
      editorBg: '#eceff4',
      text: '#2e3440',
      comment: '#4c566a',
      string: '#4f6b3e',
      keyword: '#5e81ac',
      variable: '#bf616a',
      type: '#b48ead',
      border: 'rgba(0,0,0,0.1)'
    }
  },
  {
    id: 'monokai-light',
    name: 'Monokai Light',
    isLight: true,
    colors: {
      background: '#fdfdfd',
      sidebar: '#f5f5f5',
      activityBar: '#eeeeee',
      primary: '#d31a5e',
      editorBg: '#ffffff',
      text: '#272822',
      comment: '#5f5a4b',
      string: '#1c730a',
      keyword: '#d31a5e',
      variable: '#1075a3',
      type: '#805000',
      border: 'rgba(0,0,0,0.06)'
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
      text: '#073642',
      comment: '#657b83',
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
      comment: '#707070',
      string: '#448c27',
      keyword: '#705697',
      variable: '#7a3e9d',
      type: '#aa3731',
      border: 'rgba(0,0,0,0.05)'
    }
  }
];

export const MOCK_GIT_HISTORY: GitCommit[] = [
  {
    id: 'c7',
    hash: 'a7b8c9d',
    message: 'feat: add interactive terminal simulation',
    author: 'John Doe',
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
    author: 'John Doe',
    date: '5 hours ago',
    branch: 'main',
    color: '#bd93f9',
    lane: 0,
    parents: ['c5', 'f2']
  },
  {
    id: 'f2',
    hash: 'i9j0k1l',
    message: 'refactor: implement atomic components for UI consistency',
    author: 'John Doe',
    date: '1 day ago',
    branch: 'feature/atomic-design',
    color: '#50fa7b',
    lane: 1,
    parents: ['f1']
  },
  {
    id: 'f1',
    hash: 'm2n3o4p',
    message: 'docs: update contribution guidelines',
    author: 'John Doe',
    date: '1 day ago',
    branch: 'feature/atomic-design',
    color: '#50fa7b',
    lane: 1,
    parents: ['c5']
  },
  {
    id: 'c5',
    hash: 'q5r6s7t',
    message: 'fix: resolve theme switching flicker on mobile',
    author: 'John Doe',
    date: '2 days ago',
    branch: 'main',
    color: '#bd93f9',
    lane: 0,
    parents: ['c4']
  },
  {
    id: 'c4',
    hash: 'u8v9w0x',
    message: 'chore: update dependency versions',
    author: 'John Doe',
    date: '3 days ago',
    branch: 'main',
    color: '#bd93f9',
    lane: 0,
    parents: ['c3']
  },
  {
    id: 'c3',
    hash: 'y1z2a3b',
    message: 'feat: add markdown preview toggle',
    author: 'John Doe',
    date: '4 days ago',
    branch: 'main',
    color: '#bd93f9',
    lane: 0,
    parents: ['c2']
  },
  {
    id: 'c2',
    hash: 'd4e5f6g',
    message: 'docs: initial project setup and readme',
    author: 'John Doe',
    date: '5 days ago',
    branch: 'main',
    color: '#bd93f9',
    lane: 0,
    parents: ['c1']
  },
  {
    id: 'c1',
    hash: 'h7i8j9k',
    message: 'initial commit',
    author: 'John Doe',
    date: '1 week ago',
    branch: 'main',
    color: '#bd93f9',
    lane: 0,
    parents: []
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
    icon: 'description',
    iconColor: 'text-blue-400',
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
