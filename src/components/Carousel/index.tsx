import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CarouselProps } from 'react-material-ui-carousel/dist/components/types';
import CallToActionButton from '../CallToActionButton/index';

import styles from './Carousel.module.scss';

// images
import UniversalEverythingLogo from '../../../static/img/dapps/universaleverything-io-logo.png';
import UniversalSwapsLogo from '../../../static/img/dapps/universalswaps-logo.png';
import UniversalPageLogo from '../../../static/img/dapps/universalpage-logo.png';
import StakingverseLogo from '../../../static/img/dapps/stakingverse-logo.png';
import CommongroundLogo from '../../../static/img/dapps/common-ground-logo.png';
import DefolioLogo from '../../../static/img/dapps/defolio-logo.png';
import UFeedLogo from '../../../static/img/dapps/ufeed-logo.png';
import UpTurnLogo from '../../../static/img/dapps/upturn-logo-scaled.png';
import LSP8AppLogo from '../../../static/img/dapps/lsp8app-logo.png';
// TODO: define if we add some popular NFT collections or not
// import ChillwhaleLogo from '../../../static/img/dapps/chillwhale-logo.jpg';
// import CupCoLogo from '../../../static/img/dapps/cupco-logo.webp';
import FamilyLyxLogo from '../../../static/img/dapps/family-lyx-logo.png';
import TxCityLogo from '../../../static/img/dapps/txcity-io-logo.webp';
import TxsAppLogo from '../../../static/img/dapps/txs-app-logo.png';

const carouselConfig: CarouselProps = {
  interval: 8000,
  stopAutoPlayOnHover: true,
  autoPlay: false,
  animation: 'slide',
  duration: 1000,
  swipe: true,
  navButtonsAlwaysVisible: true,
};

type Item = {
  name: string;
  description: string;
  contentPosition?: 'left' | 'middle' | 'right'; // TODO: delete this property (not used)
  image: string;
  backgroundColor: string;
  link: string;
};

// // template
// {
//   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
//   contentPosition: 'left',
//   image: ImagePlaceholder,
//   backgroundColor: '#fcfcfc',
//   link: 'https://...',
// },
var items: Item[] = [
  // TODO: just use image and re-use top name props to simplify
  // banner 1 ----------------
  {
    name: 'Universal Everything',
    description: 'Explorer and wallet for Universal Profiles.',
    image: UniversalEverythingLogo,
    backgroundColor: '#fcfcfc',
    link: 'https://universaleverything.io/',
  },
  {
    name: 'Universal Swaps',
    description: 'Defi made social for swaps and tokens liquidity.',
    contentPosition: 'left',
    image: UniversalSwapsLogo,
    backgroundColor: '#fddce7',
    link: 'https://universalswaps.io/',
  },
  {
    name: 'Universal Page',
    description: 'NFT marketplace and staking solution on LUKSO.',
    contentPosition: 'middle',
    image: UniversalPageLogo,
    backgroundColor: '#5049df',
    link: 'https://universal.page/',
  },
  {
    name: 'Stakingverse',
    description: 'Stake your LYX and start earning staking rewards.',
    contentPosition: 'middle',
    image: StakingverseLogo,
    backgroundColor: '#1E1E1E',
    link: 'https://stakingverse.io/',
  },
  // banner 2 ----------------
  {
    name: 'Common Ground',
    description: 'The social app for all web3 communities.',
    contentPosition: 'right',
    image: CommongroundLogo,
    backgroundColor: '#404bbb',
    link: 'https://app.cg/',
  },
  {
    name: 'DeFolio',
    description: 'Universal Profiles management platform.',
    contentPosition: 'right',
    image: DefolioLogo,
    backgroundColor: '#fcfcfc',
    link: 'https://www.de-folio.com/',
  },
  {
    name: 'UFeed',
    description: 'Social network and feed on LUKSO',
    contentPosition: 'left',
    image: UFeedLogo,
    backgroundColor: '#fcfcfc',
    link: 'https://ufeed.io/',
  },
  {
    name: 'UP Turn',
    description: 'Token generator app for digital assets on LUKSO.',
    contentPosition: 'right',
    image: UpTurnLogo,
    backgroundColor: 'white',
    link: 'https://upturn.live/',
  },
  // banner 3 ----------------
  {
    name: 'LSP8.APP',
    description: 'Track and analyze LSP8 NFT rarity and value.',
    contentPosition: 'left',
    image: LSP8AppLogo,
    backgroundColor: '#2d1b46',
    link: 'https://lsp8.app/',
  },
  {
    name: 'Family LYX',
    description: 'Phygital garments powered by LUKSO standards.',
    contentPosition: 'left',
    image: FamilyLyxLogo,
    backgroundColor: '#31353A',
    link: 'https://www.familylyx.com/',
  },
  {
    name: 'Txs.app',
    description: 'User friendly transaction explorer for LUKSO.',
    contentPosition: 'left',
    image: TxsAppLogo,
    backgroundColor: '#fcfcfc',
    link: 'https://txs.app/',
  },

  {
    name: 'TxCity.io',
    description: 'LUKSO live Blockchain transaction visualizer.',
    contentPosition: 'left',
    image: TxCityLogo,
    backgroundColor: '#fcfcfc',
    link: 'https://txcity.io/v/eth-lukso',
  },
  // banner 4 ----------------
  // {
  //   name: 'Chillwhale',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
  //   contentPosition: 'left',
  //   image: ChillwhaleLogo,
  //   backgroundColor: '#9F9596',
  //   link: 'https://chillwhales.com/',
  // },
  // {
  //   name: 'CupCo',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
  //   contentPosition: 'left',
  //   image: CupCoLogo,
  //   backgroundColor: '#262626',
  //   link: 'https://...',
  // },
];

const firstItems = items.slice(0, 4);
const secondItems = items.slice(4, 8);
const thirdItems = items.slice(8, 12);

console.log(firstItems);
console.log(secondItems);

const DappsCarousel = () => (
  <Carousel className={styles.Example} {...carouselConfig}>
    <DappsBanner dapps={firstItems} />
    <DappsBanner dapps={secondItems} />
    <DappsBanner dapps={thirdItems} />
  </Carousel>
);

type DappsBannerProps = {
  dapps: Item[];
};

const DappsBanner: React.FC<DappsBannerProps> = ({ dapps }) => {
  const Element: React.FC<{ dapp: Item }> = ({ dapp }) => (
    <CardContent className={styles.Content}>
      <div
        key={dapp.name}
        style={{ backgroundColor: dapp.backgroundColor }}
        className={styles.dappCard}
      >
        <a href={dapp.link} target="_blank" rel="noreferer noopener">
          <img src={dapp.image} className={styles.dappCardImage} />
        </a>
      </div>
      <Typography variant="h5" className={styles.Title}>
        {dapp.name}
      </Typography>
      {/* <Typography className={styles.Caption}>{dapp.description}</Typography> */}
      <p>{dapp.description}</p>
      <CallToActionButton
        icon="material-symbols:search"
        text="Visit dApp"
        link={dapp.link}
        color="white"
        newTab={true}
      />
    </CardContent>
  );

  return (
    <Grid container spacing={1}>
      {dapps.map((item, index) => (
        // 12 columns layout, so `3` as value gives us 4 items per banner
        <Grid size={3}>
          <Element dapp={item} key={index} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DappsCarousel;
