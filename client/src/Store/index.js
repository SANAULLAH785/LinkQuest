import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./Slices/postSlice";
import userSlice from "./Slices/userSlice";
import functionalitySlice from "./Slices/functionalitySlice";
import reviewSlice from "./Slices/reviewSlice";

const store = configureStore({
  reducer: {
    postState: postSlice,
    userState: userSlice,
    functionalityState: functionalitySlice,
    reviewState: reviewSlice,
  },
});

export default store;
