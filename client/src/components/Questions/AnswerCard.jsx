import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BsCheckCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { ApiCallPut } from "../Api/ApiCall";
import "./AnswerCard.scss";

const AnswerCard = ({
  avatar,
  username,
  caption,
  date,
  verified,
  questionUserId,
  id,
}) => {
  const logedInUser = useSelector((state) => state.userState.id);

  const [timerId, setTimerId] = useState();
  const [answerVerification, setAnswerVerification] = useState(verified);
  const [initialRender, setInitialRender] = useState(true);

  const verificationHandler = () => {
    setAnswerVerification((prev) => !prev);
    if (timerId) {
      clearTimeout(timerId);
    }
    setInitialRender(false);
  };

  useEffect(() => {
    if (!initialRender) {
      const time = setTimeout(async () => {
        try {
          const response = await ApiCallPut(`/answer/${id}`, {
            verification: answerVerification,
          });
          console.log(response);
        } catch (error) {
          console.log(error.message);
        }
      }, 1000);
      setTimerId(time);
    }
  }, [answerVerification]);

  return (
    <Box className="question-card-container">
      <Box className="header">
        <Box className="user-area">
          <img src={avatar} alt="" />
          <p>{username}</p>
        </Box>
        {/* <p classname="date-section">{date}</p> */}

        {questionUserId === logedInUser ? (
          <>
            <span
              className="get-verified"
              onClick={() => verificationHandler()}
            >
              <BsCheckCircle
                color={answerVerification ? "#1d90f4" : ""}
                size={25}
              />
            </span>
          </>
        ) : (
          <>
            {answerVerification ? (
              <span className="verification-wrapper">
                <BsCheckCircle color="#1d90f4" size={25} />
              </span>
            ) : (
              <span className="verification-wrapper">
                <BsCheckCircle color="" size={25} />
              </span>
            )}
          </>
        )}
      </Box>
      <p class="title">{caption}</p>
    </Box>
  );
};

export default AnswerCard;
