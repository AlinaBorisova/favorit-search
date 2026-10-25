import { configureStore } from "@reduxjs/toolkit";
import { partsApi, searchReducer } from "@/features/parts-search";

export const store = configureStore({
  reducer: {
    [partsApi.reducerPath]: partsApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(partsApi.middleware),
});
