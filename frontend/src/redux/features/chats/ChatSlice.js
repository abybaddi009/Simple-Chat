import { createSlice } from "@reduxjs/toolkit";

import { fetchUserMessages } from "./ChatActions";


const initialState = {
  loading: false,
  userMessages: null,
  error: null,
  success: false,
  selectedChat: null,
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectActiveChat: (state, { payload }) => {
      state.selectedChat = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserMessages.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userMessages = payload;
      })
      .addCase(fetchUserMessages.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.userMessages = null;
        state.success = false;
      })
  },
});

export const { selectActiveChat } = chatSlice.actions;

export const selectChat = (state) => state.chat;

export default chatSlice.reducer;
