import { createSlice } from "@reduxjs/toolkit";

import { getUserDetails, updateUserDetails, updateUserPhoto, userLogin, userLogout, userRegister } from "./UserActions";

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = null;
        state.isAuthenticated = true;
        state.userToken = payload.access;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.userToken = null;
        state.isAuthenticated = false;
        state.userInfo = null;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = null;
        state.success = true;
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.success = true;
        state.isAuthenticated = true;
      })
      .addCase(getUserDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        state.userInfo = null;
        localStorage.removeItem('userToken');
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo.first_name = payload.first_name;
        state.userInfo.last_name = payload.last_name;
        state.success = true;
      })
      .addCase(updateUserDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      .addCase(updateUserPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserPhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo.photo = payload.photo;
        state.success = true;
      })
      .addCase(updateUserPhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
