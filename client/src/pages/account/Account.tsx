import { useAuth, ContextType } from 'context';
import { useNavigate } from 'react-router-dom';
import styles from './Account.module.scss';

type Props = {};

export default function Account({ }: Props) {
  const { user } = useAuth() as ContextType;
  const navigate = useNavigate();
  const sex = user?.gender === 'male' ? 'Мужской' : 'Женский';

  return (
    <section className={styles.account}>
      <div className={styles.account_img}>
        <img src={user?.img} alt="avatar" />
      </div>
      <div className={styles.account_info}>
        <h3>{user?.name}</h3>
        <p>Пол: {sex}</p>
        <p>ДР: {user?.birthday}</p>
        <p>Email: {user?.email}</p>
        <button onClick={() => navigate('/edit')}>Изменить профиль</button>
      </div>
    </section>
  );
}
