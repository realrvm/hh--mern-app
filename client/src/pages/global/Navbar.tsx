import { useLocation } from 'react-router-dom';
import { useAuth, ContextType } from 'context';

import styles from './Global.module.scss';
type Props = {};

export default function Navbar({}: Props) {
  const { setUser } = useAuth() as ContextType;
  const { pathname: path } = useLocation();
  const isAccountPage = path === '/account';

  return (
    <header className={styles.header}>
      <div className={styles.header_wrapper}>
        <h2 className={styles.header_title}>
          {isAccountPage ? 'Moй профиль' : 'Другие пользователи'}
        </h2>
        <button
          className={styles.header_btn}
          onClick={() => setUser(undefined)}
        >
          Выйти
        </button>
      </div>
    </header>
  );
}
