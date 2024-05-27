import React from 'react';
import styles from './Headline.module.scss';

export default function Headline() {
  return (
    <div className={`${styles.headline} headline`}>
      <h1 style={{ fontWeight: 'normal', lineHeight: '1.1rem' }}>Welcome to</h1>
      <h1 style={{ fontWeight: 'bold' }}>LUKSO Dev Docs</h1>
    </div>
  );
}
