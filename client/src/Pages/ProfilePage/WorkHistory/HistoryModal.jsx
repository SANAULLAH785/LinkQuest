import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, TextField,Button } from "@mui/material";
import { setHistoryModal } from "../../../Store/Slices/workhistorySlice";
import {MdClose} from "react-icons/md"
import "./HistoryModal.scss";
import { Formik } from "formik";

const HistoryModal = () => {
  const dispatch=useDispatch();
  const workhistorydata = useSelector(
    (state) => state.workhistoryState.selectedhistorydata
  );
  const handelmodel=()=>{
  dispatch(setHistoryModal(false));
  }
  return (
    <>
      <Box className="main-boxs">
        <Box className="sub">
          <form onSubmit={Formik.handleSubmit} className="form-edit">
          <Box className="close-button">
          <MdClose size={25} onClick={handelmodel}></MdClose>
        </Box>
            <TextField
              id="company"
              label="Company"
              name="company"
              fullWidth
              margin="normal"
              defaultValue={workhistorydata.companyName}
              InputLabelProps={{ className: "blue-label" }}
            ></TextField>
            <TextField
              id="jobTitle"
              label="JobTitle"
              name="jobTitle"
              margin="normal"
              fullWidth
              defaultValue={workhistorydata.jobTitle}
              InputLabelProps={{ className: "blue-label" }}
            ></TextField>
            <TextField
              id="dateOfJoining"
              label="Date Of Joining"
              name="dateOfJoining"
              margin="normal"
              fullWidth
              defaultValue={workhistorydata.dateOfJoining}
              InputLabelProps={{ className: "blue-label" }}
            ></TextField>

            <Button type="submit" className="addbutton">
              Update Work History
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default HistoryModal;
