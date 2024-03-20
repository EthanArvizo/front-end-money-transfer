import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxSystem() {
    return (
      <Box
        height={200}
        width={500}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}
      >
        This Box uses MUI System props for quick customization.
      </Box>
    );
  }