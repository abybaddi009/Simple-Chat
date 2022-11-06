import React from "react";

import { Edit as EditIcon } from "@mui/icons-material";
import { Box, Button, Container, Divider, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

import CoverImg from "../assets/backgrounds/mosaic.webp";
import Error from "../components/Error";
import SpeedDail from "../components/SpeedDial";
import { updateUserDetails, updateUserPhoto } from '../redux/features/user/UserActions';
import { selectUser } from "../redux/features/user/UserSlice";


export default () => {
  const [editMode, setEditMode] = React.useState(false);
  const [newPhoto, setNewPhoto] = React.useState(null);
  const [customError, setCustomError] = React.useState(null);
  const { loading, userInfo, error } = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleOnClickEdit = (e) => {
    e.preventDefault();
    console.log("Edit!");
    setEditMode(!editMode);
  }

  const handleOnClickSave = (e) => {
    e.preventDefault();

    if (newPhoto) {
      const photoData = new FormData();
      photoData.append('photo', newPhoto);
      dispatch(updateUserPhoto(photoData));
    }

    const formData = new FormData(e.currentTarget);
    if (formData.get('first_name') || formData.get('last_name') || formData.get('password')) {
      let userData = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name')
      };
      if (formData.get('password') !== formData.get('password2')) {
        setCustomError("Passwords must match");
        return;
      }
      if (formData.get('password') !== "" && formData.get('password2') !== "") {
        userData["password"] = formData.get('password');
        userData["password2"] = formData.get('password2');
      }
      dispatch(updateUserDetails(userData));
    }
    setEditMode(false);
  }

  const handleOnClickCancel = (e) => {
    e.preventDefault();
    console.log("Cancel!");
    setEditMode(false);
  }

  const actions = [
    { icon: <EditIcon />, name: 'Edit', onClick: handleOnClickEdit },
  ];

  const [availableActions, setAvailableActions] = React.useState(actions.filter(action => action.name === "Edit"));

  React.useEffect(() => {
    if (editMode) {
      const filterActions = actions.filter(action => action.name !== "Edit");
      setAvailableActions(filterActions);
    }
    else {
      const filterActions = actions.filter(action => action.name === "Edit");
      setAvailableActions(filterActions);
    }
  }, [editMode])

  return (
    <Container maxWidth="md" sx={{ mb: "60px" }}>
      <form noValidate onSubmit={handleOnClickSave}>
        <Box
          sx={{
            flexGrow: 1,
            // backgroundColor: "whitesmoke",
            display: "flex",
            flexDirection: "column",
            pb: 4
          }}
        >
          <Box
            width="100vw"
            sx={{
              display: { sm: "initial", md: "initial" },
              alignSelf: "center",
              height: "200px",
              position: "relative",
            }}
          >
            <img src={CoverImg}
              style={{
                //borderRadius: "10px",
                //marginTop: 8,
                height: "150px",
                objectFit: "cover",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              }}
              width="100%" />
            <img src={userInfo ? process.env.REACT_APP_BASE_URL + userInfo.photo : ""}
              style={{
                position: "absolute",
                objectFit: "cover",
                left: 0,
                right: 0,
                margin: "auto",
                top: "75px",
                // borderRadius: "50%",
                border: "2px solid white",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              }}
              height="150px"
              width="150px" />
          </Box>
        </Box>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            {editMode &&
              <TextField
                id="avatar"
                type="file"
                onChange={e => setNewPhoto(e.target.files[0])}
                fullWidth
              />}
          </Grid>
          {!editMode && <Grid item md={6}>
            <Typography
              variant="h3"
              component="h3"
              align="center">{userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : ""}</Typography>
          </Grid>}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item md={3}>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h6" component="h6" align="center">Email</Typography>
            <Typography variant="body2" component="p" align="center">{userInfo ? userInfo.email : ""}</Typography>
          </Grid>
          <Grid item md={3}>
          </Grid>
          {editMode
            &&
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  id="first_name"
                  name="first_name"
                  label="First name"
                  placeholder="Enter given name"
                  variant="outlined"
                  value={userInfo ? userInfo.first_name : ""}
                  autoFocus
                  fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="last_name"
                  name="last_name"
                  label="Last name"
                  placeholder="Enter family name"
                  variant="outlined"
                  value={userInfo ? userInfo.last_name : ""}
                  fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Leave empty if no change needed"
                  variant="outlined"
                  type="password"
                  fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="password2"
                  name="password2"
                  label="Confirm password"
                  type="password"
                  placeholder="Leave empty if no change needed"
                  variant="outlined"
                  fullWidth />
              </Grid>
              <Grid item xs={12}>
                {error && <Error>{error}</Error>}
                {customError && <Error>{customError}</Error>}
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  onClick={handleOnClickCancel}
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          }
        </Grid>
        {!editMode && <SpeedDail actions={availableActions} />}
      </form>
    </Container>
  );
};
