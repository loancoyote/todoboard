'use client';

import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import styles from '@/app/home.module.scss';
import { boardsData } from '../backend/data';
import AddEditButton from '@/components/AddEditButton';
import AddEditModal from '@/components/AddEditModal';
import Board from '@/components/Board';
import { useContext } from 'react';
import { ProjectContext } from '@/store/project-context';
import AlertModal from '@/components/AlertModal';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export default function Home() {
  const projectCtx = useContext(ProjectContext);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd() {
    console.log('handleDragEnd');
  }
  function handleDragOver() {
    console.log('handleDragOver');
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className={styles['home__container']}>
        {boardsData.map((board) => (
          <Board key={board.id} board={board} />
        ))}

        {projectCtx.modal && (
          <AddEditModal project={projectCtx.selectedProject} />
        )}
        {projectCtx.alertModal && <AlertModal />}
        <AddEditButton />
      </div>
    </DndContext>
  );
}
