import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pageService from "../services/page.service";

const initialState = {
  page: null,
  status: "idle",
  error: null,
};

export const createPage = createAsyncThunk("page/create", async (form) => {
  const response = await pageService.createPage(form);
  console.log(response);
  return response;
});

const pageSlice = createSlice({
  name: "page",
  initialState,
  extraReducers: {
    [createPage.fulfilled]: (state, action) => {
      state.page = action.payload.page;
      state.status = "succeeded";
      console.log("Successful");
      console.log(action.payload);
    },
    [createPage.pending]: (state) => {
      state.status = "loading";
    },
    [createPage.rejected]: (state) => {
      state.status = "failed";
      state.page = null;
    },
  },
});

export default pageSlice.reducer;
