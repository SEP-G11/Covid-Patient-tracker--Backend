const {login} = require("../controllers/auth");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();

router.post("/login", login);
//router.get("/logout", authorization.tokenAuthorize, authController.logout);

module.exports = router;
