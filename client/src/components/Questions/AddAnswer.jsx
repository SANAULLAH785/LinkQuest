import React, { useState } from "react";
import { useFormik, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import { MdClose } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addNewQuestionHandler } from "../../Store/Slices/questionSlice";
import { ApiCallPost } from "../Api/ApiCall";
import "./AddQuestion.scss";
import AnswerCard from "./AnswerCard";

const AddAnswer = ({ loadAnswer, setLoadAnswer, id }) => {
  const questionSchema = Yup.object().shape({
    content: Yup.string()
      .required("Kindly add the answer first.")
      .min(20, "Answer must be at least 20 characters long"),
  });
  const dispatch = useDispatch();

  return (
    <Box className="new-question-container">
      <Box className="closing-div"></Box>
      <Box className="header">
        <p>Add Answer</p>
      </Box>

      <Box>
        <Box className="image-section">
          <Formik
            initialValues={{
              content: "",
            }}
            validationSchema={questionSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              try {
                await ApiCallPost(`/question/answer/${id}`, values)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                // console.log(response.data);
                setLoadAnswer(AnswerCard + 1);
                resetForm();
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Box className="add-comment">
                  <p className="helper-text">
                    Be clear in describing the porblem and its solution
                  </p>
                  <Field name="content">
                    {({ field, meta }) => (
                      <Box>
                        <textarea
                          type="text"
                          placeholder="Write your valuable annswer here."
                          {...field}
                          className="textfield"
                          rows={9}
                        />
                        {meta.touched && meta.error && (
                          <Box className="error">{meta.error}</Box>
                        )}
                      </Box>
                    )}
                  </Field>

                  <button type="submit">Post</button>
                </Box>
                <p>{}</p>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default AddAnswer;
