const {register,overallDistrictsStats,overallDistrictStats,overallCountryStats,historicalCases,historicalRecovered,
    historicalDeaths,historicalTests} = require("../controllers/moh");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();

router.post('/register', register);
//router.get("/logout", authorization.tokenAuthorize, authController.logout);

router.get('/districtStats',overallDistrictsStats);
router.get('/districtStats/:district',overallDistrictStats);
router.get('/countryStats',overallCountryStats);
router.get('/historical/cases',historicalCases);
router.get('/historical/recovered',historicalRecovered);
router.get('/historical/deaths',historicalDeaths);
router.get('/historical/tests',historicalTests);

module.exports = router;
