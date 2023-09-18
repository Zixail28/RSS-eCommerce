import { persistReducer, persistStore } from "redux-persist";
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { categorySlice } from "../features/categorySlice";
import { productsSlice } from "../features/productsSlice";
import { searchProductsSlice } from "../features/searchProductsSlice";
import { productSlice } from "../features/productSlice";
import localStorage from "redux-persist/es/storage";
import { basketSlice } from "../features/basket/basketSlice";

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  category: categorySlice.reducer,
  products: productsSlice.reducer,
  search: searchProductsSlice.reducer,
  product: productSlice.reducer,
  basket: basketSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST"],
    },
  }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
