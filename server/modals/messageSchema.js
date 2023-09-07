const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.index({ sender: 1, receiver: 1 });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
