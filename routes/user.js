const router = require('express').Router();
const {createUser,loginUser,getUserProfile}=require("../controller/userController")
const {checkToken}=require("../auth/token_validation")

router.post('/signup',createUser );
router.post('/signin',loginUser );

router.get('/profile',checkToken,getUserProfile);

module.exports=router;