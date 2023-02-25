import { FormEventHandler, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ContextType } from 'context';

import { Button, Input } from 'components';

import styles from './Login.module.scss';

type Props = {};

export default function Login({}: Props) {
  const { user, login } = useAuth() as ContextType;
  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const email = userEmailRef.current?.value;
    const password = userPasswordRef.current?.value;
    if (!email || !password) {
      return;
    }

    login.mutate({ email, password });
  };

  return (
    <>
      <h1 className={styles.login_title}>Логин</h1>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <label htmlFor="user_email">Email</label>
        <Input id="user_email" required ref={userEmailRef} type="email" maxLength={30}/>
        <label htmlFor="password">Пароль</label>
        <Input id="password" required ref={userPasswordRef} type="password" maxLength={20}/>
        <Button type="submit" className={styles.login_btn}>
          Войти
        </Button>
      </form>
    </>
  );
}
