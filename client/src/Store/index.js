import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./Slices/postSlice";
import userSlice from "./Slices/userSlice";
import questionSlice from "./Slices/questionSlice";
import functionalitySlice from "./Slices/functionalitySlice";
import reviewSlice from "./Slices/reviewSlice";
import companySlice from "./Slices/companySlice";
import workhistorySlice from "./Slices/workhistorySlice";

const store = configureStore({
  reducer: {
    postState: postSlice,
    userState: userSlice,
    questionState: questionSlice,
    functionalityState: functionalitySlice,
    reviewState: reviewSlice,
    companyState:companySlice,
    workhistoryState:workhistorySlice,
  },
});

export default store;
