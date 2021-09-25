const {login,forgotPassword,resetPassword} = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.post("/login", login);

router.post("/forgot-password",forgotPassword)
router.put("/reset-password",resetPassword)

module.exports = router;
