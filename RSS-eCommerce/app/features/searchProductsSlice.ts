import { createSlice } from "@reduxjs/toolkit";
import { searchProducts } from "../services/searchProductsThunk/searchProductsThunk";

export interface ISearch {
  id: string;
  name: {
    "en-US": string;
  };
  version: number;
}

export interface SearchState {
  products: ISearch[];
}

const initialState: SearchState = {
  products: [],
};

export const searchProductsSlice = createSlice({
  name: "searchProducts",
  initialState,
  reducers: { clearSearchState: () => initialState },
  extraReducers: (builder) => {
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { clearSearchState } = searchProductsSlice.actions;
