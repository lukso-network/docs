import * as React from 'react';
import Chip from '@mui/material/Chip';

type Props = {
  label: string;
};

const ColorChips = ({ label }: Props) => (
  <Chip
    sx={{
      color: 'white',
      backgroundImage:
        'linear-gradient(to bottom right, rgba(235,29,113,2), rgba(235,29,113,0.40))',
      fontWeight: 'bold',
    }}
    label={label}
    variant="outlined"
  />
);

export default ColorChips;
