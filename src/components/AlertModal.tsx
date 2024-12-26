'use client';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/components/alertModal.module.scss';
import { ProjectContext } from '@/store/project-context';
export default function AlertModal() {
  const projectCtx = useContext(ProjectContext);

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  // ↓DOMが完全に構築された後にターゲット要素を取得するようにする
  useEffect(() => {
    // クライアントサイドでDOM要素を取得
    setModalRoot(document.getElementById('alert-modal'));
  }, []);

  if (!modalRoot) {
    return null; // ターゲットがない場合は何も描画しない
  }

  return createPortal(
    <>
      <div className={styles.alertModal}>
        <h3 className={styles['alertModal__ttl']}>本当に削除しますか？</h3>
        <div className={styles['alertModal__buttons']}>
          <button onClick={projectCtx.confirmDelete}>はい</button>
          <button onClick={projectCtx.closeAlertModal}>いいえ</button>
        </div>
      </div>
      <div className={styles['alertModal__backdrop']}></div>
    </>,
    modalRoot
  );
}

// Memo: Next.jsのApp Routerでは、デフォルトでコンポーネントがサーバーサイドでレンダリングされます。documentはクライアントサイドのDOM APIなので、サーバーサイドでアクセスするとエラーになる。
