import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/order.service";

const initialState = {
  order: [],
  status: "idle",
  error: null,
};

export const getAllOrders = createAsyncThunk("order/getAll", async () => {
  const response = await orderService.getAllOrders();
  //   console.log(response);
  return response;
});

export const updateOrder = createAsyncThunk(
  "order/update",
  async (payload, { dispatch }) => {
    const response = await orderService.updateOrder(payload);
    dispatch(getAllOrders());
    console.log(response);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: {
    [getAllOrders.fulfilled]: (state, action) => {
      state.order = action.payload.order;
      state.status = "succeeded";
      //   console.log("Successful");
      // console.log(action.payload);
    },
    [getAllOrders.pending]: (state) => {
      state.status = "loading";
    },
    [getAllOrders.rejected]: (state) => {
      state.status = "failed";
      state.order = initialState.order;
    },
  },
});

export default orderSlice.reducer;
