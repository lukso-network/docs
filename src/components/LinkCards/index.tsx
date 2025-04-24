import React from 'react';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './LinkCards.module.scss';

type LinkCardsProps = {
  links: {
    title: string;
    link: string;
    description?: string;
    showAsCode: boolean;
  }[];
};

const LinkCards: React.FC<LinkCardsProps> = ({ links }) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  
  return (
    <div className={styles.containerBoxLinks}>
      {links.map((item) => (
        <Link key={item.link} to={item.link} className={`${styles.boxLink} ${isDarkTheme ? 'darkModeInteractive' : ''}`}>
          <h3>{item.showAsCode ? <code>{item.title}</code> : item.title}</h3>
          <p>{item.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default LinkCards;
