import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderServices } from "./OrderServices";

const initialState = {
  loading: false,
  error: false,
  message: "",
  data: [],
};

// get Order
export const getOrder = createAsyncThunk("user/order", async (_, thunkAPI) => {
  try {
    const Token = thunkAPI.getState().user.user.Token;
    return orderServices.getOrder(_, Token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const {} = OrderSlice.actions;
export default OrderSlice.reducer;
