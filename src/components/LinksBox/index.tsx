import React from 'react';
import styles from './LinksBox.module.scss';
import Link from '@docusaurus/Link';

type LinksBoxProps = {
  links: {
    title: string;
    link: string; // use relative path
    description?: string;
    showAsCode: boolean;
  }[];
};

const LinksBox: React.FC<LinksBoxProps> = ({ links }) => (
  <div className={styles.containerBoxLinks}>
    {links.map((item) => (
      <a href={item.link} className={styles.boxLink}>
        <h3>{item.showAsCode ? <code>{item.title}</code> : item.title}</h3>
        <p>{item.description}</p>
      </a>
    ))}
  </div>
);

export default LinksBox;
