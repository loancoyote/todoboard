'use client';

import { type Project } from '@/features/types';
import styles from '@/app/home.module.scss';
import { boards } from '@/backend/data';
import AddEditButton from '@/components/AddEditButton';
import AddEditModal from '@/components/AddEditModal';
import Board from '@/components/Board';
import { useState } from 'react';

export default function Home() {
  const [modal, setModal] = useState(false);
  // 各案件カードの状態を管理（各カードをクリックした時に必要）
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  function showModal(project?: Project) {
    if (project) {
      const { id, title, detail, client, date } = project;
      setSelectedProject({ id, title, detail, client, date });
    } else {
      setSelectedProject(null); // 引数がない場合はリセット
    }
    setModal(true);
  }

  function closeModal() {
    setSelectedProject(null); // モーダルを閉じるときに選択値をリセット
    setModal(false);
  }

  return (
    <div className={styles['home__container']}>
      {boards.map((board) => (
        <Board key={board.id} board={board} onModalHandler={showModal} />
      ))}
      <AddEditButton
        onModalHandler={modal ? closeModal : showModal}
        modal={modal}
      />
      {modal && (
        <AddEditModal onModalHandler={closeModal} project={selectedProject} />
      )}
    </div>
  );
}
