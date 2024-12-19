'use client';
import { boards } from '@/backend/data';
import styles from '@/components/form.module.scss';
import { type FormProps } from '@/features/types';
import { isNotEmpty } from '@/lib/validation';
import clsx from 'clsx';
import { useActionState } from 'react';

interface ActionStateType {
  enteredValues?: { [key: string]: string };
  errors: string[] | null;
}

export default function Form({ project, onSubmit, flag }: FormProps) {
  async function createProject(
    prevFormState: ActionStateType,
    formData: FormData
  ): Promise<ActionStateType> {
    const action = formData.get('action');

    // 保存ボタンを押下
    if (action === 'save') {
      const title = formData.get('title') as string;
      const detail = formData.get('detail') as string;
      const date = formData.get('date') as string;
      const client = formData.get('client') as string;

      const errors = [];

      // 必須項目の案件名と期日でバリデーション
      if (!isNotEmpty(title)) {
        errors.push('案件名は必須項目です');
      }
      if (!isNotEmpty(date)) {
        errors.push('期日は必須項目です');
      }

      // 保存ボタンを押した後、エラーがある場合は入力した情報は残す

      if (errors.length > 0) {
        return {
          enteredValues: {
            title,
            detail,
            date,
            client,
          },
          errors: errors,
        };
      }

      // 新しい案件の追加
      if (flag == 'new') {
        // 追加ボタンから案件を追加する場合は全て「Projects」ボード内に格納される
        const projectsBoard = boards.find((board) => board.name === 'Project');

        if (!projectsBoard) {
          throw new Error('Projects boardが見つかりません');
        }

        projectsBoard.items?.push({
          id: title,
          title: title,
          detail: detail,
          client: client,
          date: date,
        });
      }

      // 既存案件の編集
      if (flag == 'edit') {
        const targetProjectId = project!.id;

        const allProjects = boards.flatMap((board) => board.items);
        const targetProject = allProjects.find(
          (project) => project!.id === targetProjectId
        );

        if (targetProject) {
          targetProject.title = title;
          targetProject.detail = detail;
          targetProject.client = client;
          targetProject.date = date;
        }
      }

      // 変更・追加が終わればモーダルを閉じる。
      onSubmit();

      // 保存ボタンを押した後、エラーがない場合は入力した情報は消す。残す意味はないから。
      return {
        errors: null,
      };
    }

    // 戻るボタンを押下
    if (action === 'cancel') {
      // 中止処理
      onSubmit(); // モーダルを閉じる
      return {
        errors: null,
      };
    }

    // 削除ボタンを押下
    if (action === 'delete') {
      const targetProjectId = project!.id;

      const allProjects = boards.flatMap((board) => board.items);
      console.log(allProjects);

      const filteredProject = allProjects.filter(
        (project) => project?.id !== targetProjectId
      );

      console.log(filteredProject);

      onSubmit(); // モーダルを閉じる
      return {
        errors: null,
      };
    }

    return prevFormState;
  }

  const [formState, formAction] = useActionState(createProject, {
    enteredValues: {
      title: project?.title || '',
      detail: project?.detail || '',
      date: project?.date || '',
      client: project?.client || '',
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
        <div className={styles['form__buttons']}>
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
          <button
            type="submit"
            name="action"
            value={project?.title ? 'delete' : 'cancel'}
            className={clsx(
              styles['form__button'],
              styles['form__button--notsave']
            )}
          >
            {project?.title ? '削除' : '戻る'}
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
