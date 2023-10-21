import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const initialState = {
  data: [],
  loadingPay: false,
  successPay: false,
  ErrorPay: false,
};
export const ApproveOrder = createAsyncThunk(
  "orderpay/put",
  async ({ id, order }, thunkAPI) => {
    try {
      console.log(id, "Three");
      console.log(order, "Three");
      const Token = thunkAPI.getState().user.user.Token;
      const config = {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      const response = await axios.put(`https://rorostorefinall.onrender.com/api/orders/pay/${id}`, order, config);
      console.log(response);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const PaypalSlice = createSlice({
  name: "Paypal",
  initialState,
  reducers: {
    resetPay: (state) => {
      state.loadingPay = false;
       state.successPay = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ApproveOrder.pending, (state) => {
        state.loadingPay = true;
      })
      .addCase(ApproveOrder.fulfilled, (state, action) => {
        state.loadingPay = false;
        state.successPay = true;
        state.data = action.payload;
      })
      .addCase(ApproveOrder.rejected, (state, action) => {
        state.loadingPay = false;
        state.successPay = false;
        state.ErrorPay = action.payload;
      });
  },
});

export const { resetPay } = PaypalSlice.actions;
export default PaypalSlice.reducer;
