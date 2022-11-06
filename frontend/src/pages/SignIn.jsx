import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Divider, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { push as pushLocation } from "redux-first-history";

import Branding from "../components/Branding";
import Copyright from "../components/Copyright";
import Error from "../components/Error";
import { userLogin } from '../redux/features/user/UserActions';
import { selectUser } from "../redux/features/user/UserSlice";

export default () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const locationState = location.state;
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const { userInfo, error, success, isAuthenticated } = useSelector(selectUser);

  const { from } = locationState || {
    from: { pathname: "/" }
  };

  React.useEffect(() => {
    // redirect authenticated user to profile screen
    if (success && isAuthenticated) {
      dispatch(pushLocation(from, { replace: true }));
    }
  }, [userInfo, success]);

  const handleFormValuesChange = (e) => {
    setFormData(oldState => ({ ...oldState, [e.target.name]: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email !== "" && formData.password !== "") {
      dispatch(userLogin({ email: formData.email, password: formData.password }));
      dispatch(pushLocation(from, { replace: true }));
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //pb: 9,
        overflowY: "clip",
      }}
    >
      <Grid container component="main" sx={{ height: "95vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Branding />
            <Divider variant="middle" />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleFormValuesChange}
                autoComplete="email"
                autoFocus
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleFormValuesChange}
                autoComplete="password"
                type="password"
              />
              {error && <Error>{error}</Error>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link component={RouterLink} to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid >
    </Box>
  );
}
