import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL_PAID = "/order/6484fc080406ddaa4b9ed6b2/payment/success";
const API_URL_SECERT = "https://rorostyle.onrender.com/api/Keys/stripe";

const initialState = {
  data_url: [],
  SECERT: "",
  loadingPay: false,
  successPay: false,
  ErrorPay: false,
  message: "",
};
// Get Secert Stripe
export const getSECERT = createAsyncThunk("get/stripe", async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL_SECERT);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// export const payStripe = createAsyncThunk(
//   "pay/stripe",
//   async (data, thunkAPI) => {
//     try {
//       const response = await axios.post(API_URL, data);
//       return response.data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
export const PaidSuccess = createAsyncThunk('paid/Success',async(id,thunkAPI)=>{
  try {
    const Token = thunkAPI.getState().user.user.Token;
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    const response = await axios.get(`https://rorostyle.onrender.com/api/payment/${id}/payment/success`,config)
  console.log(response.data);
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();
  return thunkAPI.rejectWithValue(message);
  }
})
export const stripeSlice = createSlice({
  name: "Stripe",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
    // builder
      // .addCase(payStripe.pending, (state) => {
      //   state.loadingPay = true;
      // })
      // .addCase(payStripe.fulfilled, (state, action) => {
      //   state.loadingPay = false;
      //   state.data_url = action.payload;
      // })
      // .addCase(payStripe.rejected, (state, action) => {
      //   state.loadingPay = false;
      //   state.ErrorPay = true;
      //   state.message = action.payload;
      // });
  // },
});
export const {} = stripeSlice.actions;
export default stripeSlice.reducer;
