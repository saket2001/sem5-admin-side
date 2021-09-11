import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "SearchSlice",
  initialState: {
    searchedData: null,
  },
  reducers: {
    setSearchData(state, action) {
      state.searchedData = action.payload;
    },
    clearSearchData(state, action) {
      state.searchedData = null;
    },
  },
});

export const searchActions = SearchSlice.actions;

export default SearchSlice;
