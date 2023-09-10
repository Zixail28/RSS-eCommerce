import { createSlice } from "@reduxjs/toolkit";
import { searchProducts } from "../services/searchProductsThunk/searchProductsThunk";
import { ISearchProductsResponse } from "../shared/interfaces/seacrhProducts.commercetools.interface";

interface SearchState {
  products: ISearchProductsResponse;
}

const initialState: SearchState = {
  products: {
    limit: 0,
    offset: 0,
    count: 0,
    total: 0,
    results: [],
    facets: {},
  },
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
