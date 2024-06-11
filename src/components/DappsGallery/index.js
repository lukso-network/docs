import React from 'react';
import styles from './DappsGallery.module.scss';
//image imports
import UniversalSwap from '../../../static/img/tools/universalpage_logo.png';
import Stakingverse from '../../../static/img/tools/stakingverse_logo.jpeg';
import UniversalPage from '../../../static/img/tools/universalpage_logo.png';
import Platties from '../../../static/img/tools/stakingverse_logo.jpeg';

const dappsContent = [
  {
    name: 'Universal Swap',
    imageUrl: UniversalSwap,
    link: 'https://universalswaps.io/',
  },
  {
    name: 'Stakingverse',
    imageUrl: Stakingverse,
    link: 'https://stakingverse.io/',
  },
  {
    name: 'Universal Page',
    imageUrl: UniversalPage,
    link: 'https://universal.page/',
  },
  {
    name: 'Platties',
    imageUrl: Platties,
    link: 'https://twitter.com/Platties_',
  },
];

export default function DappsGallery() {
  return (
    <div className={`${styles.dappsContainer}`}>
      {dappsContent.map((p) => (
        <div key={p.name} className={`${styles.dappCard}`}>
          <a href={p.link} target="_blank" rel="noreferer noopener">
            <img src={p.imageUrl} className={`${styles.dappCardImage}`} />
          </a>
        </div>
      ))}
    </div>
  );
}
