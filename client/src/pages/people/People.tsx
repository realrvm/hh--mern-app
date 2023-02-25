import { useEffect, useMemo, useState } from 'react';

import { useAuth, ContextType } from 'context';
import { Card } from 'components';

import styles from './People.module.scss';

type Props = {};

export default function People({}: Props) {
  const { getUsers, peoples, user } = useAuth() as ContextType;

  useEffect(() => {
    getUsers.mutate();
  }, []);

  const others = useMemo(
    () => peoples.filter((person) => person.uid !== user?.uid),
    [user?.uid, peoples]
  );

  return (
    <section className={styles.people}>
      {others.length ? (
        others.map((person) => {
          const { uid, ...rest } = person;
          return <Card key={uid} {...rest} />;
        })
      ) : (
        <p className={styles.people_nobody}>Пока никого нет...</p>
      )}
    </section>
  );
}
