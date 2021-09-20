const {register,overallDistrictsStats,overallDistrictStats,overallCountryStats,historicalCases,historicalRecovered,historicalDeaths} = require("../controllers/moh");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization')

// router.post('/register', register);
//router.get("/logout", authorization.tokenAuthorize, authController.logout);
router.post('/register',protect,authorize(['MOH']),register);


router.get('/districtStats',overallDistrictsStats);
router.get('/districtStats/:district',overallDistrictStats);
router.get('/countryStats',overallCountryStats);
router.get('/historical/cases/:lastDays',historicalCases);
router.get('/historical/recovered/:lastDays',historicalRecovered);
router.get('/historical/deaths/:lastDays',historicalDeaths);


module.exports = router;
