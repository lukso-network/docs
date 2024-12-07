import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { CarouselProps } from 'react-material-ui-carousel/dist/components/types';
import styles from './Carousel.module.scss';

import { CardContent, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

import UniversalSwaps from '../../../static/img/universalswaps.png';
import Stakingverse from '../../../static/img/tools/stakingverse_logo.png';
import Commonground from '../../../static/img/cg.png';
import UniversalPage from '../../../static/img/tools/universalpage_logo.png';
import LSP8 from '../../../static/img/lsp8app.png';
import UpTurn from '../../../static/img/upturn-scaled.png';
import ImagePlaceholder from '../../../static/img/image-placeholder.jpeg';

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

var items: Item[] = [
  // TODO: just use image and re-use top name props to simplify
  // banner 1 ----------------
  {
    name: 'Universal Everything',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    image: ImagePlaceholder,
    backgroundColor: '#fcfcfc',
    link: 'https://universaleverything.io/',
  },
  {
    name: 'Universal Swaps',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'left',
    image: UniversalSwaps,
    backgroundColor: '#fddce7',
    link: 'https://universalswaps.io/',
  },
  {
    name: 'Universal Page',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'middle',
    image: UniversalPage,
    backgroundColor: '#5049df',
    link: 'https://universal.page/',
  },
  {
    name: 'Stakingverse',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'middle',
    image: Stakingverse,
    backgroundColor: '#1E1E1E',
    link: 'https://stakingverse.io/',
  },
  // banner 2 ----------------
  {
    name: 'Common Ground',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'right',
    image: Commonground,
    backgroundColor: '#404bbb',
    link: 'https://app.cg/',
  },
  {
    name: 'DeFolio',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'right',
    image: ImagePlaceholder,
    backgroundColor: '#fcfcfc',
    link: 'https://www.de-folio.com/',
  },
  {
    name: 'UFeed',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'left',
    image: ImagePlaceholder,
    backgroundColor: '#fcfcfc',
    link: 'https://ufeed.io/',
  },
  {
    name: 'UP Turn',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'right',
    image: UpTurn,
    backgroundColor: 'white',
    link: 'https://upturn.live/',
  },
  // banner 3 ----------------
  {
    name: 'LSP8.APP',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'left',
    image: LSP8,
    backgroundColor: '#2d1b46',
    link: 'https://lsp8.app/',
  },
  {
    name: 'Chillwhale',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'left',
    image: ImagePlaceholder,
    backgroundColor: '#fcfcfc',
    link: 'https://chillwhales.com/',
  },
  {
    name: 'CupCo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'left',
    image: ImagePlaceholder,
    backgroundColor: '#fcfcfc',
    link: 'https://...',
  },
  {
    name: 'Family LYX',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'left',
    image: ImagePlaceholder,
    backgroundColor: '#fcfcfc',
    link: 'https://www.familylyx.com/',
  },
  // banner 4 ----------------
  {
    name: 'Txs.app',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'left',
    image: ImagePlaceholder,
    backgroundColor: '#fcfcfc',
    link: 'https://txs.app/',
  },
  {
    name: 'TxCity.io',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    contentPosition: 'left',
    image: ImagePlaceholder,
    backgroundColor: '#fcfcfc',
    link: 'https://txcity.io/v/eth-lukso',
  },
  // // template
  // {
  //   name: '',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
  //   contentPosition: 'left',
  //   image: ImagePlaceholder,
  //   backgroundColor: '#fcfcfc',
  //   link: 'https://...',
  // },
];

const firstItems = items.slice(0, 4);
const secondItems = items.slice(4, 8);
const thirdItems = items.slice(8, 12);
const fourthItems = items.slice(12);

console.log(firstItems);
console.log(secondItems);

const DappsCarousel = () => (
  <Carousel className={styles.Example} {...carouselConfig}>
    <DappsBanner dapps={firstItems} />
    <DappsBanner dapps={secondItems} />
    <DappsBanner dapps={thirdItems} />
    <DappsBanner dapps={fourthItems} />
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
      <Typography className={styles.Caption}>{dapp.description}</Typography>
      <Button
        className={styles.ViewButton}
        variant="outlined"
        style={{ marginTop: '1rem' }}
      >
        View
      </Button>
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
