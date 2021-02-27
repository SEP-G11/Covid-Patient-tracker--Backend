const router = require("express").Router();
const {
  createUser,
  loginUser,
  getUserProfile,
  editUserProfile,
  changePassword,
  submitNbooking,
  deleteUser,
} = require("../controller/userController");
const { checkToken, setUserIfLoggedIn } = require("../auth/token_validation");
const uploadFileMiddleware = require("../middlewares/uploadImage");

router.post("/signup", createUser);
router.post("/signin", loginUser);

router.get("/profile", checkToken, getUserProfile);

router.post(
  "/editprofile",
  checkToken,
  setUserIfLoggedIn,
  uploadFileMiddleware,
  editUserProfile
);
router.post("/changepassword", checkToken, setUserIfLoggedIn, changePassword);

router.post("/bookseat", setUserIfLoggedIn, submitNbooking);

router.post("/deleteAccount", setUserIfLoggedIn, deleteUser);

module.exports = router;
