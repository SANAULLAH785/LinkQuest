import axios from 'axios';
import toast from "react-hot-toast";
const baseUrl="http://localhost:8000";
// const token=localStorage.getItem('Secret-Key');
const headers={'Content-Type':'Application/json'};
const options = { headers: headers };



const getError=(error)=>{
if(error.response){
    if(error.response && error.response.status===500){
    const errormessage=error.response.data;
    return toast.error(errormessage);
    }else if (error.response && error.response.status===422){
        const errormessage=error.response.data;
        return toast.error(errormessage);
    }else if(error.response && error.response.status===405){
        const errormessage=error.response.data;
        return toast.error(errormessage);
    }else if(error.response && error.response.status===406){
        const errormessage=error.response.data;
        return toast.error(errormessage);
    }else if(error.response && error.response.status===404){
        const errormessage=error.response.data;
        return toast.error(errormessage);
    }else if(error.response && error.response.status===444){
        const errormessage=error.response.data;
        return toast.error(errormessage);
    }else if(error.response && error.response.status===401){
        const errormessage=error.response.data;
        return toast.error(errormessage);
    }else if(error.response && error.response.status===430){
        const errormessage=error.response.data;
        return toast.error(errormessage);
    }
    else {
        return toast.error(error);

    }
    
}else{
    return toast.error(error);
}

}
const getResponse=(response)=>{
  if (response.status===200 ){
     window.location.replace(response.data)
        
    }else{
        return response;
    }
  }
  const ApiCallPost =(path,data,redirect=true)=>{
    return axios.post(baseUrl+path,data,options).then((response)=>{
        return getResponse(response, redirect);

    }).catch((error)=>{
    return getError(error)
    })

  }
  const ApiCallGet = (path, redirect = true) => {
    return axios.get(baseUrl + path,options)
      .then((response) => {
        return getResponse(response, redirect);
      })
      .catch((error) => {
        return getError(error);
      });
  
  }

export {ApiCallPost,ApiCallGet};