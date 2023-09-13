import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { ApiCallGet, ApiCallPosts } from "../../../components/Api/ApiCall";
import "./WorkHistory.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HistoryCard from "./HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import { addNewWorkHistory } from "../../../Store/Slices/workhistorySlice";
import AddNewWorkHistory from "./AddNewWorkHistory";
const WorkHistory = () => {
  const dispatch = useDispatch();
  const gethistory = useSelector((state) => state.workhistoryState.gethistory);
  const token = localStorage.getItem("token");
  const [workhistory, setWorkHistory] = useState([]);
  // const [gethistory, setGetHistory] = useState(1);
  const navigate = useNavigate();

  const getWorkHistory = async () => {
    const headers = {
      "Content-Type": "application/json",
      token: token,
    };
    try {
      const response = await axios.get(
        "http://localhost:8000/personalData/workHistory",
        { headers }
      );
      console.log(response.data);
      const workhistorydata = response.data.workhistory;
      setWorkHistory(workhistorydata);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWorkHistory();
  }, [gethistory]);
  const addWorkHistoryHanlder = () => {
    dispatch(addNewWorkHistory(true));
  };

  return (
    <Box className="mainbox">
      <Box className="sub">
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Box className="button-sections">
              <button onClick={() => addWorkHistoryHanlder()}>Add Work Histroy</button>
            </Box>
          </Grid>
          <Grid item md={12}>
            {workhistory.map((history, index) => (
              <HistoryCard
                key={index}
                id={history._id}
                companyName={history.companyName}
                jobTitle={history.jobTitle}
                dateOfJoining={
                  history.dateOfJoining instanceof Date
                    ? history.dateOfJoining.toISOString().split("T")[0]
                    : new Date(history.dateOfJoining)
                        .toISOString()
                        .split("T")[0]
                }
                isPresentEmployee={history.isPresentEmployee}
                dateOfLeft={
                  history.dateOfLeft instanceof Date
                    ? history.dateOfLeft.toISOString().split("T")[0]
                    : new Date(history.dateOfLeft).toISOString().split("T")[0]
                }
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WorkHistory;
