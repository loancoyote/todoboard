'use client';
import styles from '@/components/form.module.scss';
import { ProjectContext } from '@/store/project-context';
import clsx from 'clsx';
import { useActionState, useContext } from 'react';

export default function Form() {
  const projectCtx = useContext(ProjectContext);

  const [formState, formAction] = useActionState(projectCtx.createProject, {
    enteredValues: {
      title: projectCtx.selectedProject?.title || '',
      detail: projectCtx.selectedProject?.detail || '',
      date: projectCtx.selectedProject?.date || '',
      client: projectCtx.selectedProject?.client || '',
      status: projectCtx.selectedProject?.status || '',
    },
    errors: null,
  });

  return (
    <>
      <form className={styles['form']} action={formAction}>
        <div className={styles['form__item']}>
          <label htmlFor="title">案件名（必須）</label>
          <input
            id="title"
            type="text"
            defaultValue={formState.enteredValues?.title}
            name="title"
          />
        </div>
        <div className={styles['form__item']}>
          <label htmlFor="detail">詳細</label>
          <textarea
            id="detail"
            name="detail"
            defaultValue={formState.enteredValues?.detail}
          ></textarea>
        </div>
        <div className={styles['form__item']}>
          <label htmlFor="date">期日（必須）</label>
          <input
            id="date"
            type="text"
            defaultValue={formState.enteredValues?.date}
            name="date"
          />
        </div>
        <div className={styles['form__item']}>
          <label htmlFor="client">依頼元</label>
          <input
            id="client"
            type="text"
            defaultValue={formState.enteredValues?.client}
            name="client"
          />
        </div>
        <div className={styles['form__item']}>
          <label htmlFor="status">ステータス</label>
          <select
            id="status"
            defaultValue={formState.enteredValues?.status || ''}
            name="status"
          >
            <option value="" disabled>
              ステータスを選択してください
            </option>
            {projectCtx.boards.map((board) => (
              <option key={board.id} value={board.name}>
                {board.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className={
            projectCtx.selectedProject
              ? clsx(styles['form__buttons'], styles['edit'])
              : clsx(styles['form__buttons'], styles['add'])
          }
        >
          <button
            type="submit"
            name="action"
            value="save"
            className={clsx(
              styles['form__button'],
              styles['form__button--save']
            )}
          >
            保存
          </button>
          {projectCtx.selectedProject ? (
            <button
              type="submit"
              name="action"
              value="delete"
              className={clsx(
                styles['form__button'],
                styles['form__button--delete']
              )}
            >
              削除
            </button>
          ) : (
            ''
          )}

          <button
            type="submit"
            name="action"
            value="cancel"
            className={clsx(
              styles['form__button'],
              styles['form__button--cancel']
            )}
          >
            戻る
          </button>
        </div>
      </form>
      {formState.errors && (
        <ul>
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </>
  );
}
