import Axios from "axios";
import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

import { MessageLeft, MessageRight } from "./Message";
import MessageInput from "./MessageInput";

import { selectChat } from "../redux/features/chats/ChatSlice";

const AlwaysScrollToBottom = () => {
  const elementRef = React.useRef();
  React.useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

export default function MessageView() {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector(selectChat);
  const [chatMessages, setChatMessages] = React.useState([]);

  React.useEffect(() => {
    Axios.get(process.env.REACT_APP_BASE_API_URL + `chat/${selectedChat}/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      }
    ).then(res => {
      setChatMessages(res.data.results);
    }).catch(err => {
      setChatMessages([]);
    })
  }, [selectedChat])

  if (!selectedChat)
    return <Typography variant="body1">Please select a chat from the left or initiate a new chat by searching in the top right.</Typography>

  return (<Grid
    container
    direction="column"
    justifyContent="flex-start"
    alignItems="stretch">
    <Box sx={{ height: "70vh", overflowY: "scroll" }}>
      <Grid
        container
        item
        direction="column-reverse"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {chatMessages.length > 0
          ? chatMessages.map(message => {
            if (message.sender == selectedChat)
              return <MessageLeft
                message={message.text}
                timestamp={message.timestamp}
                photoURL=""
                displayName={message.sender}
                avatarDisp={false}
              />
            else return <MessageRight
              message={message.text}
              timestamp={message.timestamp}
              photoURL=""
              displayName=""
              avatarDisp={false}
            />
          })
          : <Typography variant="body2">No messages to {selectedChat} yet. Type and send a message now!</Typography>
        }
        <AlwaysScrollToBottom />
      </Grid>
    </Box>
    <Grid item><MessageInput /></Grid></Grid>)
}
