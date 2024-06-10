import React from 'react';
import styles from './CallToActionButton.module.scss';

import { Icon } from '@iconify/react';

export default function CallToActionButton({
  bgColor,
  color,
  link,
  text,
  icon,
  target,
}) {
  return (
    <div className={styles.ctaContainer}>
      <a
        style={{ backgroundColor: bgColor, display: 'flex' }}
        className={styles.ctaButton}
        href={link}
        target={target}
      >
        <Icon
          icon={icon}
          style={{ width: '1.75em', height: '1.75em', marginRight: '0.5em' }}
        />
        <strong style={{ color: color }}>{text}</strong>
      </a>
    </div>
  );
}
