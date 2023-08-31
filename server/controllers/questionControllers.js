const Question = require("../modals/questionSchema");
const Answer = require("../modals/answerSchema");

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

questionControllers.AddAnswer = async (req, res) => {
  try {
    const content = req.body.content;
    const userId = req.userId;
    const questionId = req.params.id;
    const newAnswer = new Answer({
      question: questionId,
      user: userId,
      content: content,
    });

    await newAnswer.save();

    await Question.findByIdAndUpdate(questionId, {
      $push: { answer: newAnswer._id },
    });

    res.send({ message: "Answer Added Successfully", newAnswer });
  } catch (error) {
    res.send(error.message);
  }
};

questionControllers.GetAnswers = async (req, res) => {
  try {
    const id = req.params.id;
    const answers = await Answer.find({ question: id })
      .populate({
        path: "user",
        select: "name imageUrl",
      })
      .sort({ date: -1 });
    res.status(200).json({ answers });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

questionControllers.EditVotes = (req, res) => {
  res.send("Edit The Votes of Answers");
};

questionControllers.EditVerification = (req, res) => {
  res.send("Edit Verification of Answer based on id");
};

module.exports = questionControllers;
