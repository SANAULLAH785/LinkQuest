import React from "react";
import { Box } from "@mui/material";
import QuestionCard from "./QuestionCard";
import questionData from "../../lib/questionData";
import "./QuestionSection.scss";

const QuestionSection = () => {
  console.log(questionData);
  return (
    <>
      <h1>Hello</h1>
      <Box>
        {questionData.map((question) => {
          return (
            <QuestionCard
              avatar={question.avatar}
              caption={question.content}
              username={question.name}
              imageUrl={question.imageUrl}
              votes={question.votes}
            />
          );
        })}
      </Box>
    </>
  );
};

export default QuestionSection;
