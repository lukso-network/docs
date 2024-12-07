import React from 'react';
import Link from '@docusaurus/Link';

type LinksProps = {
  links: { text: string; link: string }[];
};

export default function LinksList({ links }: LinksProps) {
  return (
    <ul>
      {links.map(({ text, link }, index) => (
        <li key={index}>
          <Link to={link}>{text}</Link>
        </li>
      ))}
    </ul>
  );
}
