import { FormEventHandler, useRef, useState } from 'react';

import { Button, Input, FilePicker } from 'components';

import styles from './Signup.module.scss';
import { useAuth, ContextType } from 'context';

import type { SelectedFile } from 'types';

type Props = {};

type Radio = 'male' | 'female';

export default function Signup({}: Props) {
  const { signup, upload } = useAuth() as ContextType;
  const [gender, setGender] = useState<Radio>('male');
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const bdRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const name = nameRef.current?.value.trim() || '';
    const password = userPasswordRef.current?.value.trim() || '';
    const email = emailRef.current?.value.trim() || '';
    const birthday = bdRef.current?.value || '';

    const values = [name, password, email, birthday, gender];
    for (const el of values) {
      if (el === '') {
        alert('Поля не должны быть пустыми');
        return;
      }
    }
    async function fullSignup() {
      const res = await upload.mutateAsync(selectedFile);
      const { filePath } = res.data;
      const img = `public${filePath}`;
      await signup.mutateAsync({
        name,
        img,
        password,
        email,
        birthday,
        gender,
      });
    }
    fullSignup();
  };

  return (
    <>
      <h1 className={styles.signup_title}>Регистрация</h1>
      <p className={styles.signup_subtitle}>Все поля обязательны</p>
      <form onSubmit={handleSubmit} className={styles.signup_form}>
        <label htmlFor="name">Имя</label>
        <Input id="name" required ref={nameRef} maxLength={10} />
        <label htmlFor="email">Email</label>
        <Input id="email" required type="email" ref={emailRef} maxLength={30} />
        <label htmlFor="password">Пароль</label>
        <Input
          id="password"
          pattern="\S*"
          type="password"
          required
          ref={userPasswordRef}
          maxLength={20}
        />
        <label htmlFor="bd">Возраст</label>
        <Input id="bd" required ref={bdRef} type="date" />
        <label htmlFor="gender">Пол</label>
        <div className={styles.signup_gender}>
          <label htmlFor="male">Муж.</label>
          <input
            type="radio"
            id="male"
            name="gender"
            checked={gender === 'male'}
            value="male"
            onChange={(e) => setGender(e.target.value as Radio)}
          />
          <label htmlFor="female">Жен.</label>
          <input
            type="radio"
            id="female"
            name="gender"
            checked={gender === 'female'}
            value="female"
            onChange={(e) => setGender(e.target.value as Radio)}
          />
        </div>
        <label htmlFor="img">Аватар</label>
        <FilePicker
          setSelectedFile={setSelectedFile}
          selectedFileName={selectedFile?.name}
        />
        <Button type="submit" className={styles.signup_btn}>
          Зарегистрироваться
        </Button>
      </form>
    </>
  );
}
