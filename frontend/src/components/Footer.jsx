import React from 'react';

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

import { navBarRoutes } from "../routes";

export default () => {
  const location = useLocation();

  return (
    <>
      {!['/login', '/register'].includes(location.pathname) && <Paper sx={{ zIndex: 1000, display: { sm: 'block', md: 'none' }, position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={location.pathname}
        >
          {navBarRoutes.map((page) => (
            <BottomNavigationAction value={page.path} label={page.title} icon={page.icon && <page.icon />} component={NavLink} to={page.path} key={page.path} />
          ))}
        </BottomNavigation>
      </Paper>}
    </>);
}
