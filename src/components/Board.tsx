import { type BoardProps } from '@/features/types';

import styles from '@/components/cards.module.scss';
import ProjectCard from './ProjectCard';

export default function Board({ board, onModalHandler }: BoardProps) {
  return (
    <div className={styles['l-card__list']}>
      <h2 className={styles['l-card__list--ttl']}>{board.name}</h2>
      <div className={styles['l-card']}>
        {board.items && (
          <ul>
            <ProjectCard
              projects={board.items}
              onClick={(id, title, detail, client, date) =>
                onModalHandler({ id, title, detail, client, date })
              }
            />
          </ul>
        )}
      </div>
    </div>
  );
}
