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

questionControllers.EditVotes = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const voterIndex = question.voters.findIndex(
      (voter) => voter.user.toString() === req.userId
    );
    const currentVoteStatus = question.voters[voterIndex]?.voteStatus;
    const newVoteStatus = req.body.vote;
    if (voterIndex === -1) {
      const newVoteStatus = req.body.vote;

      if (newVoteStatus === "upvote") {
        question.votes += 1;
      } else if (newVoteStatus === "downvote") {
        question.votes -= 1;
      }

      question.voters.push({
        user: req.userId,
        voteStatus: newVoteStatus,
      });

      await question.save();

      return res.status(200).json({
        message: "Vote added successfully",
        question,
      });
    }

    if (newVoteStatus === currentVoteStatus) {
      return res
        .status(200)
        .json({ message: `Current vote status: ${currentVoteStatus}` });
    }

    if (newVoteStatus === "upvote") {
      if (currentVoteStatus === "downvote") {
        question.votes += 2;
      } else {
        question.votes += 1;
      }
      question.voters[voterIndex].voteStatus = "upvote";
    } else if (newVoteStatus === "downvote") {
      if (currentVoteStatus === "upvote") {
        question.votes -= 2;
      } else {
        question.votes -= 1;
      }
      question.voters[voterIndex].voteStatus = "downvote";
    } else if (newVoteStatus === "neutral") {
      if (currentVoteStatus === "upvote") {
        question.votes -= 1;
      } else if (currentVoteStatus === "downvote") {
        question.votes += 1;
      }
      question.voters.splice(voterIndex, 1);
    }

    await question.save();

    res.status(200).json({
      message: "Vote updated successfully",
      question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating votes" });
  }
};

questionControllers.EditVerification = async (req, res) => {
  try {
    const answerId = req.params.id;
    const verification = req.body.verification;

    const answer = await Answer.findById(answerId);
    answer.verified = verification;
    await answer.save();
    res.send({ message: "verfication has been updated", answer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = questionControllers;
