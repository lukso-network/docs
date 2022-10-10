import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Box.module.scss';

export default function Box({ icon, link, title, content, className }) {
  return (
    <Link style={{ textDecoration: 'none', textAlign: 'center' }} to={link}>
      <div className={`${styles.card} ${className}`}>
        <div
          className={`${styles.img} img`}
          style={{ backgroundImage: 'url(' + icon + ')' }}
        />
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </Link>
  );
}
