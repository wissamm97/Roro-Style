import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { SearchServices } from './SearchServices'

const initialState ={
    loading : false,
    Error : false,
    products:[],
    page:1,
}
export const getsearch = createAsyncThunk('search', async({query},thunkAPI)=>{
try {
    return SearchServices.searchProduct({query})
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
export const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})

export const {  } = searchSlice.actions;
export default searchSlice.reducer;