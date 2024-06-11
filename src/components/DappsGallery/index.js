import React from 'react';
import styles from './DappsGallery.module.scss';
//image imports
import UniversalSwap from '../../../static/img/tools/universalpage_logo.png';
import Stakingverse from '../../../static/img/tools/stakingverse_logo.jpeg';
import UniversalPage from '../../../static/img/tools/universalpage_logo.png';
import Platties from '../../../static/img/tools/stakingverse_logo.jpeg';

const dapps = [
  {
    name: 'Universal Swap',
    imageUrl: UniversalSwap,
    link: 'https://universalswaps.io/',
    backgroundColor: '#5049df',
  },
  {
    name: 'Stakingverse',
    imageUrl: Stakingverse,
    link: 'https://stakingverse.io/',
    backgroundColor: '#142d4b',
  },
  {
    name: 'Universal Page',
    imageUrl: UniversalPage,
    link: 'https://universal.page/',
    backgroundColor: '#5049df',
  },
  {
    name: 'Platties',
    imageUrl: Platties,
    link: 'https://twitter.com/Platties_',
    backgroundColor: '#142d4b',
  },
];

export default function DappsGallery() {
  return (
    <div className={styles.dappsContainer}>
      {dapps.map((dapp) => (
        <div
          key={dapp.name}
          style={{ backgroundColor: dapp.backgroundColor }}
          className={styles.dappCard}
        >
          <a href={dapp.link} target="_blank" rel="noreferer noopener">
            <img src={dapp.imageUrl} className={styles.dappCardImage} />
          </a>
        </div>
      ))}
    </div>
  );
}
