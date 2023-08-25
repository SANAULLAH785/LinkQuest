const Post = require("../modals/postSchema");
const postControllers = {};

postControllers.GetAllPosts = async (req, res) => {
  try {
    const Posts = await Post.find({}).populate({
      path: "user",
      select: "name imageUrl",
    });
    res.status(200).json(Posts);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
postControllers.GetSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
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
    res.status(500).send("Internal server error");
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
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
postControllers.DeletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).send("Post not found");
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
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
    res.status(500).send("Internal server error");
  }
};

postControllers.GetComments = (req, res) => {
  res.send("Get Comments by the ID of Post");
};

postControllers.AddComment = (req, res) => {
  res.send("Add Comment Under Specific Post");
};

postControllers.GetReplies = (req, res) => {
  res.send("Get All Replied According to The ID of Comment");
};

postControllers.AddReply = (req, res) => {
  res.send("Add Reply Under Specific Comment");
};

module.exports = postControllers;
