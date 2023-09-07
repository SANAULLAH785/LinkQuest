import axios from "axios";
import toast from "react-hot-toast";
const baseUrl = "http://localhost:8000";
const token = localStorage.getItem("token");
console.log(token);
// const headers = { "Content-Type": "multipart/form-data" };
// const options = { headers: headers };

const getError = (error) => {
  if (error.response) {
    if (error.response && error.response.status === 500) {
      const errormessage = error.response.data.message;

      return toast.error(errormessage);
    } else if (error.response && error.response.status === 422) {
      const errormessage = error.response.data.message;

      return toast.error(errormessage);
    } else if (error.response && error.response.status === 405) {
      const errormessage = error.response.data.message;

      return toast.error(errormessage);
    } else if (error.response && error.response.status === 406) {
      const errormessage = error.response.data.message;

      return toast.error(errormessage);
    } else if (error.response && error.response.status === 404) {
      const errormessage = error.response.data.message;

      return toast.error(errormessage);
    } else if (error.response && error.response.status === 444) {
      const errormessage = error.response.data.message;

      return toast.error(errormessage);
    } else if (error.response && error.response.status === 401) {
      const errormessage = error.response.data.message;

      return toast.error(errormessage);
    } else if (error.response && error.response.status === 400) {
      const errormessage = error.response.data.message;

      return toast.error(errormessage);
    } else if (error.response && error.response.status === 430) {
      const errormessage = error.response.data.message;

      return toast.error(errormessage);
    } else {
      return "";
    }
  } else {
    return "";
  }
};
const getResponse = (response) => {
  console.log("first", response);
  if (response.status === 200 || response.status === 201) {
    return toast.success(response.data.message);
  } else {
    return getError(response);
  }
};
const getResponseData = (response) => {
  console.log("sec", response);
  if (response.status === 200 || response.status === 201) {
    return response;
  } else {
    return getError(response);
  }
};
const getApiResponse = (response) => {
  if (response.status === 200 || response.status === 201) {
    return response;
  } else {
    return getError(response);
  }
};
const ApiCallPost = (
  path,
  data,
  contentType = "application/json",
  redirect = true
) => {
  const headers = {
    "Content-Type": contentType,
    token: token,
  };
  console.log(headers);
  const options = { headers: headers };

  return axios
    .post(baseUrl + path, data, options)
    .then((response) => {
      return getResponse(response, redirect);
    })
    .catch((error) => {
      return getError(error);
    });
};
const ApiCallPosts = (
  path,
  data,
  contentType = "application/json",
  redirect = true
) => {
  const headers = {
    "Content-Type": contentType,
    token: token,
  };
  console.log(headers);
  const options = { headers: headers };

  return axios
    .post(baseUrl + path, data, options)
    .then((response) => {
      return getResponseData(response, redirect);
    })
    .catch((error) => {
      return getError(error);
    });
};

const ApiCallGet = (path) => {
  return axios
    .get(baseUrl + path)
    .then((response) => {
      console.log(response.data);
      return getApiResponse(response);
    })
    .catch((error) => {
      return getError(error);
    });
};
const ApiCallPut = (
  path,
  data,
  contentType = "application/json",
  redirect = true
) => {
  const headers = {
    "Content-Type": contentType,
    token: token,
  };

  const options = { headers: headers };

  return axios
    .put(baseUrl + path, data, options)
    .then((response) => {
      return getResponse(response, redirect);
    })
    .catch((error) => {
      return getError(error);
    });
};

// put api with data in response
const ApiCallPutwithData = (
  path,
  data,
  contentType = "application/json",
  redirect = true
) => {
  const headers = {
    "Content-Type": contentType,
    token: token,
  };

  const options = { headers: headers };

  return axios
    .put(baseUrl + path, data, options)
    .then((response) => {
      return getResponseData(response, redirect);
    })
    .catch((error) => {
      return getError(error);
    });
};

const ApiCallDelete = (path) => {
  const headers = {
    token: token,
  };

  const options = { headers: headers };

  return axios
    .delete(baseUrl + path, options)
    .then((response) => {
      return getResponse(response);
    })
    .catch((error) => {
      return getError(error);
    });
};

export { ApiCallPost, ApiCallGet, ApiCallPut, ApiCallDelete, ApiCallPosts ,ApiCallPutwithData};
