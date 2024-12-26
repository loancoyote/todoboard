import styles from '@/components/button.module.scss';
import { useContext } from 'react';
import { ProjectContext } from '@/store/project-context';

export default function AddEditButton() {
  const projectCtx = useContext(ProjectContext);
  return (
    <div
      className={styles.circle}
      onClick={() => {
        projectCtx.showModal();
      }}
    >
      <div className={styles['circle__bar']}>
        <span className={styles['circle__bar--v']}></span>
        <span className={styles['circle__bar--h']}></span>
      </div>
    </div>
  );
}
