const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  caption: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  votes: {
    type: Number,
    default: 0,
  },
  voters: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      voteStatus: {
        type: String,
        default: "neutral",
      },
    },
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

postSchema.index({ voters: 1 });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
