const Message = require("../modals/messageSchema");
const User = require("../modals/userSchema");

const messageControllers = {};

messageControllers.getMessages = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params.id;

    const messages = await Message.find({
      sender: { $in: [sender, receiver] },
      receiver: { $in: [sender, receiver] },
    }).sort({ date: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

messageControllers.getContacts = async (req, res) => {
  try {
    const sender = req.userId;

    const contacts = await User.findById(sender)
      .populate({
        path: "contacts",
        select: "name imageUrl",
      })
      .select("contacts")
      .exec();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = messageControllers;
