import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField } from "@mui/material";

import "./WorkHistory.scss";
const WorkHistory = () => {
 
  return (
    <Box className="mainbox">
      <Box className="sub">
        <form >
          <TextField
          id="companyname"
          label="Name"

          >

          </TextField>
          <button type="submit" className="addbutton">
            Add workhistory
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default WorkHistory;
