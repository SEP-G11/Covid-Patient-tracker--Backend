const {login,forgotPassword,resetPassword} = require("../controllers/auth");
const express = require("express");
const router = express.Router();

/**
 * @description User login 
 * @URL http://localhost:8000/auth/login
 * @method POST
 */
router.post("/login", login);


/**
 * @description User forgot password, requesting new password  
 * @URL http://localhost:8000/auth/forgot-password
 * @method POST
 */
router.post("/forgot-password",forgotPassword);

/**
 * @description User reset password 
 * @URL http://localhost:8000/auth/reset-password
 * @method PUT
 */
router.put("/reset-password",resetPassword);

module.exports = router;
