import React from "react";
import { useFormik, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import { ApiCallPost } from "../Api/ApiCall";
import "./AddReviews.scss";
import ReviewCard from "./ReviewCard";
import RatingStars from "react-rating-stars-component";

const AddReviews = ({ loadreview, setLoadReview, id }) => {
  console.log("id", id);
  const ReviewSchema = Yup.object().shape({
    content: Yup.string()
      .required("Kindly add the review first.")
      .min(20, "Review must be at least 20 characters long"),
    ratings: Yup.number()
      .required("Please provide a rating")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const selectedRating = values.ratings;

      // Send selectedRating to your API
      await ApiCallPost(`/review/${id}`, {
        content: values.content,
        ratings: selectedRating,
      });
      setLoadReview(ReviewCard + 1);
      resetForm();
    } catch (error) {
      console.log(error.message);
    }
  };

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
              ratings: 0,
            }}
            validationSchema={ReviewSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Box className="add-comment">
                  <p className="helper-text">
                    Be clear in describing the problem and its solution
                  </p>
                  <Field name="content">
                    {({ field, meta }) => (
                      <Box>
                        <textarea
                          type="text"
                          placeholder="Write your valuable Review here."
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
                        <RatingStars
                          count={5} 
                          size={30} 
                          value={field.value} 
                          onChange={(newValue) =>
                            setFieldValue("ratings", newValue)
                          } 
                          edit={true} 
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
