import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "../services/products/productThunk";

export interface Product {
  name: {
    "en-US": string;
  };
}

export interface ProductState {
  product: {
    results: Product[];
  };
}

const initialState: ProductState = {
  product: {
    results: [],
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});
