import React from 'react';

import { Box, Container, CssBaseline, Typography } from '@mui/material';

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Error 404: Not found
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'The page you were looking for does not exist.'}
        </Typography>
      </Container>
    </Box>
  );
}
