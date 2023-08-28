import React from "react";
import axios from "axios";
import { Box } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const ReplyForm = ({ commentId, loadReplies, commentUserName }) => {
  const commentSchema = Yup.object().shape({
    commentInput: Yup.string().required("This field is required"),
  });

  return (
    <Box className="reply-input">
      <Formik
        initialValues={{
          commentInput: "",
        }}
        validationSchema={commentSchema}
        onSubmit={async (values, { resetForm }) => {
          const data = { comment: values };

          try {
            const token = localStorage.getItem("token");
            const postData = {
              comment: {
                commentInput: values.commentInput,
              },
            };

            const response = await axios.post(
              `http://localhost:8000/post/comment/reply/${commentId}`,
              postData,
              {
                headers: {
                  "Content-Type": "application/json",
                  token: `${token}`,
                },
              }
            );
            console.log(response.data);
            loadReplies(commentId);
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
                placeholder={`Reply to ${commentUserName}`}
              />

              <button type="submit">Post</button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ReplyForm;
