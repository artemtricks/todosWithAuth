import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoTask } from "../types/types";
import axios from "../axios";

const initialState = {
  todo: [],
  status: "",
  error: null,
};

// const API_URL = "https://efccf8c1b1d51061.mokky.dev/todos";

export const fetchTodos = createAsyncThunk("todo/fetchTodo", async () => {
  try {
    const response = await axios.get("/todos");
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const createNewTodo = createAsyncThunk(
  "todo/createTodo",
  async (data) => {
    try {
      const response = await axios.post("/todos", data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateTodo = createAsyncThunk("todo/updateTodo", async (data) => {
  try {
    //@ts-ignore
    const response = await axios.patch(`/todos/${data.id}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  try {
    await axios.delete(`/todos/${id}`);
  } catch (err) {
    console.log(err);
  }
});

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetchTodos
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todo = action.payload;
      state.status = "fullfiled";
      state.error = null;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.todo = [];
      state.status = "rejected";
      //@ts-ignore
      state.error = action.payload;
    });

    //createTodo
    builder.addCase(createNewTodo.fulfilled, (state, action) => {
      state.status = "fullfiled";
      state.error = null;
      //@ts-ignore
      state.todo.push(action.payload);
    });

    //deleteTodo
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.status = "fullfiled";
      state.error = null;
      //@ts-ignore
      state.todo = state.todo.filter((item) => item.id !== action.meta.arg);
    });
    //updateTodo
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.status = "fullfiled";
      state.error = null;
      //@ts-ignore

      state.todo = state.todo.map((item) => {
        //@ts-ignore
        if (item.id == action.payload.id) {
          return {
            //@ts-ignore
            ...item,
            title: action.payload.title,
            description: action.payload.description,
            complited: action.payload.complited,
          };
        }
        return item;
      });
    });
  },
});

export default todoSlice.reducer;
