import React, { useState } from "react";
import { useFormik, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import { MdClose } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addNewQuestionHandler } from "../../Store/Slices/questionSlice";
import { ApiCallPost } from "../Api/ApiCall";
import "./AddReviews.scss";
import ReviewCard from "./ReviewCard";

const AddReviews = ({ loadreview, setLoadReview, id }) => {
  const ReviewSchema = Yup.object().shape({
    content: Yup.string()
      .required("Kindly add the review first.")
      .min(20, "Answer must be at least 20 characters long"),

  });

  return (
    <Box className="new-question-container">
      <Box className="closing-div"></Box>
      <Box className="header">
        <p>Add Review</p>
      </Box>

      <Box>
        <Box className="image-section">
          <Formik
            initialValues={{
              content: "",
              ratings:0,
            }}
            validationSchema={ReviewSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              try {
                await ApiCallPost(`/review/${id}`, values)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                setLoadReview(ReviewCard + 1);
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
                          placeholder="Write your valuable Review  here."
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
                  <Field name="ratings">
                    {({ field, meta }) => (
                      <Box>
                        <textarea
                          type="number"
                          placeholder="Rate company"
                          {...field}
                          className="textfield"
                          rows={1}
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

export default AddReviews;
