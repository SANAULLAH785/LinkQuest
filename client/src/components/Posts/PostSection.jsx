import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import { Box, Grid } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addNewPostHandler } from "../../Store/Slices/postSlice";
import { useNavigate } from "react-router-dom";
import { ApiCallGet } from "../Api/ApiCall";
import { toast } from "react-hot-toast";
import _ from "lodash";
import "./PostSection.scss";

const PostSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openPostModal = useSelector((state) => state.postState.postModalOpen);
  const userId = useSelector((state) => state.userState.id);
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getPosts = async (pageNumber) => {
    try {
      setIsLoading(true);
      const response = await ApiCallGet(`/posts?page=${pageNumber}`);
      const newPosts = response.data.posts;

      if (newPosts.length === 0) {
        return;
      }

      setPostData((prevPosts) => [...prevPosts, ...newPosts]);
      setPage(pageNumber + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const debouncedGetPosts = _.debounce(getPosts, 500);
  const handleScroll = () => {
    const scrollY = window.innerHeight + window.scrollY + 2000;
    const totalHeight = document.body.offsetHeight;
    if (scrollY >= totalHeight) {
      if (isLoading) {
        return;
      } else {
        setIsLoading(true);
        // getPosts(page);
        debouncedGetPosts(page);
      }
    }
  };

  useEffect(() => {
    getPosts(page);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [postData]);

  const addPostHanlder = () => {
    if (userId) {
      dispatch(addNewPostHandler(true));
    } else {
      toast.error("First log in to add post");
      navigate("/signin");
    }
  };

  return (
    <>
      {openPostModal ? <PostModal /> : ""}
      <Grid container spacing={2}>
        <Grid item md={12} className="">
          <Box className="searchbar">
            <Box className="search">
              <BsSearch size={15} />
            </Box>
            <input type="text" placeholder="Search" />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box className="button-section">
            <button onClick={() => addPostHanlder()}>Add Post</button>
          </Box>
        </Grid>
        <Grid item md={12}>
          {postData.map((post, index) => (
            <PostCard
              key={index}
              id={post._id}
              caption={post.caption}
              description={post.description}
              imageUrl={post.imageUrl}
              username={post.user ? post.user.name : "Unknown User"}
              date={post.date}
              avatar={post.user ? post.user.imageUrl : "default-avatar-url"}
              votes={post.votes}
              voters={post.voters}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default PostSection;
