import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import "./ChatForm.scss";

const ChatForm = ({ ws, selectedContact, setMessages, sender, receiver }) => {
  const commentSchema = Yup.object().shape({
    chat: Yup.string().required("This field is required"),
  });
  return (
    <Box className="chat-input">
      <Formik
        initialValues={{
          chat: "",
        }}
        validationSchema={commentSchema}
        onSubmit={async (values, { resetForm }) => {
          values.recipient = selectedContact;

          ws.send(
            JSON.stringify({
              ...values,
            })
          );
          setMessages((prev) => [
            ...prev,
            { text: values.chat, sender, receiver },
          ]);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box className="add-comment">
              <Field type="text" name="chat" id="comment" />

              <button type="submit">Post</button>
            </Box>
            <p>{}</p>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChatForm;
