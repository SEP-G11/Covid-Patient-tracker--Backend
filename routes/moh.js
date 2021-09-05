const {register,overallDistrictsStats,overallDistrictStats,overallCountryStats} = require("../controllers/moh");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();

router.post('/register', register);
//router.get("/logout", authorization.tokenAuthorize, authController.logout);

router.get('/districtStats',overallDistrictsStats);
router.get('/districtStats/:district',overallDistrictStats);
router.get('/countryStats',overallCountryStats);

module.exports = router;
