import { createSlice } from "@reduxjs/toolkit";
  const workhistorySlice=createSlice({
    name:"workhistoryState",
    initialState:{
        addnewworkhistory:false,
        gethistory:1,
    },
    reducers:{
        addNewWorkHistory(state,action){
            state.addnewworkhistory=action.payload;
        },
        setGetHistory(state,action){
          state.gethistory=action.payload;
        }, 
    },

  });
  export default workhistorySlice.reducer;
  export const {addNewWorkHistory,setGetHistory}=workhistorySlice.actions;