import { type AddEditButtonProps } from '@/features/types';
import styles from '@/components/button.module.scss';
import clsx from 'clsx';
import { useContext } from 'react';
import { ProjectContext } from '@/store/project-context';

export default function AddEditButton({ modal }: AddEditButtonProps) {
  const projectCtx = useContext(ProjectContext);
  return (
    <div
      className={
        modal ? clsx(styles['circle__close'], styles.circle) : styles.circle
      }
      onClick={() => {
        if (modal) {
          projectCtx.closeModal();
        } else {
          projectCtx.showModal();
        }
      }}
    >
      <div className={styles['circle__bar']}>
        <span className={styles['circle__bar--v']}></span>
        <span className={styles['circle__bar--h']}></span>
      </div>
    </div>
  );
}
