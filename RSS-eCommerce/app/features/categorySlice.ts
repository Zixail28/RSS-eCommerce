import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../services/category/categoryThunk";

export interface Category {
  name: {
    "en-US": string;
  };
}

export interface CategoryState {
  categories: {
    results: Category[];
  };
}

const initialState: CategoryState = {
  categories: {
    results: [],
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});
