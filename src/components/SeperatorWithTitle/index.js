import React from 'react';
import styles from './SeperatorWithTitle.module.scss';

export default function SeparatorWithTitle({ title }) {
  return (
    <div className={styles.separatorWithTitle}>
      <hr className={styles.separator} />
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
