import React from 'react';
import styles from './Headline.module.scss';

export default function Headline() {
  return (
    <div className={`${styles.headline} headline`}>
      <h1 style={{ fontWeight: 'normal', lineHeight: '1.1rem' }}>
        Welcome to the LUKSO
      </h1>
      <h1 style={{ fontWeight: 'bold' }}>Developer Docs</h1>
    </div>
  );
}
