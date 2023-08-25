import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./Slices/postSlice";
import userSlice from "./Slices/userSlice";
import voteSlice from "./Slices/voteSlice";

const store = configureStore({
  reducer: {
    postState: postSlice,
    userState: userSlice,
    voteState: voteSlice,
  },
});

export default store;
