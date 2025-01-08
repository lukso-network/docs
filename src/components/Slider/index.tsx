import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CarouselProps } from 'react-material-ui-carousel/dist/components/types';
import CallToActionButton from '../CallToActionButton/index';

import styles from './Slider.module.scss';

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
  image: string;
  backgroundColor: string;
  link: string;
};

type BannerProps = {
  isMobile: boolean;
  items: Item[];
};

export const Banner: React.FC<BannerProps> = ({ items, isMobile }) => {
  const Element: React.FC<{ item: Item }> = ({ item }) => (
    <CardContent>
      <div
        key={item.name}
        style={{ backgroundColor: item.backgroundColor }}
        className={styles.itemCard}
      >
        <a href={item.link} target="_blank" rel="noreferer noopener">
          <img src={item.image} className={styles.itemCardImage} />
        </a>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h5">{item.name}</Typography>
        <p>{item.description}</p>
      </div>
    </CardContent>
  );

  return (
    <Grid container spacing={1}>
      {items.map((item, index) => (
        // 12 columns layout, so `3` as value gives us 4 items per banner
        // otherwise 1 item per slide for mobile screens
        <Grid size={isMobile ? 12 : 3}>
          <Element item={item} key={index} />
        </Grid>
      ))}
    </Grid>
  );
};

type SliderProps = {
  items: Item[];
};

const Slider: React.FC<SliderProps> = ({ items }) => {
  const itemsPerSlide = 4;

  const chunks = items.reduce<Item[][]>((resultArray, _, index) => {
    const startSlice = index * itemsPerSlide;
    const endSlice = startSlice + itemsPerSlide;

    if (endSlice > items.length) return resultArray;

    resultArray.push(items.slice(startSlice, endSlice));
    return resultArray;
  }, []);

  // Adjust to 1 item per slide for mobile screens
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Group slides dynamically based on screen size
  const groupedItems = isMobile ? items.map((item) => [item]) : [...chunks];

  return (
    <Carousel {...carouselConfig}>
      {groupedItems.map((group) => {
        return <Banner items={group} isMobile={isMobile} />;
      })}
    </Carousel>
  );
};

export default Slider;
