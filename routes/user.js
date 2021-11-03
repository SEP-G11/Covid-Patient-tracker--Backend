const {getUserProfile,editUserProfile} = require("../controllers/user");
const express = require("express");
const router = express.Router();
const {protect} = require('../middlewares/authorization');

/**
 * @description Get user profile details 
 * @URL http://localhost:8000/user/profile
 * @method GET
 */
router.get("/profile",protect, getUserProfile);

/**
 * @description Update user profile details 
 * @URL http://localhost:8000/user/profile
 * @method PUT
 */
router.put("/profile",protect, editUserProfile);

module.exports = router;