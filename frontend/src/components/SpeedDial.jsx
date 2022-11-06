import React from 'react';

import { Box, SpeedDial, SpeedDialAction } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { styled } from '@mui/material/styles';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export default (props) => {

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, position: "fixed", bottom: { xs: 72, md: 16 }, right: 16 }}>
      <Box>
        <StyledSpeedDial
          ariaLabel="Menu"
          hidden={props.hidden}
          icon={<SpeedDialIcon />}
          direction="up"
        >
          {props.actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}
