import { createSlice } from "@reduxjs/toolkit";

const functionalitySlice = createSlice({
  name: "functionalityState",
  initialState: {
    sideBarOptions: "posts",
  },
  reducers: {
    sideBarOptionsHandler(state, actions) {
      state.sideBarOptions = actions.payload;
    },
  },
});

export default functionalitySlice.reducer;
export const { sideBarOptionsHandler } = functionalitySlice.actions;
