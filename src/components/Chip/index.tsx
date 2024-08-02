import * as React from 'react';
import Chip from '@mui/material/Chip';

type Props = {
  label: string;
};

const ColorChips = ({ label }: Props) => (
  <Chip
    sx={{ backgroundColor: '#feebf2', fontWeight: 'bold' }}
    label={label}
    variant="outlined"
  />
);

export default ColorChips;
