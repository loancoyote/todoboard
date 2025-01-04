// import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { type ProjectCardProps } from '@/features/types';
import styles from '@/components/cards.module.scss';
import { useContext } from 'react';
import { ProjectContext } from '@/store/project-context';
import { useSortable } from '@dnd-kit/sortable';

export default function ProjectCard({
  id,
  title,
  client,
  date,
}: ProjectCardProps) {
  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: Math.random(),
  // });
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  });

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Transform.toString(transform),
  };
  const projectCtx = useContext(ProjectContext);
  return (
    <li
      id={id}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={styles['s-card']}
      onClick={() => projectCtx.showModal()}
    >
      <h3 className={styles['s-card__ttl']}>{title}</h3>
      <p className={styles['s-card__client']}>{client}</p>
      <time className={styles['s-card__date']} dateTime={date}>
        {date}
      </time>
    </li>
  );
}
