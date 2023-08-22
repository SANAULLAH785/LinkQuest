const { Router } = require("express");
const router = Router();
const postControllers = require("../controllers/postControllers");
const auth =require('../middlewares/auth');
const imagesaver= require('../middlewares/imageSaver');

router.get("/posts", postControllers.GetAllPosts);

router.get("/post/:id", postControllers.GetSinglePost);

router.put("/post/:id", postControllers.EditVotes);

router.post("/post",auth,imagesaver, postControllers.AddPost);

router.get("/post/comments", postControllers.GetComments);

router.post("/post/comment", postControllers.AddComment);

router.get("/post/comment/replies", postControllers.GetReplies);

router.post("/post/comment/reply", postControllers.AddReply);

module.exports = router;
