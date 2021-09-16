const {register,overallDistrictsStats,overallDistrictStats,overallCountryStats,historicalCases,historicalRecovered,
    historicalDeaths,historicalTests,getFacilities} = require("../controllers/moh");
//const {protect} = require('../middlewares/authorization');
const {protect,authorize} = require('../middlewares/authorization')
const express = require("express");
const router = express.Router();

router.post('/register',protect,authorize(['MOH']),register);
//router.get("/logout", authorization.tokenAuthorize, authController.logout);

router.get('/districtStats',overallDistrictsStats);
router.get('/districtStats/:district',overallDistrictStats);
router.get('/countryStats',overallCountryStats);
router.get('/historical/cases',historicalCases);
router.get('/historical/recovered',historicalRecovered);
router.get('/historical/deaths',historicalDeaths);
router.get('/historical/tests',historicalTests);

router.get('/facilities',getFacilities);

module.exports = router;
