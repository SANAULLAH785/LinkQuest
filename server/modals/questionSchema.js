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
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  imageUrl: String,
  votes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
