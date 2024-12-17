import React from 'react';
import Link from '@docusaurus/Link';

import styles from './LinksBox.module.scss';

type LinksProps = {
  links: { text: string; link: string }[];
};

export default function LinksBox({ links }: LinksProps) {
  return (
    <ul className={styles.linksBox}>
      {links.map(({ text, link }, index) => (
        <li key={index}>
          <Link to={link}>{text}</Link>
        </li>
      ))}
    </ul>
  );
}
