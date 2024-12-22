import { type BoardProps } from '@/features/types';

import styles from '@/components/cards.module.scss';
import ProjectCard from './ProjectCard';
import { useContext } from 'react';
import { ProjectContext } from '@/store/project-context';

export default function Board({ board }: BoardProps) {
  const projectCtx = useContext(ProjectContext);
  const filteredProject = [...projectCtx.projects].filter(
    (project) => project.status === board.name
  );

  return (
    <div className={styles['l-card__list']}>
      <h2 className={styles['l-card__list--ttl']}>{board.name}</h2>
      <div className={styles['l-card']}>
        {filteredProject && (
          <ul>
            <ProjectCard projects={filteredProject} />
          </ul>
        )}
      </div>
    </div>
  );
}
