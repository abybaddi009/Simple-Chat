import Axios from 'axios';
import React from 'react';

import SendIcon from '@mui/icons-material/Send';
import { Button, Grid, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectChat } from "../redux/features/chats/ChatSlice";

export default () => {
  const [message, setMessage] = React.useState("");
  const { selectedChat } = useSelector(selectChat);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(process.env.REACT_APP_BASE_API_URL + `chat/${selectedChat}/`,
      { text: message },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      }
    ).then(res => {
      console.log("Success");
      setMessage("");
    }
    ).catch(err => console.error(err));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={11}>
        <TextField
          id="message"
          name="message"
          label="Message"
          type="text"
          sx={{ width: "100%" }}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </Grid>
      <Grid item xs={1}>
        <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
          <SendIcon />
        </Button>
      </Grid>
    </Grid>
  )
}
