import React from 'react';
import styles from './DappsGallery.module.scss';

// images
import UniversalSwaps from '../../../static/img/universalswaps.png';
import Stakingverse from '../../../static/img/tools/stakingverse_logo.png';
import Commonground from '../../../static/img/cg.png';
import UniversalPage from '../../../static/img/tools/universalpage_logo.png';
import LSP8 from '../../../static/img/lsp8app.png';

import LogoDappNode from '../../../static/img/tools/dappnode_logo.png';
import LogoEnvio from '../../../static/img/tools/envio_logo.png';
import LogoAPI3 from '../../../static/img/tools/api3_logo.jpeg';
import LogoDIA from '../../../static/img/tools/dia_logo.png';
import LogoTransak from '../../../static/img/tools/transak_logo.png';
import LogoRamp from '../../../static/img/tools/ramp-network-logo.png';

const dapps = [
  {
    name: 'DappNode',
    imageUrl: LogoDappNode,
    link: 'https://universalswaps.io/',
    backgroundColor: 'white',
  },
  {
    name: 'Envio',
    imageUrl: LogoEnvio,
    link: 'https://stakingverse.io/',
    backgroundColor: 'white',
  },

  {
    name: 'API3',
    imageUrl: LogoAPI3,
    link: 'https://lsp8.app/',
    backgroundColor: 'white',
  },
  {
    name: 'DIA',
    imageUrl: LogoDIA,
    link: 'https://universal.page/',
    backgroundColor: 'white',
  },
  {
    name: 'Transak',
    imageUrl: LogoTransak,
    link: 'https://upturn.live/',
    backgroundColor: 'white',
  },
  {
    name: 'Ramp',
    imageUrl: LogoRamp,
    link: 'https://app.cg/',
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
