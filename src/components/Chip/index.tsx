import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ColorChips({ label }) {
  return (
    <Chip
      sx={{ backgroundColor: '#feebf2' }}
      label={label}
      variant="outlined"
    />
  );
}
