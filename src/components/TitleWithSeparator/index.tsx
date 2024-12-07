import React from 'react';
import styles from './TitleWithSeparator.module.scss';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export default function TitleWithSeparator({ title, children }: Props) {
  return (
    <div className={styles.separatorWithTitle}>
      <h1 className={styles.title}>{title}</h1>
      {children}
      <hr className={styles.separator} />
    </div>
  );
}
