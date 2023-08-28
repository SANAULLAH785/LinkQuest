import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Box } from "@mui/material";

const CommentForm = ({ postId, setReFetchComment, reFetchComments }) => {
  const commentSchema = Yup.object().shape({
    commentInput: Yup.string().required("This field is required"),
  });
  return (
    <Box className="form-wrapper">
      <Formik
        initialValues={{
          commentInput: "",
        }}
        validationSchema={commentSchema}
        onSubmit={async (values, { resetForm }) => {
          const data = { comment: values };
          console.log(data);
          try {
            const token = localStorage.getItem("token");
            const postData = {
              comment: { commentInput: values.commentInput },
            };

            const response = await axios.post(
              `http://localhost:8000/post/comment/${postId}`,
              postData,
              {
                headers: {
                  "Content-Type": "application/json",
                  token: `${token}`,
                },
              }
            );
            console.log(response.data);
            setReFetchComment(reFetchComments + 1);
          } catch (error) {
            console.log(error);
          }

          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box className="add-comment">
              <Field
                type="text"
                name="commentInput"
                id="comment"
                placeholder={`${
                  errors.commentInput && touched.commentInput
                    ? errors.commentInput
                    : "Add a comment"
                }`}
              />

              <button type="submit">Post</button>
            </Box>
            <p>{}</p>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CommentForm;
