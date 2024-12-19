export interface Project {
  id?: string;
  title?: string;
  detail?: string;
  client?: string;
  date?: string;
}

export interface AddEditButtonProps {
  modal: boolean;
}

export interface AddEditModalProps {
  project: {
    id?: string;
    title?: string;
    detail?: string;
    client?: string;
    date?: string;
  } | null;
}
export interface FormProps {
  project: {
    id?: string;
    title?: string;
    detail?: string;
    client?: string;
    date?: string;
  } | null;
  flag: 'new' | 'edit';
}

export interface BoardProps {
  board: {
    id: string;
    name: string;
  };
}

export interface ProjectCardProps {
  projects: {
    id: string;
    title: string;
    detail: string;
    client: string;
    date: string;
    status: 'PROJECTS' | 'PROCESSING' | 'CHECKING' | 'DONE';
  }[];
}

export interface ProjectsData {
  id: string;
  title: string;
  detail: string;
  client: string;
  date: string;
  status: string;
}
