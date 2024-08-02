import React from 'react';
import styles from './DappsGallery.module.scss';
//image imports
import UniversalSwaps from '../../../static/img/universalswaps.png';
import Stakingverse from '../../../static/img/tools/stakingverse_logo.png';
import UniversalPage from '../../../static/img/tools/universalpage_logo.png';
import Commonground from '../../../static/img/cg.png';
import LSP8 from '../../../static/img/lsp8app.png';
import UpTurn from '../../../static/img/upturn-scaled.png';

const dapps = [
  {
    name: 'Universal Swaps',
    imageUrl: UniversalSwaps,
    link: 'https://universalswaps.io/',
    backgroundColor: '#fddce7',
  },
  {
    name: 'Stakingverse',
    imageUrl: Stakingverse,
    link: 'https://stakingverse.io/',
    backgroundColor: '#1E1E1E',
  },
  {
    name: 'Commonground',
    imageUrl: Commonground,
    link: 'https://app.cg/',
    backgroundColor: '#404bbb',
  },
  {
    name: 'LSP8.APP',
    imageUrl: LSP8,
    link: 'https://lsp8.app/',
    backgroundColor: '#2d1b46',
  },
  {
    name: 'Universal Page',
    imageUrl: UniversalPage,
    link: 'https://universal.page/',
    backgroundColor: '#5049df',
  },
  {
    name: 'UP Turn',
    imageUrl: UpTurn,
    link: 'https://upturn.live/',
    backgroundColor: 'white',
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
