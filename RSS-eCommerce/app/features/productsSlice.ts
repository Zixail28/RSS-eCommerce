import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../services/products/productsThunk";

export interface Products {
  name: {
    "en-US": string;
  };
}

export interface ProductsState {
  products: {
    results: Products[];
  };
}

const initialState: ProductsState = {
  products: {
    results: [],
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});
