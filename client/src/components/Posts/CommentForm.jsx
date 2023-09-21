import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";

import { ApiCallPost } from "../Api/ApiCall";

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
             const postData = {
              comment: { commentInput: values.commentInput },
             };
          await ApiCallPost(`/post/comment/${postId}`, postData)
          .then((res) => {
            console.log(res.data);
             setReFetchComment(reFetchComments + 1);
        })
          .catch((err) => {
            console.log(err);
          });
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
