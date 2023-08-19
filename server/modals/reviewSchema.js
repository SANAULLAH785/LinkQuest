const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  ratings: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  content: {
    type: String,
  },
  votes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
