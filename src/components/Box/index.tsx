import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Box.module.scss';

type BoxProps = {
  icon: string;
  link: string;
  title: string;
  content: string;
  maxImageWidth?: string;
};

const Box: React.FC<BoxProps> = ({
  icon,
  link,
  title,
  content,
  maxImageWidth,
}) => (
  <div
    style={{
      overflow: 'auto',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Link to={link}>
      <img src={icon} style={{ maxWidth: maxImageWidth }} />
    </Link>
    <div style={{ justifyContent: 'center' }}>
      <h2 className={styles.title}>{title}</h2>
      <p>{content}</p>
    </div>
  </div>
);

export default Box;
