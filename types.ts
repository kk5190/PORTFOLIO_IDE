
export type FileType = 'markdown' | 'json' | 'yaml' | 'settings' | 'javascript';

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  icon: string;
  iconColor: string;
  content: string;
  path: string;
}

export interface ThemeColors {
  background: string;
  sidebar: string;
  activityBar: string;
  primary: string;
  editorBg: string;
  text: string;
  comment: string;
  string: string;
  keyword: string;
  variable: string;
  type: string;
  border: string;
}

export interface Theme {
  id: string;
  name: string;
  isLight?: boolean;
  colors: ThemeColors;
}

export type ActivityTab = 'explorer' | 'search' | 'git' | 'terminal' | 'settings';
