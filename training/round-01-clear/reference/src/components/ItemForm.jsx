import { useEffect, useState } from 'react';

import { Button, Input, TextArea } from './ui';

const EMPTY = { title: '', content: '', category: 'general' };

export function ItemForm({ initialValue = EMPTY, onSubmit, submitting = false, serverError = '' }) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValue });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues({ ...EMPTY, ...initialValue });
  }, [initialValue?.id]);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!values.title.trim()) nextErrors.title = '제목을 입력해 주세요.';
    if (!values.content.trim()) nextErrors.content = '내용을 입력해 주세요.';
    if (!values.category.trim()) nextErrors.category = '카테고리를 입력해 주세요.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit({
      title: values.title.trim(),
      content: values.content.trim(),
      category: values.category.trim(),
    });
  }

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      {serverError && <p className="form-error" role="alert">{serverError}</p>}
      <Input id="title" name="title" label="제목" value={values.title} onChange={(e) => update('title', e.target.value)} error={errors.title} required />
      <Input id="category" name="category" label="카테고리" value={values.category} onChange={(e) => update('category', e.target.value)} error={errors.category} required />
      <TextArea id="content" name="content" label="내용" value={values.content} onChange={(e) => update('content', e.target.value)} error={errors.content} required />

      <section className="preview" aria-live="polite">
        <strong>입력 미리보기</strong>
        <p>{values.title || '제목을 입력하면 여기에 보입니다.'}</p>
      </section>

      <Button type="submit" disabled={submitting}>{submitting ? '저장 중…' : '저장'}</Button>
    </form>
  );
}
