import { FormEventHandler, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ContextType } from 'context';

import { Button, Input } from 'components';

import styles from './Login.module.scss';

type Props = {};

export default function Login({}: Props) {
  const { user } = useAuth() as ContextType;
  const userNameRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const id = userNameRef.current?.value;
    const password = userPasswordRef.current?.value;
    if (!id || !password) {
      return;
    }
  };

  return (
    <>
      <h1 className={styles.login_title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <label htmlFor="user_name">Name</label>
        <Input id="user_name" required ref={userNameRef} />
        <label htmlFor="password">Password</label>
        <Input id="password" required ref={userPasswordRef} />
        <Button type="submit" className={styles.login_btn}>
          Login
        </Button>
      </form>
    </>
  );
}
