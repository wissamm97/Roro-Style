import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import prodcutSlice from "../features/product/productSlice";
import userSlice from "../features/user/userSlice";
import PaypalSlice from "../features/Paypal/PaypalSlice";
import OrderSlice from "../features/Order/OrderSlice";
import searchSlice from "../features/Search/SearchSlice";
import FavouritesSlice from "../features/Favourites/Favourites";
import payStripe from "../features/Stripe/Stripe";
import AdminSlice from "../features/Admin/AdminSlice";
export const store = configureStore({
  reducer: {
    admin: AdminSlice,
    user: userSlice,
    product: prodcutSlice,
    cart: cartSlice,
    paypal: PaypalSlice,
    stripe: payStripe,
    order: OrderSlice,
    search: searchSlice,
    favourite: FavouritesSlice,
  },
});
