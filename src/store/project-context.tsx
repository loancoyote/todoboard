import { createContext } from 'react';

export interface Boards {
  id: string;
  name: string;
}
export interface ProjectItem {
  id: string;
  title: string;
  detail: string;
  date: string;
  client: string;
  status: 'PROJECTS' | 'PROCESSING' | 'CHECKING' | 'DONE';
}

export interface ProjectItemTest {
  projects: ProjectItem[];
}

export interface ProjectFixed {
  boards: Boards[];
  projects: ProjectItem[];
  showModal: (project?: ProjectItem) => void;
  closeModal: () => void;
}

export const ProjectContext = createContext<ProjectFixed>({
  boards: [],
  projects: [],
  showModal: () => {},
  closeModal: () => {},
});
