import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./Slices/postSlice";
import userSlice from "./Slices/userSlice";

const store = configureStore({
  reducer: {
    postState: postSlice,
    userState: userSlice,
  },
});

export default store;
