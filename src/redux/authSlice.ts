import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../axios";

const initialState = {
  data: null,
  status: "",
  error: null,
};

// const API_REGISTER = "https://efccf8c1b1d51061.mokky.dev/register";
// const API_AUTH = "https://efccf8c1b1d51061.mokky.dev/auth";
// const API_AUTH_ME = "https://efccf8c1b1d51061.mokky.dev/auth_me";

export const authMe = createAsyncThunk("auth/authMe", async () => {
  try {
    const response = await axios.get("/auth_me");
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const authTodos = createAsyncThunk("auth/authTodos", async (data) => {
  //@ts-ignore
  const { auth } = data;

  try {
    const response = await axios.post("/auth", auth);
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
      const response = await axios.post("/register", auth);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loguot: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    //authMe
    builder.addCase(authMe.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "fullfiled";
      state.error = null;
    });
    builder.addCase(authMe.rejected, (state, action) => {
      state.data = null;
      state.status = "rejected";
      //@ts-ignore
      state.error = action.payload;
    });
    //authTodos

    builder.addCase(authTodos.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(authTodos.fulfilled, (state, action) => {
      console.log(action.payload, "actionPayload");
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
//@ts-ignore
export const selectorIsAuth = (state) => Boolean(state.auth.data);
export const { loguot } = authSlice.actions;
export default authSlice.reducer;
