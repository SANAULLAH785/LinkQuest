import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    newCompany: null, // Store the newly added company here
  },
  reducers: {
    setNewCompany: (state, action) => {
      state.newCompany = action.payload;
    },
  },
});


export default companySlice.reducer;
export const { setNewCompany } = companySlice.actions;
