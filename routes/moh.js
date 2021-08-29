const {register} = require("../controllers/moh");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();

router.post("/register", register);
//router.get("/logout", authorization.tokenAuthorize, authController.logout);

module.exports = router;
