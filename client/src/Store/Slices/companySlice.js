import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    newCompany: null,
    addnewcomapny:false, // Store the newly added company here
  },
  reducers: {
    AddNewCompany:(state,action)=>{
    state.addnewcomapny=action.payload;
    },
    setNewCompany: (state, action) => {
      state.newCompany = action.payload;
    },
  },
});


export default companySlice.reducer;
export const { setNewCompany,AddNewCompany } = companySlice.actions;
