import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminservice } from "./adminServices";

const initialState = {
  admin: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingDetails: true,
  isSuccessgDetails: false,
  SuccessDelelte: false,
  SuccessCreate: false,
  ChangeSuccess: false,
  message: "",
  Allusers: [],
  user: [],
  orders: [],
  order: [],
  products: [],
  product: [],
};
// Login User
export const login = createAsyncThunk("auth/login", async (admin, thunkAPI) => {
  try {
    return await adminservice.login(admin);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// Admin Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await adminservice.logout();
});

// Get All User
export const AllUser = createAsyncThunk("getUser/All", async (_, thunkAPI) => {
  try {
    const Token = thunkAPI.getState().user.user.Token;
    return await adminservice.getAlluser(Token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// Get User details
export const userDetails = createAsyncThunk(
  "getUser/Details",
  async (id, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.getUserDetails(id, Token);
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
// Get Orders

export const getAllOrder = createAsyncThunk(
  "getOrders/All",
  async (_, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.getAllOrders(Token);
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
// Get Order details
export const orderDetails = createAsyncThunk(
  "getOrder/Details",
  async (id, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.getOrderDetails(id, Token);
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

// Order Status Change
export const orderStatusChange = createAsyncThunk(
  "Order/Change",
  async ({ id: id, data: data }, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.orderStatusChange(id, data, Token);
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
// Order Delivered
export const orderDelivered = createAsyncThunk(
  "Order/delivered",
  async (id, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.orderDelivered(id, Token);
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
// Get Products
export const getAllProducts = createAsyncThunk(
  "getProducts/All",
  async (_, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.getAllProducts(Token);
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
// Get Product details
export const productDetails = createAsyncThunk(
  "getprduct/Details",
  async (id, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.getproductdetails(id, Token);
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
// Create Product

export const createproduct = createAsyncThunk(
  "creatproduct",
  async (productData, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.createproduct(productData, Token);
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
// Delet user
export const deletuser = createAsyncThunk(
  "user/delet",
  async (id, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.deletuser(id, Token);
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
// Delet order
export const deletorder = createAsyncThunk(
  "order/delet",
  async (id, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.deletorder(id, Token);
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
// Delet Product
export const deletproduct = createAsyncThunk(
  "product/delet",
  async (id, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await adminservice.deletproduct(id, Token);
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
export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.SuccessCreate = false;
        state.isLoadingDetails = false;
        state.isSuccessgDetails = false;
        state.SuccessDelelte = false;
        state.ChangeSuccess = false;
        state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.admin = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })
      .addCase(AllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllUser.fulfilled, (state, action) => {
        state.isLoading = false;
          state.isSuccess = true;
          state.Allusers = action.payload;
      })
      .addCase(AllUser.rejected, (state, action) => {
        state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(getAllOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.isLoading = false;
          state.isSuccess = true;
          state.orders = action.payload;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
          state.isSuccess = true;
          state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(productDetails.pending, (state) => {
        state.isLoadingDetails = true;
      })
      .addCase(productDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
          state.isSuccessgDetails = true;
          state.product = action.payload;
      })
      .addCase(productDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(userDetails.pending, (state) => {
        state.isLoadingDetails = true;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
          state.isSuccessgDetails = true;
          state.user = action.payload;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(orderDetails.pending, (state) => {
        state.isLoadingDetails = true;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
          state.isSuccessgDetails = true;
          state.order = action.payload;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(deletproduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.SuccessDelelte = true;
      })
      .addCase(deletuser.fulfilled, (state, action) => {
        state.Allusers = action.payload;
        state.SuccessDelelte = true;
      })
      .addCase(deletorder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.SuccessDelelte = true;
      })
      .addCase(createproduct.fulfilled, (state) => {
        state.SuccessCreate = true;
      })
      .addCase(orderStatusChange.pending, (state) => {
        state.ChangeSuccess = true;
      })
      .addCase(orderDelivered.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(orderStatusChange.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
});
export const { reset } = AdminSlice.actions;
export default AdminSlice.reducer;
