import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserMessages = createAsyncThunk(
  'chat/user_messages',
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.get(
        process.env.REACT_APP_BASE_API_URL + "chat/users_messages/",
        config);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
