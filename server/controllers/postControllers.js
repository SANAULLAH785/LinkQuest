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

postControllers.AddPost = (req, res) => {
  res.send("Add Post");
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
