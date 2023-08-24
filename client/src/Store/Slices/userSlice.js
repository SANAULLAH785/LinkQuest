import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userState",
  initialState: {
    userName: "",
    email: "",
    avatar: "",
    jobTitle: "",
  },
  reducers: {
    addUserData(state, action) {
      state.userName = action.payload.username;
      if (!state.userName) {
        state.userName = action.payload.name;
      }
      state.email = action.payload.email;
      state.avatar = action.payload.imageUrl;
      state.jobTitle = action.payload.jobTitle;
    },
  },
});

export default userSlice.reducer;
export const { addUserData } = userSlice.actions;
