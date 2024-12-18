export interface Project {
  id?: string;
  title?: string;
  detail?: string;
  client?: string;
  date?: string;
}

export interface AddEditButtonProps {
  modal: boolean;
  onModalHandler: () => void;
}

export interface AddEditModalProps {
  onModalHandler: () => void;
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
  onSubmit: () => void;
}

export interface BoardProps {
  board: {
    id: string;
    name: string;
    items?: {
      id: string;
      title: string;
      detail: string;
      client: string;
      date: string;
    }[];
  };
  onModalHandler: ({ id, title, detail, client, date }: Project) => void;
}

export interface ProjectCardProps {
  projects: {
    id: string;
    title: string;
    detail: string;
    client: string;
    date: string;
  }[];
  onClick: (
    id: string,
    title: string,
    detail: string,
    client: string,
    date: string
  ) => void;
}
