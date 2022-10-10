import React from 'react';
import styles from './CallToActionButton.module.scss';

export default function CallToActionButton({ bgColor, color, link, text }) {
  return (
    <div className={styles.ctaContainer}>
      <a
        style={{ backgroundColor: bgColor }}
        className={styles.ctaButton}
        href={link}
      >
        <strong style={{ color: color }}>{text}</strong>
      </a>
    </div>
  );
}
