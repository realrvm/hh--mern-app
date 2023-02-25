import { useAuth, ContextType } from 'context';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Global.module.scss';

type Props = {};

export default function Sidebar({}: Props) {
  const { user } = useAuth() as ContextType;

  let activeStyle = {
    color: 'hsl(0, 0%, 100%)',
  };

  useEffect(() => {}, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_user_info}>
        <div className={styles.sidebar_user_info_avatar}>
          <img src={user?.img} alt="avatar" />
        </div>
        <div className={styles.sidebar_user_info_name}>
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
      </div>
      <hr />
      <div className={styles.sidebar_links}>
        <NavLink
          to="/account"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Мой аккаунт
        </NavLink>
        <NavLink
          to="/people"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Пользователи
        </NavLink>
      </div>
    </aside>
  );
}
