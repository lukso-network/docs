import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Box.module.scss';

export default function Box({ icon, link, title, content }) {
    return (
      <Link
        style={{ textDecoration: 'none', textAlign: 'center' }}
        to={link}
      >
        <div className={styles.card}>
          <img src={icon} />
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      </Link>
    );
  }
  