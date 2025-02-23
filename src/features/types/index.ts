import { ReactNode } from 'react';

export interface ProjectItem {
  id: string;
  title: string;
  detail: string;
  date: string;
  client: string;
  status: 'PROJECTS' | 'PROCESSING' | 'CHECKING' | 'DONE';
}

export type ProjectStatus = 'PROJECTS' | 'PROCESSING' | 'CHECKING' | 'DONE';

export interface AddEditModalProps {
  project: {
    id: string;
    title: string;
    detail: string;
    client: string;
    date: string;
  } | null;
}

export interface BoardProps {
  board: {
    id: string;
    name: string;
  };
}

export interface ProjectCardProps {
  // projects: ProjectItem[];
  key: string;
  id: string;
  title: string;
  client: string;
  date: string;
}

export type Flag = 'new' | 'edit' | 'cancel' | 'delete';

export interface Boards {
  id: string;
  name: string;
}

export interface ProjectItemData {
  projects: ProjectItem[];
}

// バリデーションの型
export type FormValue = string | null;

// useActionState()の型
export interface ActionStateType {
  enteredValues?: { [key: string]: string };
  errors: string[] | null;
}

// Context関連の型
export interface ProjectFixed {
  boards: Boards[];
  projects: ProjectItem[];
  status: ProjectStatus[];
  modal: boolean;
  alertModal: boolean;
  selectedProject: ProjectItem | null;
  flag: Flag;
  showModal: (project?: ProjectItem) => void;
  closeModal: () => void;
  showAlertModal: () => void;
  closeAlertModal: () => void;
  confirmDelete: () => void;
  createProject: (
    prevFormState: ActionStateType,
    formData: FormData
  ) => Promise<ActionStateType>;
}

export interface ProjectContextProviderProps {
  children: ReactNode;
}

// Dispatch関数に関する型指定
export interface AddedProjectItem {
  title: string;
  detail: string;
  date: string;
  client: string;
  status: 'PROJECTS' | 'PROCESSING' | 'CHECKING' | 'DONE';
}

export type AddAction = {
  type: 'ADD';
  payload: {
    enteredValues: AddedProjectItem;
  };
};
export type EditlAction = {
  type: 'EDIT';
  payload: {
    selectedProject: ProjectItem;
    projects: ProjectItem[];
    enteredValues: AddedProjectItem;
  };
};
export type CancelAction = {
  type: 'CANCEL';
  payload: {
    enteredValues: AddedProjectItem;
    closeModal: () => void;
  };
};
export type DeleteProjectAction = {
  type: 'DELETE';
  payload: {
    selectedProject: ProjectItem;
    projects: ProjectItem[];
    enteredValues: AddedProjectItem;
    closeModal: () => void;
    showAlertModal: () => void;
  };
};

export type confirmDelete = {
  type: 'CONFIRM-DELETE';
  payload: {
    projects?: ProjectItem[];
    selectedProject?: ProjectItem;
    closeModal: () => void;
    closeAlertModal: () => void;
  };
};

export type Action =
  | AddAction
  | EditlAction
  | CancelAction
  | DeleteProjectAction
  | confirmDelete;
