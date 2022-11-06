import React from "react";

import {
  Avatar,
  Box, Container, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { push as pushLocation } from "redux-first-history";
import { navBarRoutes } from "../routes";

import Branding from "./Branding";
import UserAutocomplete from "./UserAutocomplete";

import { userLogout } from "../redux/features/user/UserActions";
import { selectUser } from "../redux/features/user/UserSlice";

export default () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { userInfo, userToken, isAuthenticated } = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleToggleUserMenu = (e) => {
    setAnchorElUser(oldState => {
      if (oldState === null)
        return e.currentTarget;
      return null;
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        zIndex: 2000
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding white />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              {isAuthenticated && navBarRoutes.map((page) => (
                <Link
                  key={page.path}
                  component={NavLink}
                  to={page.path}
                  color="white"
                  underline="none"
                  variant="button"
                  sx={{ marginLeft: "2rem" }}
                >
                  {page.title}
                </Link>
              ))}
            </Box>
          </Box>
          {!['/login', '/register'].includes(location.pathname) &&
            (<>
              <UserAutocomplete />
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleToggleUserMenu} sx={{ p: 0 }}>
                    {userInfo ? userInfo.photo
                      ? <Avatar alt={`${userInfo.first_name} ${userInfo.last_name}`} src={process.env.REACT_APP_BASE_URL + userInfo.photo} />
                      : <Avatar alt={`${userInfo.first_name} ${userInfo.last_name}`} />
                      : <></>
                    }
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleToggleUserMenu}
                >
                  <MenuItem key="profile" onClick={() => {
                    handleToggleUserMenu();
                    dispatch(pushLocation('/profile'));
                  }}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem key="logout" onClick={(e) => {
                    e.preventDefault();
                    dispatch(userLogout());
                    dispatch(pushLocation('/login'));
                    handleToggleUserMenu();
                  }}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>)}
        </Toolbar>
      </Container>
    </Box>
  );
};
