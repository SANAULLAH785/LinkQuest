const Post=require('../modals/postSchema');
const postControllers = {};

postControllers.GetAllPosts = (req, res) => {
  res.send("Get All Posts");
};

postControllers.GetSinglePost = (req, res) => {
  res.send("Get Signle Post");
};

postControllers.EditVotes = (req, res) => {
  res.send("Get Votes of Post");
};
// post with image
postControllers.AddPost = async(req, res) => {
  try {
    const { caption } = req.body;
    const newPost = new Post({
      caption: caption,
      imageUrl: req.imageUrl, 
      user: req.userId, 
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
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
