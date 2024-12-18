import { type AddEditButtonProps } from '@/features/types';
import styles from '@/components/button.module.scss';
import clsx from 'clsx';

export default function AddEditButton({
  modal,
  onModalHandler,
}: AddEditButtonProps) {
  return (
    <div
      className={
        modal ? clsx(styles['circle__close'], styles.circle) : styles.circle
      }
      onClick={() => {
        onModalHandler();
      }}
    >
      <div className={styles['circle__bar']}>
        <span className={styles['circle__bar--v']}></span>
        <span className={styles['circle__bar--h']}></span>
      </div>
    </div>
  );
}
