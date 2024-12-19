'use client';
import { type AddEditModalProps } from '@/features/types';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/components/addEditModal.module.scss';
import Form from '@/components/Form';
import { ProjectContext } from '@/store/project-context';

export default function AddEditModal({ project }: AddEditModalProps) {
  const projectCtx = useContext(ProjectContext);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  // ↓DOMが完全に構築された後にターゲット要素を取得するようにする
  useEffect(() => {
    // クライアントサイドでDOM要素を取得
    setModalRoot(document.getElementById('add-edit-modal'));
  }, []);

  if (!modalRoot) {
    return null; // ターゲットがない場合は何も描画しない
  }

  return createPortal(
    <>
      <div className={styles.addEditModal}>
        <h3 className={styles['addEditModal__ttl']}>
          {project?.title ? '案件編集' : '新規追加'}
        </h3>
        <Form project={project} flag={project ? 'edit' : 'new'} />
      </div>
      <div
        className={styles['addEditModal__backdrop']}
        onClick={projectCtx.closeModal}
      ></div>
    </>,
    modalRoot
  );
}

// Memo: Next.jsのApp Routerでは、デフォルトでコンポーネントがサーバーサイドでレンダリングされます。documentはクライアントサイドのDOM APIなので、サーバーサイドでアクセスするとエラーになる。
