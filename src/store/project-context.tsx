import { boardsData, projectData } from '@/backend/data';
import { createContext, ReactNode, useState } from 'react';

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
  modal: boolean;
  selectedProject: ProjectItem | null;
  showModal: (project?: ProjectItem) => void;
  closeModal: () => void;
}

export const ProjectContext = createContext<ProjectFixed>({
  boards: [],
  projects: [],
  modal: false,
  selectedProject: null,
  showModal: () => {},
  closeModal: () => {},
});

interface ProjectContextProviderProps {
  children: ReactNode;
}

export default function ProjectContextProvider({
  children,
}: ProjectContextProviderProps) {
  const [projects, setProjects] = useState<ProjectItemTest>({
    projects: projectData,
  });
  const [modal, setModal] = useState(false);
  // 各案件カードの状態を管理（各カードをクリックした時に必要）
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  function showModal(project?: ProjectItem) {
    if (project) {
      const { id, title, detail, client, date, status } = project;
      setSelectedProject({ id, title, detail, client, date, status });
    } else {
      setSelectedProject(null); // 引数がない場合はリセット
    }
    setModal(true);
  }

  function closeModal() {
    setSelectedProject(null); // モーダルを閉じるときに選択値をリセット
    setModal(false);
  }

  const ctxValue = {
    boards: boardsData,
    projects: projects.projects,
    modal,
    selectedProject,
    showModal,
    closeModal,
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
}
