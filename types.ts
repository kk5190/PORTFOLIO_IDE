
export type FileType = 'markdown' | 'json' | 'yaml' | 'settings';

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  icon: string;
  iconColor: string;
  content: string;
  path: string;
}

export interface IDEState {
  openFileIds: string[];
  activeFileId: string | null;
  isSidebarOpen: boolean;
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
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}
