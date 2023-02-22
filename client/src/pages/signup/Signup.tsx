import { FormEventHandler, useRef } from 'react';

import { Button, Input } from 'components';

import styles from './Signup.module.scss';

type Props = {};

export default function Signup({}: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const bdRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const image = imgRef.current?.value;
    const password = userPasswordRef.current?.value;
    const email = emailRef.current?.value;
    const bd = bdRef.current?.value;

    const values = [name, image, password, email, bd];
    for ( const el of values ) {
      if (el === '') {
        alert('Поля не должны быть пустыми');
        return;
      }
    }
  };

  return (
    <>
      <h1 className={styles.signup_title}>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.signup_form}>
        <label htmlFor="name">Name</label>
        <Input id="name" required ref={nameRef} />
        <label htmlFor="email">email</label>
        <Input id="email" required type="email" ref={emailRef} />
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          pattern="\S*"
          type="password"
          required
          ref={userPasswordRef}
        />
        <label htmlFor="bd">Data</label>
        <Input id="bd" required ref={bdRef} />
        <label htmlFor="img">Image</label>
        <Input id="img" ref={imgRef} type="url" />
        <Button type="submit" className={styles.signup_btn}>
          Sign Up
        </Button>
      </form>
    </>
  );
}
