import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Button, FilePicker, Input } from 'components';
import { useAuth, ContextType } from 'context';

import styles from './Edit.module.scss';
import type { SelectedFile } from 'types';

type Props = {};

export default function Edit({}: Props) {
  const { user, edit, upload } = useAuth() as ContextType;
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userNameRef.current) userNameRef.current.value = user?.name || '';
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newName = userNameRef.current?.value.trim() || user?.name;
    const newImg = selectedFile || user?.img;
    const updatedUser = {
      ...user,
      name: newName,
    };

    async function fullSignup() {
      const res = await upload.mutateAsync(selectedFile);
      const { filePath } = res.data;
      const newImg = `public${filePath}`;
      await edit.mutateAsync({ ...updatedUser, img: newImg } as any);
    }
    fullSignup();
    edit.mutate(updatedUser as any);
  };

  return (
    <>
      <h1 className={styles.edit_title}>Редактирование</h1>
      <form onSubmit={handleSubmit} className={styles.edit_form}>
        <label htmlFor="user_name">Имя</label>
        <Input id="user_name" ref={userNameRef} type="text" maxLength={30} />
        <label htmlFor="password">Пароль</label>
        <Input
          id="password"
          ref={userPasswordRef}
          type="password"
          maxLength={20}
        />
        <label htmlFor="img">Аватар</label>
        <FilePicker
          setSelectedFile={setSelectedFile}
          selectedFileName={selectedFile?.name}
        />
        <Button type="submit" className={styles.edit_btn}>
          Изменить данные
        </Button>
      </form>
    </>
  );
}
