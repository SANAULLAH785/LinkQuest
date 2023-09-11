import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { ApiCallGet, ApiCallPosts } from "../../components/Api/ApiCall";
import "./WorkHistory.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WorkHistory = () => {
  const token = localStorage.getItem("token");
  const [companydata, setCompanyData] = useState([]);
  const [workhistory,setWorkHistory]=useState([]);
  const navigate = useNavigate();

  const getCompanies = async () => {
  
    try {
      const response = await ApiCallGet("/getcompanies");
      console.log(response);
      setCompanyData(response.data.company);
    } catch (error) {
      console.log(error);
    }
  };
  const getWorkHistory=async()=>{
    const headers={
      "Content-Type": "application/json",
      token:token
    };
    try{
      const response = await axios.get("http://localhost:8000/personalData/workHistory", { headers });
      console.log(response.data);
     const  workhistorydata=response.data.workHistory
      setWorkHistory(workhistorydata);

    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
  getWorkHistory();

  },[])
  useEffect(() => {
    getCompanies();
  }, []);

  const initialValues = {
    company: "",
    jobTitle: "",
    dateOfJoining: "",
    isPresentEmployee: false,
    dateOfLeft: "",
  };

  const validationSchema = Yup.object().shape({
    // company: Yup.string().required("Company is required"),
    // jobTitle: Yup.string().required("Job title is required"),
    // dateOfJoining: Yup.date().required("Date of joining is required"),
    // isPresentEmployee: Yup.boolean(),
    // dateOfLeft: Yup.date().when("isPresentEmployee", {
    //   is: false,
    //   then: Yup.date().required("Date of leaving is required when not an employee"),
    // }),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:async(values)=>{
      try{
     const response= await ApiCallPosts('/personalData/workHistory',values);
     console.log(response.data);

      }
      catch(error){

        console.log(error);

      }
    }
  });
  const handleAddCompany = () => {
    // Navigate to the "/addcompany" path when adding a new company
    navigate("/addcompany");
  };
  return (
    <Box className="mainbox">
      <Box className="sub">
        <form onSubmit={formik.handleSubmit}>
          <div className="fields-container">
            <Autocomplete
              id="company"
              name="company"
              options={companydata.map((company) => company.name)} 
              freeSolo 
              onChange={(event, newValue) => {
                formik.setFieldValue("company", newValue);
              }}
              value={formik.values.company}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.company && Boolean(formik.errors.company)
                  }
                  helperText={formik.touched.company && formik.errors.company}
                  InputLabelProps={{ className: "blue-label" }}
                />
              )}
            />

            <TextField
              id="jobTitle"
              name="jobTitle"
              label=" JobTitle"
              onChange={formik.handleChange}
              error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
              helperText={formik.touched.jobTitle && formik.errors.jobTitle}
              InputLabelProps={{ className: "blue-label" }}
            />
          </div>
          <div className="fields-container">
            <TextField
              name="dateOfJoining"
              label="Date of Joining"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfJoining}
              error={
                formik.touched.dateOfJoining &&
                Boolean(formik.errors.dateOfJoining)
              }
              helperText={
                formik.touched.dateOfJoining && formik.errors.dateOfJoining
              }
              InputLabelProps={{ className: "blue-label" }}
            />
            <div className="fields">
              <div className="checkbox-container">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isPresentEmployee"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.isPresentEmployee}
                    />
                  }
                  label="Is Present Employee"
                  className="MuiFormControlLabel-root"
                />
              </div>
              {formik.values.isPresentEmployee ? null : (
                <TextField
                  name="dateOfLeft"
                  label="Date of Leaving"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateOfLeft}
                  error={
                    formik.touched.dateOfLeft &&
                    Boolean(formik.errors.dateOfLeft)
                  }
                  helperText={
                    formik.touched.dateOfLeft && formik.errors.dateOfLeft
                  }
                  InputLabelProps={{ className: "blue-label" }}
                />
              )}
            </div>
          </div>
          {/* {workhistory.map((workhistory,index)=>(

          ))} */}
          <Button type="submit" className="addbutton">
            Add Work History
          </Button>
          <Button type="button" onClick={handleAddCompany}>
            Add New Company
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default WorkHistory;
