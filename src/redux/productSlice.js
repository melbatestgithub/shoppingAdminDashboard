import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    fetchProductStart: (state) => {
      state.isFetching = true;
    },
    fetchProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    fetchProductFailure: (state) => {
      state.error = true;
    },
    deleteProducts: (state, action) => {
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    updateProduct: (state, action) => {
      state.products[
        state.products.findIndex((p) => p._id === action.payload.id)
      ] = action.payload.product;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const {
  fetchProductFailure,
  fetchProductStart,
  fetchProductSuccess,
  deleteProducts,
  addProduct,
} = productSlice.actions;
export default productSlice.reducer;
