import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../services/products/productsThunk";
import { IProduct } from "../shared/interfaces/products.commercetools.interface";

export interface ProductsState {
  products: {
    results: IProduct[];
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
