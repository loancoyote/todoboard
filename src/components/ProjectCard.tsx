import { type ProjectCardProps } from '@/features/types';
import styles from '@/components/cards.module.scss';
import { useContext } from 'react';
import { ProjectContext } from '@/store/project-context';

export default function ProjectCard({ projects }: ProjectCardProps) {
  const projectCtx = useContext(ProjectContext);
  return (
    <>
      {projects.map((project) => (
        <li
          key={project.id}
          className={styles['s-card']}
          onClick={() => projectCtx.showModal(project)}
        >
          <h3 className={styles['s-card__ttl']}>{project.title}</h3>
          <p className={styles['s-card__client']}>{project.client}</p>
          <time className={styles['s-card__date']} dateTime={project.date}>
            {project.date}
          </time>
        </li>
      ))}
    </>
  );
}
