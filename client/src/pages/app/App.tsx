import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth, ContextType } from 'context';
import Navbar from 'pages/global/Navbar';
import Sidebar from 'pages/global/Sidebar';

import styles from './App.module.scss';

type Props = {};

export default function Root({}: Props) {
  const { user } = useAuth() as ContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) navigate('/login');
    if (user?.email) navigate('/account');
  }, [user?.email]);

  return (
    <div className={styles.app}>
      <div className={styles.app_wrapper}>
        <Sidebar />
        <main className={styles.app_content}>
          <Navbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
