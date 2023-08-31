import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import questionData from "../../lib/questionData";
import AddQuestion from "./AddQuestion";
import { useSelector, useDispatch } from "react-redux";
import { addNewQuestionHandler } from "../../Store/Slices/questionSlice";
import { ApiCallGet } from "../Api/ApiCall";
import { Box, Grid } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./QuestionSection.scss";

const QuestionSection = () => {
  const dispatch = useDispatch();
  const [questionsData, setQuestionsData] = useState([]);
  const [getQuestions, setGetQuestions] = useState(1);

  const addNewQuestionCheck = useSelector(
    (state) => state.questionState.addNewQuestion
  );

  const loadQuestions = async () => {
    try {
      const response = await ApiCallGet("/questions");
      // console.log()
      setQuestionsData(response.data.Questions);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [getQuestions]);
  return (
    <>
      <Grid container spacing={2} className="">
        <Grid item xs={12} className="">
          <Box className="searchbar">
            <Box className="search">
              <BsSearch size={15} />
            </Box>
            <input type="text" placeholder="Search" />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            className="button-section"
            onClick={() => dispatch(addNewQuestionHandler(true))}
          >
            <button>Ask Question</button>
          </Box>
        </Grid>
      </Grid>
      {addNewQuestionCheck && (
        <AddQuestion
          getQuestions={getQuestions}
          setGetQuestions={setGetQuestions}
        />
      )}

      <Box>
        {questionsData.map((question) => {
          return (
            <QuestionCard
              avatar={question.user.imageUrl}
              caption={question.content}
              username={question.user.name}
              imageUrl={question.imageUrl}
              votes={question.votes}
              title={question.title}
              tags={question.tags}
              id={question._id}
            />
          );
        })}
      </Box>
    </>
  );
};

export default QuestionSection;
