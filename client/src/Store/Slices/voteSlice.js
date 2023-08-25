import { createSlice } from "@reduxjs/toolkit";

const voteSlice = createSlice({
  name: "voteState",
  initialState: {
    votesMap: {}, 
  },
  reducers: {
    updateVotes(state, action) {
      const { postId, newVoteCount } = action.payload;
      state.votesMap[postId] = newVoteCount;
    },
  },
});

export default voteSlice.reducer;
export const { updateVotes } = voteSlice.actions;
