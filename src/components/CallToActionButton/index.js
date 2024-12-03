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
        style={{
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
        }}
        className={styles.ctaButton}
        href={link}
        target={target}
      >
        <span className={styles.iconWrapper}>
          <Icon
            icon={icon}
            style={{
              minWidth: '24px',
              width: '24px',
              height: '24px',
              flexShrink: 0,
            }}
          />
        </span>
        <strong style={{ color: color }}>{text}</strong>
      </a>
    </div>
  );
}
