import { configureStore } from "@reduxjs/toolkit";
import { partsApi } from "@/features/parts-search/api/partsApi";
import searchReducer from "@/features/parts-search/model/searchSlice";

export const store = configureStore({
  reducer: {
    [partsApi.reducerPath]: partsApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(partsApi.middleware),
});
