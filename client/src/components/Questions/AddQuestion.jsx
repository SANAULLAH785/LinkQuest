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

const AddQuestion = ({ getQuestions, setGetQuestions }) => {
  const questionSchema = Yup.object().shape({
    title: Yup.string()
      .required("Kindly add the title")
      .min(10, "Title must be at least 10 characters"),
    content: Yup.string().min(20, "Description must be at least 20 characters"),
  });
  const dispatch = useDispatch();
  const [imageSection, setImageSection] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  console.log("hello");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImageFile(null);
  };

  return (
    <Box className="new-question-container">
      <Box className="closing-div"></Box>
      <Box className="header">
        <p>Ask Question</p>
        <Box
          className="close-button"
          onClick={() => dispatch(addNewQuestionHandler(false))}
        >
          <MdClose color="white" size={25} />
        </Box>
      </Box>

      <Box>
        <Box className="image-section">
          <Formik
            initialValues={{
              title: "",
              image: null,
              content: "",
              tags: "",
            }}
            validationSchema={questionSchema}
            onSubmit={async (values) => {
              console.log(values);
              try {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("content", values.content);
                formData.append("image", values.image);
                formData.append("tags", values.tags);

                await ApiCallPost("/question", formData, "multipart/form-data")
                  .then((res) => {
                    console.log(res);
                    setGetQuestions(getQuestions + 1);
                    dispatch(addNewQuestionHandler(false));
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                // console.log(response.data);
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Box className="add-comment">
                  <p className="helper-text">
                    Be specific and imagine you’re asking a question to another
                    person.
                  </p>

                  <Field name="title">
                    {({ field, meta }) => (
                      <Box>
                        <textarea
                          type="text"
                          placeholder="Add title"
                          {...field}
                          className="textfield"
                        />
                        {meta.touched && meta.error && (
                          <Box className="error">{meta.error}</Box>
                        )}
                      </Box>
                    )}
                  </Field>
                  {selectedImage && (
                    <Box className="image-preview">
                      <img src={selectedImage} alt="Selected" />
                      <Box className="close-button">
                        <MdClose
                          size={25}
                          onClick={() => {
                            clearSelectedImage();
                            setFieldValue("image", null);
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                  {!selectedImage && (
                    <label htmlFor="image" className="input-image">
                      <div className="icon-wrapper">
                        <BsCardImage size={35} />
                      </div>
                      <p>Add Image</p>
                      <Field
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                          handleImageChange(event);
                        }}
                      />
                    </label>
                  )}

                  <p className="helper-text">
                    Introduce the problem and expand on what you put in the
                    title. Minimum 20 characters.
                  </p>
                  <Field name="content">
                    {({ field, meta }) => (
                      <Box>
                        <textarea
                          type="text"
                          placeholder="Add Description"
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
                  <p className="helper-text">
                    Add comma-separated tags to help others search for this
                    question.
                  </p>
                  <Field name="tags">
                    {({ field, meta }) => (
                      <Box>
                        <input
                          type="text"
                          placeholder="eg: react, react hooks"
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

export default AddQuestion;
