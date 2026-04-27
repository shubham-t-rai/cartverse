import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  searchProducts: [],
  singleProduct: null,
  loading: false,
  searchLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSearchLoading: (state) => {
      state.searchLoading = true;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchProducts: (state, action) => {
      state.searchProducts = action.payload;
      state.searchLoading = false;
      state.error = null;
    },
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setSearchLoading,
  setProducts,
  setError,
  setSearchProducts,
  setSingleProduct,
} = productSlice.actions;

export default productSlice.reducer;
