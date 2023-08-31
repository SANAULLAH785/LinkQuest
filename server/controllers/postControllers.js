const Post = require("../modals/postSchema");
const Comment = require("../modals/commentSchema");
const Reply = require("../modals/replySchema");
const postControllers = {};

postControllers.GetAllPosts = async (req, res) => {
  try {
    console.log(req.query.page);
    const page = req.query.page || 1;
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / pageSize);

    const posts = await Post.find({})
      .populate({
        path: "user",
        select: "name imageUrl",
      })
      .sort({ date: -1 })
      .skip(startIndex)
      .limit(pageSize);

    res.status(200).json({ posts, totalPages });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
postControllers.GetSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      console.log("post not found");
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

postControllers.EditVotes = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const voterIndex = post.voters.findIndex(
      (voter) => voter.user.toString() === req.userId
    );
    const currentVoteStatus = post.voters[voterIndex]?.voteStatus;
    const newVoteStatus = req.body.vote;
    if (voterIndex === -1) {
      const newVoteStatus = req.body.vote;

      if (newVoteStatus === "upvote") {
        post.votes += 1;
      } else if (newVoteStatus === "downvote") {
        post.votes -= 1;
      }

      post.voters.push({
        user: req.userId,
        voteStatus: newVoteStatus,
      });

      await post.save();

      return res.status(200).json({
        message: "Vote added successfully",
        post,
      });
    }

    if (newVoteStatus === currentVoteStatus) {
      return res
        .status(200)
        .json({ message: `Current vote status: ${currentVoteStatus}` });
    }

    if (newVoteStatus === "upvote") {
      if (currentVoteStatus === "downvote") {
        post.votes += 2;
      } else {
        post.votes += 1;
      }
      post.voters[voterIndex].voteStatus = "upvote";
    } else if (newVoteStatus === "downvote") {
      if (currentVoteStatus === "upvote") {
        post.votes -= 2;
      } else {
        post.votes -= 1;
      }
      post.voters[voterIndex].voteStatus = "downvote";
    } else if (newVoteStatus === "neutral") {
      if (currentVoteStatus === "upvote") {
        post.votes -= 1;
      } else if (currentVoteStatus === "downvote") {
        post.votes += 1;
      }
      post.voters.splice(voterIndex, 1);
    }

    await post.save();

    res.status(200).json({
      message: "Vote updated successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating votes" });
  }
};
// post with image
postControllers.AddPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const newPost = new Post({
      caption: caption,
      imageUrl: req.imageUrl,
      user: req.userId,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
//textual posts
postControllers.AddTextPost = async (req, res) => {
  try {
    const { description } = req.body;
    const newPost = new Post({
      description: description,
      user: req.userId,
    });

    await newPost.save();
    res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
postControllers.DeletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
postControllers.EditPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { caption, description } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { caption, description },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

postControllers.GetComments = async (req, res) => {
  const postId = req.params.id;
  console.log(postId);

  try {
    const comments = await Comment.find({ post: postId }).populate(
      "user",
      "name imageUrl"
    );
    res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

postControllers.AddComment = async (req, res) => {
  try {
    const content = req.body.comment.commentInput;
    const userId = req.userId;
    const postId = req.params.id;

    const newComment = new Comment({
      user: userId,
      content: content,
      post: postId,
    });

    await newComment.save();

    res.status(200).json({ message: "Comment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding comment" });
  }
};

postControllers.GetReplies = async (req, res) => {
  const commentId = req.params.id;

  try {
    const replies = await Reply.find({ comment: commentId }).populate(
      "user",
      "name imageUrl"
    );

    res.status(200).json({ replies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

postControllers.AddReply = async (req, res) => {
  try {
    const content = req.body.comment.commentInput;
    const userId = req.userId;
    const commentId = req.params.id;

    const newReply = new Reply({
      user: userId,
      content: content,
      comment: commentId,
    });

    console.log(newReply);

    await newReply.save();

    await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: newReply._id },
    });

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding comment" });
  }
};

module.exports = postControllers;
