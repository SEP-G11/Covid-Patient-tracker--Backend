const {login} = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.post("/login", login);
//router.get("/logout", authorization.tokenAuthorize, authController.logout);

module.exports = router;
