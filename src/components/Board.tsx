import styles from '@/components/cards.module.scss';
import ProjectCard from './ProjectCard';

interface BoardProps {
  board: {
    id: string;
    name: string;
    items?: {
      id: string;
      title: string;
      client: string;
      date: string;
    }[];
  };
  onModalHandler: () => void; //途中経由させている関数の型指定は引数は指定不要
}

export default function Board({ board, onModalHandler }: BoardProps) {
  return (
    <div className={styles['l-card__list']}>
      <h2 className={styles['l-card__list--ttl']}>{board.name}</h2>
      <div className={styles['l-card']}>
        {board.items && (
          <ul>
            <ProjectCard projects={board.items} onClick={onModalHandler} />
          </ul>
        )}
      </div>
    </div>
  );
}
