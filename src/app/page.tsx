'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
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
import { useContext, useState } from 'react';
import { ProjectContext } from '@/store/project-context';
import AlertModal from '@/components/AlertModal';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ProjectItem, ProjectStatus } from '@/features/types';

export default function Home() {
  const projectCtx = useContext(ProjectContext);

  // ●案件の配列を管理する。
  const [projectList, setProjectList] = useState<ProjectItem[]>(
    projectCtx.projects
  );

  // const [status, setStatus] = useState<ProjectItem[]>(projectData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findStatusColumn = (id: string) => {
    // DragOverで取得したidがステータスカラムのnameとプロジェクトカードのidが返ってくることを想定する。

    // ステータスカラムのnameが返ってきた場合はそのまま返す
    const statusIdName = ['PROJECTS', 'PROCESSING', 'CHECKING', 'DONE'];
    if (statusIdName.includes(id)) {
      return id;
    }

    // プロジェクトカードのidが返ってきた場合、そのカードのstatusを返したい
    return projectList.find((prj) => prj.id === id)?.status;
  };

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    console.log('handleDragOver', active.id, over?.id);

    // ドラッグ中に位置が変わっていない場合
    if (!over || active.id === over.id) {
      return null;
    }
    const overId = String(over.id);
    const overStatusColumn = findStatusColumn(overId);

    // 選択中のカードが他のカードを超える時
    if (active.id !== over.id) {
      setProjectList((prevList) => {
        console.log(over.id);

        const oldIndex = prevList.findIndex((i) => i.id === active.id);
        const newIndex = prevList.findIndex((i) => i.id === over.id);
        console.log(oldIndex, newIndex);
        // 元の配列の順番を並び替えている
        const newProjectsList = arrayMove(prevList, oldIndex, newIndex);

        // 新しいステータスを付与している
        const newProjectsListWithNewStatus = newProjectsList.map((project) => {
          return project.id === String(active.id)
            ? {
                ...project,
                status: overStatusColumn as ProjectStatus,
              }
            : project;
        });
        console.log(newProjectsListWithNewStatus);

        return newProjectsListWithNewStatus;
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(`activeは${active.id}`);
    console.log(`overは${over?.id}`);
    if (!over || active.id === over.id) {
      return null;
    }

    const overId = String(over.id);
    const overStatusColumn = findStatusColumn(overId);
    console.log(overStatusColumn);

    if (active.id !== over.id) {
      setProjectList((prevList) => {
        const oldIndex = prevList.findIndex((i) => i.id === active.id);
        const newIndex = prevList.findIndex((i) => i.id === over.id);

        console.log(oldIndex, newIndex);
        // 元の配列の順番を並び替えている
        const newProjectsList = arrayMove(prevList, oldIndex, newIndex);

        // 新しいステータスを付与している
        const newProjectsListWithNewStatus = newProjectsList.map((project) => {
          return project.id === String(active.id)
            ? {
                ...project,
                status: overStatusColumn as ProjectStatus,
              }
            : project;
        });

        console.log(newProjectsListWithNewStatus);

        return newProjectsListWithNewStatus;
      });
    }

    // ★ドロップ先の名前をプロジェクトのステータスにする
    // ①ドロップ先の名前を取得する
    // プロジェクトのステータスを①の値に変更する
  }

  return (
    <div className={styles['home__container']}>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={closestCenter}
      >
        {boardsData.map((board) => (
          <Board key={board.id} board={board} projects={projectList} />
        ))}
      </DndContext>

      {projectCtx.modal && (
        <AddEditModal project={projectCtx.selectedProject} />
      )}
      {projectCtx.alertModal && <AlertModal />}
      <AddEditButton />
    </div>
  );
}
