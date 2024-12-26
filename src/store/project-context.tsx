import { boardsData, projectData, statusData } from '@/backend/data';
import {
  Action,
  ActionStateType,
  Flag,
  ProjectContextProviderProps,
  ProjectFixed,
  ProjectItem,
  ProjectItemData,
} from '@/features/types';
import { isNotEmpty } from '@/lib/validation';
import { createContext, useState, useReducer } from 'react';

export const ProjectContext = createContext<ProjectFixed>({
  boards: [],
  projects: [],
  status: [],
  modal: false,
  alertModal: false,
  selectedProject: null,
  flag: 'new',
  showModal: () => {},
  showAlertModal: () => {},
  closeAlertModal: () => {},
  closeModal: () => {},
  confirmDelete: () => {},
  createProject: async () => ({
    enteredValues: {},
    errors: null,
  }),
});

function projectReducer(
  state: ProjectItemData,
  action: Action
): ProjectItemData {
  console.log('Dispatch');
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
        status: action.payload.enteredValues.status,
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
        status: action.payload.enteredValues.status,
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
    // 削除はshowAlertModal()内で行うのでとりあえず元の案件を返す。
    action.payload.showAlertModal();
    return { projects: existingProjects };
  }

  if (action.type === 'CONFIRM-DELETE') {
    const existingProjects = [...state.projects];
    const targetProjectId = action.payload.selectedProject!.id;

    const filteredProject = existingProjects.filter(
      (project) => project?.id !== targetProjectId
    );

    action.payload.closeModal();
    action.payload.closeAlertModal();

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
  const [alertModal, setAlertModal] = useState(false);
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

  function showAlertModal() {
    setAlertModal(true);
  }
  function closeAlertModal() {
    setAlertModal(false);
  }

  function confirmDelete() {
    projectDispatch({
      type: 'CONFIRM-DELETE',
      payload: {
        projects: projectState.projects,
        selectedProject: selectedProject!,
        closeModal: closeModal,
        closeAlertModal,
      },
    });
  }

  async function createProject(
    prevFormState: ActionStateType,
    formData: FormData
  ): Promise<ActionStateType> {
    const mode = formData.get('action');

    const title = formData.get('title') as string;
    const detail = formData.get('detail') as string;
    const date = formData.get('date') as string;
    const client = formData.get('client') as string;
    const status = formData.get('status') as
      | 'PROJECTS'
      | 'PROCESSING'
      | 'CHECKING'
      | 'DONE';

    // 保存ボタンを押下
    if (mode === 'save') {
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
            status,
          },
          errors: errors,
        };
      }

      // 新しい案件の追加
      if (flag == 'new') {
        projectDispatch({
          type: 'ADD',
          payload: {
            enteredValues: { title, detail, date, client, status },
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
            enteredValues: { title, detail, date, client, status },
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
    if (mode === 'cancel') {
      projectDispatch({
        type: 'CANCEL',
        payload: {
          enteredValues: { title, detail, date, client, status },
          closeModal: closeModal,
        },
      });
    }

    // 削除ボタンを押下
    if (mode === 'delete') {
      projectDispatch({
        type: 'DELETE',
        payload: {
          projects: projectState.projects,
          selectedProject: selectedProject!,
          enteredValues: { title, detail, date, client, status },
          closeModal: closeModal,
          showAlertModal: showAlertModal,
        },
      });
    }

    return prevFormState;
  }

  const ctxValue = {
    boards: boardsData,
    projects: projectState.projects,
    status: statusData,
    modal,
    alertModal,
    selectedProject,
    flag,
    showModal,
    showAlertModal,
    closeAlertModal,
    closeModal,
    confirmDelete,
    createProject,
  };
  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
}
