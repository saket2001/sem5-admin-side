import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "../services/users";
import authSlice from "./auth";
import SearchSlice from "./Search";

const Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: SearchSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
setupListeners(Store.dispatch);
export default Store;
