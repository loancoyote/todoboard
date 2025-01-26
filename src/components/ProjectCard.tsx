import { useDraggable } from '@dnd-kit/core';
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
  const projectCtx = useContext(ProjectContext);

  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: id,
  // });
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      transition: {
        duration: 350,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    });
  // console.log(attributes);

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        transition,
      }
    : undefined;
  return (
    <div
      // id={id}
      style={style}
      ref={setNodeRef}
      {...attributes} //ドラッグ機能に必要な、属性を全て渡している
      {...listeners} //デバイスによって異なるリスナーを使っているので複数のリスナーが格納されている
      className={styles['s-card']}
      onClick={() => projectCtx.showModal()}
    >
      <h3 className={styles['s-card__ttl']}>{title}</h3>
      <p className={styles['s-card__client']}>{client}</p>
      <time className={styles['s-card__date']} dateTime={date}>
        {date}
      </time>
    </div>
  );
}
