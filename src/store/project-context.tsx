import { boardsData, projectData } from '@/backend/data';
import { ActionStateType } from '@/components/Form';
import { Flag } from '@/features/types';
import { isNotEmpty } from '@/lib/validation';
import { createContext, ReactNode, useState, useReducer } from 'react';

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
export interface AddedProjectItem {
  title: string;
  detail: string;
  date: string;
  client: string;
}

export interface ProjectItemTest {
  projects: ProjectItem[];
}

export interface ProjectFixed {
  boards: Boards[];
  projects: ProjectItem[];
  modal: boolean;
  selectedProject: ProjectItem | null;
  flag: Flag;
  showModal: (project?: ProjectItem) => void;
  closeModal: () => void;
  createProject: (
    prevFormState: ActionStateType,
    formData: FormData
  ) => Promise<ActionStateType>;
}

export const ProjectContext = createContext<ProjectFixed>({
  boards: [],
  projects: [],
  modal: false,
  selectedProject: null,
  flag: 'new',
  showModal: () => {},
  closeModal: () => {},
  createProject: async () => ({
    enteredValues: {},
    errors: null,
  }),
});

interface ProjectContextProviderProps {
  children: ReactNode;
}

type AddAction = {
  type: 'ADD';
  payload: {
    enteredValues: AddedProjectItem;
  };
};
type EditlAction = {
  type: 'EDIT';
  payload: {
    selectedProject: ProjectItem;
    projects: ProjectItem[];
    enteredValues: AddedProjectItem;
  };
};
type CancelAction = {
  type: 'CANCEL';
  payload: {
    closeModal: () => void;
  };
};
type DeleteProjectAction = {
  type: 'DELETE';
  payload: {
    projects: ProjectItem[];
    selectedProject: ProjectItem | null;
    closeModal: () => void;
  };
};

type Action = AddAction | EditlAction | CancelAction | DeleteProjectAction;

function projectReducer(
  state: ProjectItemTest,
  action: Action
): ProjectItemTest {
  console.log('DIspatch');
  if (action.type === 'ADD') {
    const updatedProjects: ProjectItem[] = [
      ...state.projects,
      {
        // TODO: idをランダムにする
        id: action.payload.enteredValues.title,
        title: action.payload.enteredValues.title,
        detail: action.payload.enteredValues.detail,
        client: action.payload.enteredValues.client,
        date: action.payload.enteredValues.date,
        status: 'PROJECTS',
      },
    ];
    return {
      projects: updatedProjects,
    };
  }
  if (action.type === 'EDIT') {
    const existingProjects = [...state.projects];
    const existingProjectIndex = existingProjects.findIndex(
      (project) => project!.id === action.payload.selectedProject.id
    );

    const targetProject = existingProjects[existingProjectIndex];
    if (targetProject) {
      const updatedProject = {
        ...targetProject,
        title: action.payload.enteredValues.title,
        detail: action.payload.enteredValues.detail,
        client: action.payload.enteredValues.client,
        date: action.payload.enteredValues.date,
      };
      existingProjects[existingProjectIndex] = updatedProject;
    }

    return { projects: existingProjects };
  }
  if (action.type === 'CANCEL') {
    // 中止処理
    action.payload.closeModal();

    return {
      ...state,
    };
  }

  if (action.type === 'DELETE') {
    const existingProjects = [...state.projects];
    const targetProjectId = action.payload.selectedProject!.id;
    const filteredProject = existingProjects.filter(
      (project) => project?.id !== targetProjectId
    );

    action.payload.closeModal();

    return { projects: filteredProject };
  }
  return state;
}

export default function ProjectContextProvider({
  children,
}: ProjectContextProviderProps) {
  const [projectState, projectDispatch] = useReducer(projectReducer, {
    projects: projectData,
  });

  const [flag, setFlag] = useState<Flag>('new');
  const [modal, setModal] = useState(false);
  // 各案件カードの状態を管理（各カードをクリックした時に必要）
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  function showModal(project?: ProjectItem) {
    if (project) {
      const { id, title, detail, client, date, status } = project;
      setSelectedProject({ id, title, detail, client, date, status });
      setFlag('edit');
    } else {
      setSelectedProject(null); // 引数がない場合はリセット
      setFlag('new');
    }
    setModal(true);
  }

  function closeModal() {
    setSelectedProject(null); // モーダルを閉じるときに選択値をリセット
    setModal(false);
  }

  async function createProject(
    prevFormState: ActionStateType,
    formData: FormData
  ): Promise<ActionStateType> {
    const action = formData.get('action');

    // 保存ボタンを押下
    if (action === 'save') {
      const title = formData.get('title') as string;
      const detail = formData.get('detail') as string;
      const date = formData.get('date') as string;
      const client = formData.get('client') as string;

      const errors = [];

      // 必須項目の案件名と期日でバリデーション
      if (!isNotEmpty(title)) {
        errors.push('案件名は必須項目です');
      }
      if (!isNotEmpty(date)) {
        errors.push('期日は必須項目です');
      }

      // 保存ボタンを押した後、エラーがある場合は入力した情報は残す
      if (errors.length > 0) {
        return {
          enteredValues: {
            title,
            detail,
            date,
            client,
          },
          errors: errors,
        };
      }

      // 新しい案件の追加
      if (flag == 'new') {
        projectDispatch({
          type: 'ADD',
          payload: {
            enteredValues: { title, detail, date, client },
          },
        });
      }

      // 既存案件の編集
      if (flag == 'edit') {
        projectDispatch({
          type: 'EDIT',
          payload: {
            selectedProject: selectedProject!,
            projects: projectState.projects,
            enteredValues: { title, detail, date, client },
          },
        });
      }

      // 変更・追加が終わればモーダルを閉じる。
      closeModal();

      // 保存ボタンを押した後、エラーがない場合は入力した情報は消す。残す意味はないから。
      return {
        errors: null,
      };
    }

    // 戻るボタンを押下
    if (action === 'cancel') {
      projectDispatch({
        type: 'CANCEL',
        payload: {
          closeModal: closeModal,
        },
      });
    }

    // 削除ボタンを押下
    if (action === 'delete') {
      projectDispatch({
        type: 'DELETE',
        payload: {
          projects: projectState.projects,
          selectedProject: selectedProject,
          closeModal: closeModal,
        },
      });
    }

    return prevFormState;
  }

  const ctxValue = {
    boards: boardsData,
    projects: projectState.projects,
    modal,
    selectedProject,
    flag,
    showModal,
    closeModal,
    createProject,
  };
  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
}
