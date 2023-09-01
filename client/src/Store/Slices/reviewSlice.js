import { createSlice } from "@reduxjs/toolkit";

const reviewSlice=createSlice({
    name:"reviewState",
    initialState:{
        addNewReview:false,
        reviewModalOpen:false,
        selectedCompanyData:{}


    },
    reducers:{
        addNewReviewHandler(state,action){
        state.addNewReview=action.payload
        },
        setReviewModalOpen(state,action){
            state.reviewModalOpen=action.payload
        },
        setSelectedCompanyData(state,action){
            state.selectedCompanyData=action.payload
        }

    },
});

export default reviewSlice.reducer;


export const {addNewReviewHandler,setReviewModalOpen,setSelectedCompanyData}=reviewSlice.actions;