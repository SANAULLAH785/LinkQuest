import { Box } from "@mui/material";
import React from "react";
import "./HistoryCard.scss";
import { useDispatch } from "react-redux";
import {
  setHistoryModal,
  setSelectedHistoryData,
} from "../../../Store/Slices/workhistorySlice";

const HistoryCard = ({
  id,
  jobTitle,
  dateOfJoining,
  isPresentEmployee,
  dateOfLeft,
  companyName,
}) => {
  const dispatch = useDispatch();
  const historyModalHandler = () => {
    dispatch(setHistoryModal(true));
    dispatch(
      setSelectedHistoryData({
        jobTitle,
        dateOfJoining,
        isPresentEmployee,
        dateOfLeft,
        companyName,
      })
    );
  };

  return (
    <Box className="container" onClick={() => historyModalHandler()}>
      <Box className="info-row">
        <div className="location-info">
          <p className="location-label">Company</p>
          <p>{companyName}</p>
        </div>
        <div className="size-info">
          <p className="size-label">job</p>
          <p>{jobTitle}</p>
        </div>
        <div className="industry-info">
          <p className="industry-label">dateOfJoining</p>
          <p>{dateOfJoining}</p>
        </div>
        <div className="industry-info">
          {isPresentEmployee ? (
            <p>present</p>
          ) : (
            <div>
              <p className="industry-label">Date of Left</p>
              <p>{dateOfLeft}</p>
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default HistoryCard;
