import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "./Search";

const Store = configureStore({
  reducer: {
    search: SearchSlice.reducer,
  },
});

export default Store;
