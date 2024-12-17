import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

interface Props {
  name: string;
  showAsCode?: boolean;
  children: React.ReactNode;
  links: {
    label: string;
    to: string;
    // icon: string; // TODO: add icon for GitHub, Docs, Specs, etc...
  }[];
}

const ReferenceCard: React.FC<Props> = ({
  name,
  showAsCode = false,
  children: description,
  links,
}: Props) => {
  return (
    <div className={clsx('card')}>
      <div className="card__body">
        <Heading as="h3">{showAsCode ? <code>{name}</code> : name}</Heading>
        {description}
      </div>
      <div className="card__footer">
        <div
          className="button-group button-group--block"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
        >
          {links.map((item, index) => (
            <Link key={index} className="button button--secondary" to={item.to}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferenceCard;
