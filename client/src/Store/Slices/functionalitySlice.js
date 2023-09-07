import { createSlice } from "@reduxjs/toolkit";

const functionalitySlice = createSlice({
  name: "functionalityState",
  initialState: {
    sideBarOptions: "posts",
    profileBarOptions:"profile",
  },
  reducers: {
    sideBarOptionsHandler(state, actions) {
      state.sideBarOptions = actions.payload;
    },
    profileBarOptionsHandler(state,actions){
      state.profileBarOptions=actions.payload;
    },
  },
});

export default functionalitySlice.reducer;
export const { sideBarOptionsHandler ,profileBarOptionsHandler} = functionalitySlice.actions;
