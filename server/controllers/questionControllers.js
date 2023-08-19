const questionControllers = {};

questionControllers.GetAllQuestions = (req, res) => {
  res.send("Get All Questions");
};

questionControllers.AddQuestion = (req, res) => {
  res.send("Add Question");
};

questionControllers.GetSingleQuestion = (req, res) => {
  res.send("Get Question By Its ID");
};

questionControllers.AddAnswer = (req, res) => {
  res.send("Add Answer to the id of Question");
};

questionControllers.EditVotes = (req, res) => {
  res.send("Edit The Votes of Answers");
};

questionControllers.EditVerification = (req, res) => {
  res.send("Edit Verification of Answer based on id");
};

module.exports = questionControllers;
