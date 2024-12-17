export interface Project {
  id?: string;
  title?: string;
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
    client?: string;
    date?: string;
  } | null;
}

export interface BoardProps {
  board: {
    id: string;
    name: string;
    items?: {
      id: string;
      title: string;
      client: string;
      date: string;
    }[];
  };
  onModalHandler: () => void; //途中経由させている関数の型指定は引数は指定不要
}

export interface ProjectCardProps {
  projects: {
    id: string;
    title: string;
    client: string;
    date: string;
  }[];
  onClick: (id: string, title: string, client: string, date: string) => void;
}
