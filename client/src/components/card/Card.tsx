import { getAge, declination } from 'helpers';

import styles from './Card.module.scss';

type Props = {
  name: string;
  birthday: string;
  img: string;
};

export default function Card({ name, birthday, img }: Props) {
  const age = getAge(birthday);
  const declinationAge = declination();

  return (
    <div className={styles.card}>
      <div className={styles.card_avatar}>
        <img src={img} alt="avatar" />
      </div>
      <h3 className={styles.card_title}>{name}</h3>
      <p className={styles.card_text}>{declinationAge(age)}</p>
    </div>
  );
}
