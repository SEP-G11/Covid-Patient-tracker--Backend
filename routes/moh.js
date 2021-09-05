const {register,overallDistrictsStats,overallDistrictStats} = require("../controllers/moh");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();

router.post('/register', register);
//router.get("/logout", authorization.tokenAuthorize, authController.logout);

router.get('/districtStats',overallDistrictsStats);
router.get('/districtStats/:district',overallDistrictStats);

module.exports = router;
