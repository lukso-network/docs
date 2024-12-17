import React from 'react';
import Link from '@docusaurus/Link';
import styles from './LinkCards.module.scss';

type LinkCardsProps = {
  links: {
    title: string;
    link: string;
    description?: string;
    showAsCode: boolean;
  }[];
};

const LinkCards: React.FC<LinkCardsProps> = ({ links }) => (
  <div className={styles.containerBoxLinks}>
    {links.map((item) => (
      <Link to={item.link} className={styles.boxLink}>
        <h3>{item.showAsCode ? <code>{item.title}</code> : item.title}</h3>
        <p>{item.description}</p>
      </Link>
    ))}
  </div>
);

export default LinkCards;
