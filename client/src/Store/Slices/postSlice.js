import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "postState",
  initialState: {
    addNewPost: false,
    postModalOpen: false,
    selectedPost: {},
  },
  reducers: {
    addNewPostHandler(state, action) {
      state.addNewPost = action.payload;
    },

    setSelectedPost(state, action) {
      state.selectedPost = action.payload;
    },
    setPostModalOpen(state, action) {
      state.postModalOpen = action.payload;
    },
  },
});

export default postSlice.reducer;
export const { addNewPostHandler, setSelectedPost, setPostModalOpen } =
  postSlice.actions;
