const { Router } = require("express");
const router = Router();

const authRoutes = require("./authRoutes");
const companyRoutes = require("./companyRoutes");
const postRoutes = require("./postRoutes");
const profileRoutes = require("./profileRoutes");
const questionRoutes = require("./questionRoutes");
const reviewRoutes = require("./reviewsRoutes");
const messageRoutes = require("./messageRoutes");

router.use(authRoutes);
router.use(companyRoutes);
router.use(postRoutes);
router.use(profileRoutes);
router.use(questionRoutes);
router.use(reviewRoutes);
router.use(messageRoutes);

module.exports = router;
