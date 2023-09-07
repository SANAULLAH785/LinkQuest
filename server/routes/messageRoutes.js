const { Router } = require("express");
const router = Router();
const messageControllers = require("../controllers/messageController");
const auth = require("../middlewares/auth");

router.get("/messages/:id", auth, messageControllers.getMessages);
router.get("/getChatContacts", auth, messageControllers.getContacts);

module.exports = router;
