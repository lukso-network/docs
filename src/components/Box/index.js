import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Box.module.scss';

export default function Box({ icon, link, title, content }) {
  return (
    <div
      style={{
        overflow: 'auto',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Link to={link}>
        <img src={icon} />
      </Link>
      <div style={{ justifyContent: 'center' }}>
        <h2 className={styles.title}>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}
