import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import SearchSlice from "./Search";

const Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: SearchSlice.reducer,
  },
});
export default Store;
