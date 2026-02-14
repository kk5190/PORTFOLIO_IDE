
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
