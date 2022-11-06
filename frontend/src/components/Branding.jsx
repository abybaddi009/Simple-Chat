import React from 'react';

import { Box, Typography } from '@mui/material';

export default (props) => {
  const { white } = props;
  const invert = white ? 'invert(1)' : 'invert(0)';

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyItems: "center", flexGrow: 1 }}
    >
      <Typography
        variant="h4"
        noWrap
        fontFamily={"OldStandard"}
        color={white ? "white" : "default"}
      >Chat App</Typography>
    </Box>
  )
};
