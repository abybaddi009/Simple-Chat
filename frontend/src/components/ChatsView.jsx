import React from 'react';

import { Avatar, Badge, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';

import { selectActiveChat, selectChat } from "../redux/features/chats/ChatSlice";

export default function AlignItemsList({ chats }) {
  const { selectedChat } = useSelector(selectChat);
  const dispatch = useDispatch();

  return (
    <List sx={{ height: "80vh", width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {chats ? chats.map((chat, index) =>
        <>
          <ListItemButton selected={selectedChat == chat.email} alignItems="flex-start" onClick={() => dispatch(selectActiveChat(chat.email))}>
            <ListItemAvatar>
              <Badge color="secondary" badgeContent={chat.unseen}>
                <Avatar alt={chat.email} src={chat.photo ? chat.photo : ""} />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={chat.first_name + " " + chat.last_name}
              secondary={
                <React.Fragment>
                  {chat.latest_message + "…"}
                </React.Fragment>
              }
            />
          </ListItemButton>
          <Divider variant="inset" component="li" />
        </>)
        : <ListItem alignItems="flex-start">
          <ListItemText
            primary="No chats yet."
          />
        </ListItem>}
    </List>
  );
}
