import React from 'react';
import styles from './DappsGallery.module.scss';
import { dappsContent } from './content/DappsGalleryContent';

export default function DappsGallery() {
  return (
    <div className={`${styles.dappsContainer} dappsContainer`}>
      {dappsContent.map((p, index) => (
        <div key={index} className={`${styles.dappCard} dappCard`}>
          <a href={p.link} target="_blank" rel="noreferer noopener">
            <img
              src={p.project}
              className={`${styles.dappCardImage} dappCardImage`}
            />
          </a>
        </div>
      ))}
    </div>
  );
}
