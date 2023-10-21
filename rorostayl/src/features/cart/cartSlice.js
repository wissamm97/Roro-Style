import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartservice } from "./cartService";
const initialState = {
  product: localStorage.getItem("CartItem")
    ? JSON.parse(localStorage.getItem("CartItem"))
    : [],
  isError: false,
  isSuccess: false,
  isLodaing: false,
  message: "",
  paymentMethod: localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod")
    : "",
  order: [],
  orderDetails: [],
};
// Add Order
export const addOrder = createAsyncThunk(
  "order/add",
  async (data, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await cartservice.addOrder(data, Token);
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
// Get Order
export const getorder = createAsyncThunk("order/get", async (id, thunkAPI) => {
  try {
    const Token = thunkAPI.getState().user.user.Token;
    return await cartservice.getOrder(id, Token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
        state.isSuccess = false;
        state.isLodaing = false;
        state.message = "";
    },
    resetAddOrder: (state) => {
      state.order = [];
      state.product = []
    },
    paymentMethodo: (state, action) => {
      state.paymentMethod = action.payload;
    },
    addToCart: (state, action) => {
      const findProduct = state.product.find(
        (product) => product._id === action.payload._id
      );
      if (findProduct) {
        findProduct.quantity += 1;
        if (findProduct.countInStock < findProduct.quantity) {
          window.alert("Sorry , Product is oust OF Stock");
        }
      } else {
        const productClone = { ...action.payload, quantity: 1 };
        state.product.push(productClone);
      }
      localStorage.setItem("CartItem", JSON.stringify(state.product));
    },
    minusquntity: (state, action) => {
      const findProduct = state.product.find(
        (product) => product.id === action.payload.id
      );
      if (findProduct) {
        findProduct.quantity -= 1;
        if (findProduct.countInStock < findProduct.quantity) {
          window.alert("Sorry , Product is oust OF Stock");
        }
      }
      localStorage.setItem("CartItem", JSON.stringify(state.product));
    },
    plusquntity: (state, action) => {
      const findProduct = state.product.find(
        (product) => product.id === action.payload.id
      );
      if (findProduct) {
        findProduct.quantity += 1;
        if (findProduct.countInStock < findProduct.quantity) {
          window.alert("Sorry , Product is oust OF Stock");
        }
      }
      localStorage.setItem("CartItem", JSON.stringify(state.product));
    },
    deleteFromCart: (state, action) => {
      const itemId = action.payload;
      state.product = state.product.filter((item) => item._id !== itemId);
      localStorage.setItem("CartItem", JSON.stringify(state.product));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLodaing = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLodaing = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLodaing = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getorder.pending, (state) => {
        state.isLodaing = true;
      })
      .addCase(getorder.fulfilled, (state, action) => {
        state.isLodaing = false;
        state.isSuccess = true;
        state.orderDetails = action.payload;
      })
      .addCase(getorder.rejected, (state, action) => {
        state.isLodaing = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const {
  addToCart,
  minusquntity,
  plusquntity,
  reset,
  paymentMethodo,
  deleteFromCart,
  resetAddOrder
} = cartSlice.actions;
export default cartSlice.reducer;
