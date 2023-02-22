import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth, ContextType } from 'context';

type Props = {};

export default function Root({}: Props) {
  const { user } = useAuth() as ContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  return <Outlet />;
}
