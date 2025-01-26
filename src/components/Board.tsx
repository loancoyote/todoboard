import { useDroppable } from '@dnd-kit/core';

import { type BoardProps } from '@/features/types';

import styles from '@/components/cards.module.scss';
import ProjectCard from './ProjectCard';
import { useContext } from 'react';
import { ProjectContext } from '@/store/project-context';
import clsx from 'clsx';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

export default function Board({ board, projects }: BoardProps) {
  const { setNodeRef, isOver } = useDroppable({ id: board.name });
  const projectCtx = useContext(ProjectContext);
  const filteredProject = projects.filter(
    (project) => project.status === board.name
  );

  // console.log(over?.id);

  return (
    <SortableContext
      id={board.name}
      items={projects}
      strategy={rectSortingStrategy}
    >
      <div ref={setNodeRef} className={styles['l-card__list']}>
        <h2 className={styles['l-card__list--ttl']}>{board.name}</h2>
        <div
          className={
            isOver
              ? clsx(styles['l-card'], styles['l-card__on'])
              : styles['l-card']
          }
        >
          {filteredProject && (
            <div>
              {filteredProject.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  client={project.client}
                  date={project.date}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </SortableContext>
  );
}
