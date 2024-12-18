import styles from '@/components/form.module.scss';
import { type FormProps } from '@/features/types';
import { isNotEmpty } from '@/lib/validation';
import clsx from 'clsx';
import { useActionState } from 'react';

interface ActionStateType {
  enteredValues: { [key: string]: string };
  errors: string[] | null;
}

export default function Form({ project, onSubmit }: FormProps) {
  async function createProject(
    prevFormState: ActionStateType,
    formData: FormData
  ): Promise<ActionStateType> {
    console.log(prevFormState);
    const title = formData.get('title') as string;
    const detail = formData.get('detail') as string;
    const date = formData.get('date') as string;
    const client = formData.get('client') as string;
    console.log(title, detail, date, client);

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

    // エラーがなければモーダルを閉じる。
    onSubmit();

    // 保存ボタンを押した後、エラーがない場合は入力した情報は消す。残す意味はないから。
    return {
      enteredValues: {
        title,
        detail,
        date,
        client,
      },
      errors: null,
    };
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
            className={clsx(
              styles['form__button'],
              styles['form__button--save']
            )}
          >
            保存
          </button>
          <button
            className={clsx(
              styles['form__button'],
              styles['form__button--notsave']
            )}
          >
            {project?.title ? '削除' : '戻る'}
          </button>
        </div>
      </form>
      {formState.errors && <p>error</p>}
    </>
  );
}
