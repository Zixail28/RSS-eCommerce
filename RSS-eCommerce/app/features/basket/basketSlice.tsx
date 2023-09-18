import { createSlice } from "@reduxjs/toolkit";
import { checkExistBasketThunk } from "../../services/basket/checkExistBasketThunk";
import { addProductToBasketThunk } from "../../services/basket/addProductToBusket";
import { removeProductInBasketThunk } from "../../services/basket/removeProductInBasket";

interface SearchState {
  cart: {
    id: string;
    lineItems: string[];
    version: number;
  };
}

const initialState: SearchState = {
  cart: {
    id: "",
    lineItems: [],
    version: 0,
  },
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: { clearSearchState: () => initialState },
  extraReducers: (builder) => {
    builder.addCase(checkExistBasketThunk.fulfilled, (state, action) => {
      state.cart.id = action.payload.id;
      state.cart.lineItems = action.payload.lineItems;
      state.cart.version = action.payload.version;
    });

    builder.addCase(addProductToBasketThunk.fulfilled, (state, action) => {
      state.cart.lineItems = action.payload.lineItems;
      state.cart.version = action.payload.version;
    });

    builder.addCase(removeProductInBasketThunk.fulfilled, (state, action) => {
      state.cart.lineItems = action.payload.lineItems;
      state.cart.version = action.payload.version;
    });
  },
});

export const { clearSearchState } = basketSlice.actions;
