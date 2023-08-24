import React from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signin.scss";

const Signin = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const { email, password } = values;
      const payload = { email, password };
      console.log(payload);

      try {
        const response = await axios.post(
          "http://localhost:8000/signin",
          payload
        );
        console.log(response.data);
        const token = response.data;
        localStorage.setItem("token", token);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Box className="wrapper">
      <Box className="container">
        <Box className="inner-cointainer">
          <Box className="header">
            <h6 onClick={() => navigate("/")}>LinkQuest</h6>
            <p onClick={() => navigate("/")}>Home</p>
            <p onClick={() => navigate("/signup")}>Signup</p>
          </Box>
          <Box className="body">
            <h5>Enter and Connect</h5>
            <p className="login">
              Don't have an account?{" "}
              <p className="login-text" onClick={() => navigate("/signup")}>
                {" "}
                Join
              </p>
            </p>
            <Box className="form">
              <form onSubmit={formik.handleSubmit}>
                <Box className="body">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={formik.handleChange}
                  />

                  {formik.errors.email && formik.touched.email && (
                    <p className="error">{formik.errors.email}</p>
                  )}
                </Box>
                <Box className="body">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="error">{formik.errors.password}</p>
                  )}
                </Box>
                <Box className="body">
                  <button type="submit">Submit</button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
        <Box className="text-section">
          <p className="signup-content">
            Welcome ! Your journey continues. Sign in to stay engaged,
            contribute your insights, and collaborate with a community
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Signin;