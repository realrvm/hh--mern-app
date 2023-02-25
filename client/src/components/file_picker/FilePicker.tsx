import { ChangeEventHandler, useRef, useState } from 'react';
import styles from './FilePicker.module.scss';

type Props = {
  setSelectedFile: (file: File) => void;
  selectedFileName?: string;
};

export default function FilePicker({
  setSelectedFile,
  selectedFileName,
}: Props) {
  const filePicker = useRef({} as HTMLInputElement);

  const handlePick = () => {
    filePicker.current.click();
  };

  const chooseFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <button onClick={handlePick} className={styles.file_picker_btn}>
        {selectedFileName ? `${selectedFileName}` : 'Выберете аватар'}
      </button>
      <input
        type="file"
        onChange={chooseFile}
        ref={filePicker}
        className={styles.file_picker_hidden}
        accept="image/*, .png, .jpg"
      />
    </>
  );
}
