const Question = require("../modals/questionSchema");

const questionControllers = {};

questionControllers.GetAllQuestions = async (req, res) => {
  try {
    const Questions = await Question.find({})
      .populate({
        path: "user",
        select: "name imageUrl",
      })
      .sort({ date: -1 });
    res.status(200).json({ Questions });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

questionControllers.AddQuestion = async (req, res) => {
  try {
    const title = req.body.title;
    const imageUrl = req.imageUrl || null;
    const content = req.body.content;
    const tags = req.body.tags.split(",").map((tag) => tag.trim());
    const userId = req.userId;

    const newQuestion = new Question({
      user: userId,
      title: title,
      content: content,
      imageUrl: imageUrl,
      tags: tags,
    });

    await newQuestion.save();

    res
      .status(201)
      .json({ message: "Question added Successfully", question: newQuestion });
  } catch (error) {
    res.send(error.message);
  }
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
