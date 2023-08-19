const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  content: {
    type: String,
    required: true,
  },
  imageUrl: String,
  votes: {
    type: Number,
    default: 0,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
