import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productservice } from "../product/productService";
const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLodaing: false,
  message: "",
  categories: [],
  categoriesMessage: "",
  categoriesLoading: false,
  categoriesError: false,
  details: [],
};
// Get All Product
export const getproduct = createAsyncThunk(
  "getproduct",
  async (_, thunkAPI) => {
    try {
      return await productservice.getallproduct();
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
//Get Category
export const getCategory = createAsyncThunk("getcategory", async (thunkAPI) => {
  try {
    return await productservice.getCategory();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get DetailsProduct
export const getdetalis = createAsyncThunk(
  "get/details",
  async (id, thunkAPI) => {
    try {
      return await productservice.getDeltails(id);
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
export const prodcutSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // reset: (state) => {
    //     state.products= [],
    //     state.isError= false,
    //     state.isSuccess= false,
    //     state.isLodaing= false,
    //     state.message= ""
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getproduct.pending, (state) => {
        state.isLodaing = true;
      })
      .addCase(getproduct.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLodaing = false;
        state.products = action.payload;
      })
      .addCase(getproduct.rejected, (state, action) => {
        state.isLodaing = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCategory.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.categoriesError = true;
        state.categoriesMessage = action.payload;
      })
      .addCase(getdetalis.pending, (state) => {
        state.isLodaing = true;
      })
      .addCase(getdetalis.fulfilled, (state, action) => {
        state.isLodaing = false;
        state.details = action.payload;
      });
  },
});
export const { reset } = prodcutSlice.actions;
export default prodcutSlice.reducer;
