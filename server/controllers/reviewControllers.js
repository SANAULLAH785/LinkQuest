const reviewControllers = {};

reviewControllers.getAllReviews = (req, res) => {
  res.send("Get All Reviews");
};

reviewControllers.AddReview = (req, res) => {
  res.send("Post A Review");
};

reviewControllers.AddCompanyAndItsReview = (req, res) => {
  res.send("Add A Company Then Its Review");
};

reviewControllers.EditVotes = (req, res) => {
  res.send("Edit The Votes of Reviews");
};
module.exports = reviewControllers;
