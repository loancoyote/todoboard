import { type ProjectCardProps } from '@/features/types';
import styles from '@/components/cards.module.scss';

export default function ProjectCard({ projects, onClick }: ProjectCardProps) {
  return (
    <>
      {projects.map((project) => (
        <li
          key={project.id}
          className={styles['s-card']}
          onClick={() =>
            onClick(
              project.id,
              project.title,
              project.detail,
              project.client,
              project.date
            )
          }
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
