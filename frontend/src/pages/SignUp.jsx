import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { push as pushLocation } from "redux-first-history";

import Copyright from "../components/Copyright";
import Error from "../components/Error";
import { userRegister } from '../redux/features/user/UserActions';
import { selectUser } from "../redux/features/user/UserSlice";

export default function SignUp() {
  const { loading, userInfo, error, success } = useSelector(selectUser);
  const [customError, setCustomError] = React.useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const locationState = location.state;
  const { from } = locationState || {
    from: { pathname: "/" }
  };

  React.useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo)
      dispatch(pushLocation(from, { replace: true }));
    // redirect user to login page if registration was successful
    if (success)
      dispatch(pushLocation('/login'));
  }, [userInfo, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      first_name: data.get('first_name'),
      last_name: data.get('last_name')
    };
    if (userData.password !== userData.password2)
      setCustomError("Passwords must match");
    else
      dispatch(userRegister(userData));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register as a user
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="password2"
              />
            </Grid>
          </Grid>
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
