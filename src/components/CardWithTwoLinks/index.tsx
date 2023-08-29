import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

interface Props {
  name: string;
  url: string;
  urlABI: string;
  description: string;
}

const CardWithTwoLinks: React.FC<Props> = ({
  name,
  url,
  urlABI,
  description,
}: Props) => {
  return (
    <div className={clsx('card')}>
      <div className="card__body">
        <Heading as="h3">{name}</Heading>
        <p>{description}</p>
      </div>
      <div className="card__footer">
        <div className="button-group button-group--block">
          <Link
            style={{ visibility: url == '' ? 'hidden' : 'visible' }}
            className="button button--secondary"
            to={url}
          >
            Overview
          </Link>
          <Link
            style={{ visibility: urlABI == '' ? 'hidden' : 'visible' }}
            className="button button--secondary"
            to={urlABI}
          >
            ABI Reference
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardWithTwoLinks;
