import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  Favourite: localStorage.getItem("favouriteItem")
    ? JSON.parse(localStorage.getItem("favouriteItem"))
    : [],
};

export const FavouritesSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    reset: (state) => {
      state.Favourite=[];
    },
    addTofavourite: (state, action) => {
      const findeProduct = state.Favourite.find(
        (product) => product._id === action.payload._id
      );
      if (findeProduct) {
        Swal.fire("This product is already in the favourite");
      } else {
        const productClone = { ...action.payload };
        state.Favourite.push(productClone);
        localStorage.setItem("favouriteItem", JSON.stringify(state.Favourite));
      }
    },
    deleteFromfavourite:(state,action)=>{
        const itemId = action.payload;
        state.Favourite = state.Favourite.filter((item) => item._id !== itemId);
        localStorage.setItem("favouriteItem", JSON.stringify(state.Favourite));  
    }
  },
});

export const { addTofavourite, reset ,deleteFromfavourite} = FavouritesSlice.actions;
export default FavouritesSlice.reducer;
