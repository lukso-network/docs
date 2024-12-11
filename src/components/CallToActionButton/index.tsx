import React from 'react';
import styles from './CallToActionButton.module.scss';

import { Icon } from '@iconify/react';

type ButtonProps = {
  bgColor?: string;
  color: string;
  link: string;
  text: string;
  icon: string;
  newTab?: boolean;
};

const CallToActionButton: React.FC<ButtonProps> = ({
  bgColor,
  color,
  link,
  text,
  icon,
  newTab,
}) => (
  <div className={styles.ctaContainer}>
    <a
      style={{
        backgroundColor: bgColor,
        display: 'flex',
      }}
      className={styles.ctaButton}
      href={link}
      target={`${newTab ? '_blank' : '_self'}`}
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

export default CallToActionButton;
