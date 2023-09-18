import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { addUserData } from "../../Store/Slices/userSlice";
import { ApiCallPosts } from "../../components/Api/ApiCall";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import "./Signin.scss";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId = process.env.REACT_APP_CLIENT_ID;

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
    onSubmit: async (payload) => {
      try {
        const response = await ApiCallPosts("/signin", payload);
        console.log(response.data);
        const token = response.data.token;
        const userData = response.data.user;
        localStorage.setItem("token", token);
        dispatch(addUserData(userData));
        navigate("/");
        window.location.reload();
        toast.success("SignIn Successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });
  const googleAuthHandler = async (credentials) => {
    try {
      const response = await ApiCallPosts("/google", credentials);
      console.log("helllloooooo", response);
      const token = response.data.token;
      const userData = response.data.user;
      localStorage.setItem("token", token);
      dispatch(addUserData(userData));
      navigate("/");
      window.location.reload();
      toast.success("SignIn Successfully");
    } catch (error) {}
  };

  return (
    <Box className="auth-wrapper">
      <Box className="auth-container">
        <Box className="auth-inner-cointainer">
          <Box className="auth-header">
            <h6 onClick={() => navigate("/")}>LinkQuest</h6>
            <p onClick={() => navigate("/")}>Home</p>
            <p onClick={() => navigate("/signup")}>Signup</p>
          </Box>
          <Box className="auth-body">
            <h5>Enter and Connect</h5>
            <p className="login">
              Don't have an account?{" "}
              <p className="login-text" onClick={() => navigate("/signup")}>
                {" "}
                Join
              </p>
            </p>
            <Box className="auth-form">
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                  onSuccess={(credentials) => googleAuthHandler(credentials)}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
              <br />
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
