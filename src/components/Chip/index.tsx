import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ColorChips({ label }) {
  return (
    <Stack direction="row" spacing={1} sx={{ margin: '4px' }}>
      <Chip
        sx={{ backgroundColor: '#feebf2', fontWeight: 'bold' }}
        label={label}
      />
    </Stack>
  );
}
