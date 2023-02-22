import { ReactNode } from 'react';

import styles from './Form.module.scss';

type Props = {
  children: ReactNode;
};

export default function Form({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>{children}</div>
    </div>
  );
}

Form.Body = function ({ children }: Props) {
  return <div className={styles.form_body}>{children}</div>;
};

Form.Bottom = function ({ children }: Props) {
  return <div className={styles.form_bottom}>{children}</div>;
};
