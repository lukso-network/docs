import React from 'react';
import styles from './CallToActionButton.module.scss';

export default function CallToActionButton({
  bgColor,
  color,
  link,
  text,
  target,
}) {
  return (
    <div className={styles.ctaContainer}>
      <a
        style={{ backgroundColor: bgColor }}
        className={styles.ctaButton}
        href={link}
        target={target}
      >
        <strong style={{ color: color }}>{text}</strong>
      </a>
    </div>
  );
}
