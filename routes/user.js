const {getUserProfile,editUserProfile} = require("../controllers/user");
const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/authorization');

router.get("/profile",protect, getUserProfile);
router.put("/profile",protect, editUserProfile);

module.exports = router;