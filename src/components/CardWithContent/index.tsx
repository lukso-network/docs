import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { useColorMode } from '@docusaurus/theme-common';
import createCustomTheme from '../../theme/themedComponents';

import styles from './CardWithContent.module.scss';

type Props = {
  image?: string;
  title: string;
  children: React.ReactNode;
};

export default function CardWithContent({
  image,
  title,
  children: content,
}: Props) {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  
  const theme = createCustomTheme(isDarkTheme);

  return (
    <div className={styles.cardWithContent}>
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            width: {
              xs: '100%', // full width on mobile
              sm: '85%', // slightly smaller on tablet
              md: '50%', // original width on desktop
            },
            maxWidth: '600px', // prevent cards from getting too wide
          }}
        >
          {image && (
            <CardMedia
              sx={{
                height: {
                  xs: 200, // taller on mobile
                  sm: 180,
                  md: 140, // original height on desktop
                },
              }}
              image={image}
              title={title}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            {content}
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
}
