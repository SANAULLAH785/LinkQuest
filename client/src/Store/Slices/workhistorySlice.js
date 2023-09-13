import { createSlice } from "@reduxjs/toolkit";
  const workhistorySlice=createSlice({
    name:"workhistoryState",
    initialState:{
        addnewworkhistory:false,
        gethistory:1,
        historypath:"",
        historymodal:false,
        selectedhistorydata:{},
    },
    reducers:{
        addNewWorkHistory(state,action){
            state.addnewworkhistory=action.payload;
        },
        setGetHistory(state,action){
          state.gethistory=action.payload;
        }, 
        setHistroyPath(state,action){
          state.historypath=action.payload;
        },
        setHistoryModal(state,action){
          state.historymodal=action.payload;
        },
        setSelectedHistoryData(state,action){
          state.selectedhistorydata=action.payload;
        },
     
    },

  });
  export default workhistorySlice.reducer;
  export const {addNewWorkHistory,setGetHistory,setHistroyPath,setHistoryModal,setSelectedHistoryData}=workhistorySlice.actions;