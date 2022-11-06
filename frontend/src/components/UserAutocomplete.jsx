import Axios from 'axios';
import React from 'react';

import { Autocomplete, CircularProgress, TextField } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';

import { selectActiveChat, selectChat } from "../redux/features/chats/ChatSlice";

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const dispatch = useDispatch();
  const { selectedChat } = useSelector(selectChat);

  React.useEffect(() => {
    Axios.get(
      process.env.REACT_APP_BASE_API_URL + "auth/users/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      }
    ).then(res => {
      setOptions(res.data.results);
    }).catch(err => {
      setOptions([])
    })
  }, [selectedChat])

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="fetch-users"
      sx={{ width: 200, marginRight: "25px" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.email === value.email}
      getOptionLabel={(option) => option.email}
      options={options}
      loading={loading}
      freeSolo
      onChange={(e, v) => {
        if (v)
          dispatch(selectActiveChat(v.email));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search user"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
