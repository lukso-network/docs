import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Box.module.scss';

export default function Box({ icon, link, title, content, className }) {
  return (
    // <Link style={{ textDecoration: 'none', textAlign: 'left' }} to={link}>
    <div style={{ overflow: 'auto' }}>
      <div style={{ float: 'left' }}>
        <img
          style={{ display: 'block' }}
          src={icon}
          // className={`${styles.img} img`}
          // style={{ backgroundImage: 'url(' + icon + ')' }}
        />
      </div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
    // </Link>
  );
}
