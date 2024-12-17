'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
import styles from '@/components/addEditModal.module.scss';

interface AddEditModalProps {
  onModalHandler: () => void;
  project: {
    id?: string;
    title?: string;
    client?: string;
    date?: string;
  } | null;
}

export default function AddEditModal({
  onModalHandler,
  project,
}: AddEditModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  // ↓DOMが完全に構築された後にターゲット要素を取得するようにする
  useEffect(() => {
    // クライアントサイドでDOM要素を取得
    setModalRoot(document.getElementById('add-edit-modal'));
  }, []);

  if (!modalRoot) {
    return null; // ターゲットがない場合は何も描画しない
  }

  useFormState;

  return createPortal(
    <>
      <div className={styles.addEditModal}>
        <h3 className={styles['addEditModal__ttl']}>
          {project?.title ? '案件編集' : '新規追加'}
        </h3>
        <form className={styles['addEditModal__form']} action={formAction}>
          <div className={styles['addEditModal__form--item']}>
            <label htmlFor="title">案件名（必須）</label>
            <input
              id="title"
              type="text"
              defaultValue={project?.title}
              name="title"
            />
          </div>
          <div className={styles['addEditModal__form--item']}>
            <label htmlFor="detail">詳細</label>
            <textarea id="detail" name="detail" />
          </div>
          <div className={styles['addEditModal__form--item']}>
            <label htmlFor="date">期日（必須）</label>
            <input
              id="date"
              type="text"
              defaultValue={project?.date}
              name="date"
            />
          </div>
          <div className={styles['addEditModal__form--item']}>
            <label htmlFor="client">依頼元</label>
            <input
              id="client"
              type="text"
              defaultValue={project?.client}
              name="client"
            />
          </div>
          <div className={styles['addEditModal__form--buttons']}>
            <button
              className={clsx(
                styles['addEditModal__form--button'],
                styles['addEditModal__form--button--save']
              )}
            >
              保存
            </button>
            <button
              className={clsx(
                styles['addEditModal__form--button'],
                styles['addEditModal__form--button--notsave']
              )}
            >
              {project?.title ? '削除' : '戻る'}
            </button>
          </div>
        </form>
      </div>
      <div
        className={styles['addEditModal__backdrop']}
        onClick={onModalHandler}
      ></div>
    </>,
    modalRoot
  );
}

// Memo: Next.jsのApp Routerでは、デフォルトでコンポーネントがサーバーサイドでレンダリングされます。documentはクライアントサイドのDOM APIなので、サーバーサイドでアクセスするとエラーになる。
