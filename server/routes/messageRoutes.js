const express = require("express");
const { sendMesssge } = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, sendMesssge);
// router.route("/:chatId").get(protect, allMessages);

module.exports = router