import { createSlice } from "@reduxjs/toolkit";

const reviewSlice=createSlice({
    name:"Review",
    initialState:{
        addNewReview:false

    },
    reducers:{
        addNewReviewHandler(state,action){
        state.addNewReview=action.payload
        },
    },
});

export default reviewSlice.reducer;


export const {addNewReviewHandler}=reviewSlice.actions;