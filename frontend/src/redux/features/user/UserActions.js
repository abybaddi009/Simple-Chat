import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
  'user/register',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BASE_API_URL + "auth/register/",
        formData
      );
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
)

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BASE_API_URL + "auth/login/",
        { email, password },
      );
      // store user's token in local storage
      localStorage.setItem('userToken', data.access);
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
)

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
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
        `${process.env.REACT_APP_BASE_API_URL}auth/details/`,
        config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export const updateUserDetails = createAsyncThunk(
  'user/updateUserDetails',
  async (formData, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.patch(
        `${process.env.REACT_APP_BASE_API_URL}auth/update_details/`,
        formData,
        config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export const updateUserPhoto = createAsyncThunk(
  'user/updateUserPhoto',
  async (formData, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}auth/profile/`,
        formData,
        config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export const userLogout = createAsyncThunk(
  'user/logout',
  async (arg, { rejectWithValue }) => {
    try {
      localStorage.removeItem("userToken");
      const data = { success: true };
      return data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
