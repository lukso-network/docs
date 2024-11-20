import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type Props = {
  CardData: Array<{
    image?: string;
    imageTitle: string;
    cardHeading: string;
    cardContent: Array<{
      linkPath: string;
      linkText: string;
      newTab?: boolean;
    }>;
  }>;
};

export default function CardWithImage({ CardData }: Props) {
  return (
    <div
      className="cardwithimage"
      style={{
        marginBottom: '5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
      }}
    >
      {CardData.map((item, index) => (
        <Card
          sx={{
            width: {
              xs: '100%', // full width on mobile
              sm: '85%', // slightly smaller on tablet
              md: '48%', // original width on desktop
            },
            maxWidth: '600px', // prevent cards from getting too wide
          }}
          key={index}
        >
          {item.image && (
            <CardMedia
              sx={{
                height: {
                  xs: 200, // taller on mobile
                  sm: 180,
                  md: 140, // original height on desktop
                },
              }}
              image={item.image}
              title={item.imageTitle}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.cardHeading}
            </Typography>
            <Typography color="text.secondary">
              <ul>
                {item.cardContent.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.linkPath}
                      target={link.newTab ? '_blank' : '_self'}
                    >
                      {link.linkText}
                    </a>
                  </li>
                ))}
              </ul>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
