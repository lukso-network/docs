import * as React from 'react';
import Chip from '@mui/material/Chip';

const ColorChips = (label: string) => (
  <Chip sx={{ backgroundColor: '#feebf2' }} label={label} variant="outlined" />
);

export default ColorChips;
