import React from "react";

import { Box, Container, Grid } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import ChatsView from "../components/ChatsView";
import MessagesView from "../components/MessageViewGrid";
import { fetchUserMessages } from "../redux/features/chats/ChatActions";
import { selectChat } from "../redux/features/chats/ChatSlice";
import { getUserDetails } from "../redux/features/user/UserActions";
import { selectUser } from "../redux/features/user/UserSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated, userToken } = useSelector(selectUser);
  const { userMessages } = useSelector(selectChat);

  React.useEffect(() => {
    if (userToken !== null && isAuthenticated && userInfo === null) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch, isAuthenticated]);

  React.useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserMessages());
    }
  }, [userInfo]);

  return (
    <>
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
        <Container
          maxWidth="lg">
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid md={4}>
              <ChatsView chats={userMessages} />
            </Grid>
            <Grid md={8}>
              <MessagesView />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
