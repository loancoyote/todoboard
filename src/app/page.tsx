'use client';

import styles from '@/app/home.module.scss';
import { boardsData, projectData } from '@/backend/data';
import AddEditButton from '@/components/AddEditButton';
import AddEditModal from '@/components/AddEditModal';
import Board from '@/components/Board';
import { useState } from 'react';
import {
  ProjectContext,
  // ProjectFixed,
  ProjectItem,
  ProjectItemTest,
} from '@/store/project-context';

export default function Home() {
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
    showModal,
    closeModal,
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      <div className={styles['home__container']}>
        {boardsData.map((board) => (
          <Board key={board.id} board={board} />
        ))}

        <AddEditButton modal={modal} />
        {modal && <AddEditModal project={selectedProject} />}
      </div>
    </ProjectContext.Provider>
  );
}
