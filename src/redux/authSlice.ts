import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  data: null,
  status: "",
  error: null,
};

const API_REGISTER = "https://efccf8c1b1d51061.mokky.dev/register";
const API_AUTH = "https://efccf8c1b1d51061.mokky.dev/auth";

export const authTodos = createAsyncThunk("auth/authTodos", async (data) => {
  //@ts-ignore
  const { auth } = data;

  try {
    const response = await axios.post(API_AUTH, auth);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const registerTodos = createAsyncThunk(
  "auth/registerTodos",
  async (data) => {
    //@ts-ignore
    const { auth } = data;
    try {
      const response = await axios.post(API_REGISTER, auth);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //authTodos
    builder.addCase(authTodos.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(authTodos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "fullfiled";
      state.error = null;
    });
    builder.addCase(authTodos.rejected, (state, action) => {
      state.data = null;
      state.status = "rejected";
      //@ts-ignore
      state.error = action.payload;
    });

    //registerTodos
    builder.addCase(registerTodos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "fullfiled";
      state.error = null;
    });
  },
});

export default authSlice.reducer;
