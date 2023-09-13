import React from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { Box, Grid, TextField } from '@mui/material';
import "./HistoryModal.scss";
import { Formik } from 'formik';

const HistoryModal=()=> {
  const workhistorydata= useSelector((state)=> state.workhistoryState.selectedhistorydata);
  return (
    <>
  <Box className="main-boxs">
    <Box className="sub">
   <form onSubmit={Formik.handleSubmit} className='form-edit'>
   <TextField
   id='jobTitle'
   label="JobTitle"
   name="jobTitle"
   fullWidth
   defaultValue={workhistorydata.jobTitle}
   
   ></TextField>

   </form>
   </Box>
  
  </Box>
  </>

    )
}

export default HistoryModal