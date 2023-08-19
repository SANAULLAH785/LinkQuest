const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  votes: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: String,
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
