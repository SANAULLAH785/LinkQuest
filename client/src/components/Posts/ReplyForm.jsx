import React from "react";
import { Box } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import {ApiCallPost} from '../Api/ApiCall';

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
          console.log(data);
          const postData = {
            comment: {
              commentInput: values.commentInput,
            },
          };
          await ApiCallPost(`/post/comment/reply/${commentId}`, postData)
          .then((res) => {
            console.log(res.data);
            loadReplies(commentId);
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
