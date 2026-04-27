import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productSlice";
import wishlistReducer from "./features/wishlistSlice";
import cartReducer from "./features/cardSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});
