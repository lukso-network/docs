import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Box.module.scss';

type BoxProps = {
  icon: string;
  link: string;
  title: string;
  content: string;
  position?: 'right' | 'center';
  maxImageWidth?: string;
};

const Box: React.FC<BoxProps> = ({
  icon,
  link,
  title,
  content,
  position = 'right',
  maxImageWidth = '200px',
}) => {
  const alignment = position == 'center' ? 'center' : 'left';
  const leftPadding = position == 'center' ? '0' : '2.5rem';

  const Image: React.FC = () => (
    <div className={styles.image} style={{ alignItems: alignment }}>
      <Link to={link}>
        <img src={icon} style={{ maxWidth: maxImageWidth }} />
      </Link>
    </div>
  );

  const Text: React.FC = () => (
    <div style={{ textAlign: alignment, paddingLeft: leftPadding }}>
      <h2 className={styles.title}>{title}</h2>
      <p>{content}</p>
    </div>
  );

  return (
    <div>
      {position == 'center' ? (
        <div>
          <Image />
          <Text />
        </div>
      ) : (
        <div className={styles.rightBox}>
          <Text />
          <Image />
        </div>
      )}
    </div>
  );
};

export default Box;
