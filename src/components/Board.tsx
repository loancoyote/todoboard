import { useDroppable } from '@dnd-kit/core';

import { type BoardProps } from '@/features/types';

import styles from '@/components/cards.module.scss';
import ProjectCard from './ProjectCard';
import { useContext } from 'react';
import { ProjectContext } from '@/store/project-context';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

export default function Board({ board }: BoardProps) {
  const { setNodeRef, isOver } = useDroppable({ id: board.id });
  const projectCtx = useContext(ProjectContext);
  const filteredProject = projectCtx.projects.filter(
    (project) => project.status === board.name
  );

  return (
    <SortableContext
      id={board.id}
      items={filteredProject}
      strategy={rectSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className={
          isOver ? styles['l-card__list test'] : styles['l-card__list']
        }
      >
        <h2 className={styles['l-card__list--ttl']}>{board.name}</h2>
        <div className={styles['l-card']}>
          {filteredProject && (
            <ul>
              {filteredProject.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  client={project.client}
                  date={project.date}
                />
              ))}
              {/* <ProjectCard projects={filteredProject} /> */}
            </ul>
          )}
        </div>
      </div>
    </SortableContext>
  );
}
