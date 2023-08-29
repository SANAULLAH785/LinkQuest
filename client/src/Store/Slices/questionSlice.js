import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "questionState",
  initialState: {
    addNewQuestion: false,
    questionModalOpen: false,
    selectedQuestion: {},
  },
  reducers: {
    addNewQuestionHandler(state, actions) {
      state.addNewQuestion = actions.payload;
    },

    setSelectedQuestion(state, action) {
      state.selectedQuestion = action.payload;
    },
    setQuestionModalOpen(state, action) {
      state.questionModalOpen = action.payload;
    },
  },
});

export default postSlice.reducer;
export const {
  addNewQuestionHandler,
  setSelectedQuestion,
  setQuestionModalOpen,
} = postSlice.actions;
