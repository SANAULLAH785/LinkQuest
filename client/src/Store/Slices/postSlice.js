import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "postState",
  initialState: {
    addNewPost: false,
  },
  reducers: {
    addNewPostHandler(state, action) {
      state.addNewPost = action.payload;
    },
  },
});

export default postSlice.reducer;
export const { addNewPostHandler } = postSlice.actions;
