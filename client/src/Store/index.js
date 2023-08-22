import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./Slices/postSlice";

const store = configureStore({
  reducer: {
    postState: postSlice,
  },
});

export default store;
