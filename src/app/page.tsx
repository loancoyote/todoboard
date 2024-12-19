'use client';

import styles from '@/app/home.module.scss';
import { boardsData } from '@/backend/data';
import AddEditButton from '@/components/AddEditButton';
import AddEditModal from '@/components/AddEditModal';
import Board from '@/components/Board';
import { useContext } from 'react';
import { ProjectContext } from '@/store/project-context';

export default function Home() {
  const projectCtx = useContext(ProjectContext);

  return (
    <div className={styles['home__container']}>
      {boardsData.map((board) => (
        <Board key={board.id} board={board} />
      ))}

      <AddEditButton modal={projectCtx.modal} />
      {projectCtx.modal && (
        <AddEditModal project={projectCtx.selectedProject} />
      )}
    </div>
  );
}
