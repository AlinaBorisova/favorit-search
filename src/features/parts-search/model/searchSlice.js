import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: "",
  brand: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchSubmitted(state, action) {
      state.number = action.payload;
      state.brand = null;
    },
    brandSelected(state, action) {
      state.brand = action.payload;
    },
  },
});

export const { searchSubmitted, brandSelected } = searchSlice.actions;

export const selectNumber = (state) => state.search.number;
export const selectBrand = (state) => state.search.brand;

export default searchSlice.reducer;
