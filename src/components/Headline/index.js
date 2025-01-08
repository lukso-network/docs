import React from 'react';
import styles from './Headline.module.scss';

export default function Headline() {
  return (
    <div className={`${styles.headline} headline`}>
      <h1 style={{ lineHeight: '0' }}>Welcome to the</h1>
      <h1
        style={{
          fontWeight: 'bold',
          lineHeight: 'var(--ifm-heading-line-height)',
        }}
      >
        LUKSO Developer Docs
      </h1>
    </div>
  );
}
