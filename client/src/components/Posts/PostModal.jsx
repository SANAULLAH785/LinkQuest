import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { MdClose } from "react-icons/md";
import { setPostModalOpen } from "../../Store/Slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { parseISO, format, formatDistanceToNow } from "date-fns";
import { ApiCallGet } from "../Api/ApiCall";
import ReplyForm from "./ReplyForm";
import "./PostModal.scss";
import CommentForm from "./CommentForm";

const PostModal = () => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postState.selectedPost);
  const postId = postData.id;
  const [reFetchComments, setReFetchComment] = useState(1);
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [replyLoadCommentId, setReplyLoadCommentId] = useState(null);
  const [replyData, setReplyData] = useState({});
  const [repliesData, setRepliesData] = useState([]);

  const [commentData, setCommentData] = useState([]);

  const loadReplies = async (commentId) => {
    setReplyLoadCommentId(commentId);
    setReplyCommentId(commentId);
    try {
      const response = await ApiCallGet(`/post/comment/replies/${commentId}`);
      setRepliesData(response.data.replies);
    } catch (error) {
      console.log(error);
    }
  };

  const replyHandler = (commentId, commenter) => {
    setReplyCommentId(commentId);
    setReplyData({ commentId: commentId, commentUserName: commenter });
  };
  // setCommentData(response.data);

  const getComments = async () => {
    try {
      const response = await ApiCallGet(`/post/comments/${postId}`);
      console.log(response.data.comments);
      setCommentData(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postId) {
      getComments();
    }
  }, [postId, reFetchComments]);

  const dateString = postData.date;
  const dateObject = parseISO(dateString);
  const formattedDate = format(dateObject, "dd MMMM 'at' hh:mm a");
  console.log(commentData);
  return (
    <>
      <Box
        className="closing-container"
        onClick={() => dispatch(setPostModalOpen(false))}
      ></Box>
      <Box className="main-container">
        <Box className="post-container">
          <Box className="image-container">
            {postData.imageUrl ? (
              <img src={postData.imageUrl} alt="" />
            ) : (
              <Box className="description-container">
                <p className="description-container-paragrap">
                  {postData.description}
                </p>
              </Box>
            )}
          </Box>

          <Box className="content-container">
            <Box className="post-header">
              <Box className="profile-section">
                <img src={postData.avatar} alt="" />
                <Box className="date-section">
                  <p className="username">{postData.username}</p>
                  <p className="date">{formattedDate}</p>
                </Box>
              </Box>
              <span
                className="icon-wrapper"
                onClick={() => dispatch(setPostModalOpen(false))}
              >
                <MdClose size={25} />
              </span>
            </Box>
            <Box className="comment-section">
              {commentData.length === 0 ? (
                <Box className="be-the-first">
                  <p>Be the first to comment on this Post</p>
                </Box>
              ) : (
                <>
                  {commentData.map((comment, index) => {
                    const timeAgo = formatDistanceToNow(
                      new Date(comment.date),
                      {
                        addSuffix: true,
                      }
                    );
                    return (
                      <Box className="comment-container" key={index}>
                        <Box className="comment">
                          <img src={comment.user.imageUrl} alt="" />
                          <Box className="content">
                            <Box>
                              <p className="userName">{comment.user.name}</p>
                              <p className="text">{comment.content}</p>
                            </Box>
                            <Box className="footer">
                              <p className="date-ago">{timeAgo}</p>
                              <p
                                className="reply"
                                onClick={() =>
                                  replyHandler(comment._id, comment.user.name)
                                }
                              >
                                Reply
                              </p>
                            </Box>
                          </Box>
                        </Box>
                        <Box className="replies-section">
                          {comment.replies.length !== 0 &&
                          replyLoadCommentId !== comment._id ? (
                            <p
                              className="load-more-comments"
                              onClick={() => loadReplies(comment._id)}
                            >
                              Load More Comments
                            </p>
                          ) : (
                            ""
                          )}
                          {replyLoadCommentId === comment._id && (
                            <Box>
                              {repliesData.map((reply, index) => {
                                const replyTimeAgo = formatDistanceToNow(
                                  new Date(reply.date),
                                  {
                                    addSuffix: true,
                                  }
                                );
                                return (
                                  <Box className="comment" key={index}>
                                    <img src={reply.user.imageUrl} alt="" />
                                    <Box className="content">
                                      <Box>
                                        <p className="userName">
                                          {reply.user.name}
                                        </p>
                                        <p className="text">{reply.content}</p>
                                      </Box>
                                      <Box className="footer">
                                        <p className="date-ago">
                                          {replyTimeAgo}
                                        </p>
                                      </Box>
                                    </Box>
                                  </Box>
                                );
                              })}
                            </Box>
                          )}
                        </Box>
                        {replyCommentId === comment._id && (
                          <ReplyForm
                            commentId={comment._id}
                            commentUserName={comment.user.name}
                            loadReplies={loadReplies}
                          />
                        )}
                      </Box>
                    );
                  })}
                </>
              )}
            </Box>
            <Box className="add-comment-section">
              <CommentForm
                setReFetchComment={setReFetchComment}
                reFetchComments={reFetchComments}
                postId={postId}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PostModal;
