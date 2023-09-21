import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostsCard from './PostsCard';



const Posts=()=> {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [postsdata,setPostsData]=useState([]);
  const token=localStorage.getItem("token");
    const getposts=async()=>{
     const headers={
        "Content-Type": "application/json",
        token: token
      }
    try{
      const response= await axios.get(`${baseUrl}/personalData/posts`,{headers})
      console.log(response);
      setPostsData(response.data.posts)
    }catch(error){
      console.log(error);
    }
    }
    useEffect(()=>{
      getposts();
    },[])
    console.log(postsdata);
  return (
    <div>
    {postsdata.map((post, index) => (
        <PostsCard
          key={index}
          id={post._id}
          image={post.imageUrl}
          description={post.description}
        />
      ))}
    </div>
  )
}

export default Posts