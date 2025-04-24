import React from 'react';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './LinksBox.module.scss';

type LinksProps = {
  links: { text: string; link: string }[];
};

export default function LinksBox({ links }: LinksProps) {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  
  return (
    <ul className={`${styles.linksBox} ${isDarkTheme ? 'darkModeInteractive' : ''}`}>
      {links.map(({ text, link }, index) => (
        <li key={index}>
          <Link to={link}>{text}</Link>
        </li>
      ))}
    </ul>
  );
}
