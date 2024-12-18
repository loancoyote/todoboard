import styles from '@/components/form.module.scss';
import { FormProps } from '@/features/types';
import { isNotEmpty } from '@/lib/validation';
import clsx from 'clsx';

export default function Form({ project }: FormProps) {
  function createProject(formData: FormData) {
    const title = formData.get('title') as string | null;
    const detail = formData.get('detail') as string | null;
    const date = formData.get('date') as string | null;
    const client = formData.get('client') as string | null;
    console.log(title, detail, date, client);

    const errors = [];

    if (!isNotEmpty(title)) {
      errors.push('案件名は必須項目です');
    }
    if (!isNotEmpty(date)) {
      errors.push('期日は必須項目です');
    }
    console.log(errors);
  }
  // const [state, formAction] = useActionState(action, { errors: null });
  return (
    <form className={styles['form']} action={createProject}>
      <div className={styles['form__item']}>
        <label htmlFor="title">案件名（必須）</label>
        <input
          id="title"
          type="text"
          defaultValue={project?.title}
          name="title"
        />
      </div>
      <div className={styles['form__item']}>
        <label htmlFor="detail">詳細</label>
        <textarea id="detail" name="detail"></textarea>
      </div>
      <div className={styles['form__item']}>
        <label htmlFor="date">期日（必須）</label>
        <input id="date" type="text" defaultValue={project?.date} name="date" />
      </div>
      <div className={styles['form__item']}>
        <label htmlFor="client">依頼元</label>
        <input
          id="client"
          type="text"
          defaultValue={project?.client}
          name="client"
        />
      </div>
      <div className={styles['form__buttons']}>
        <button
          className={clsx(styles['form__button'], styles['form__button--save'])}
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
  );
}
