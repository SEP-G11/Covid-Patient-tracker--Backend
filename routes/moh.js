const {register,overallDistrictsStats,overallDistrictStats,overallCountryStats,historicalCases,historicalRecovered,
    historicalDeaths,historicalTests,getFacilities,getFacilitiesRecovered,getFacilitiesDeaths,getFacilitiesActive,getFacilitiesBeds,
    facilityHistorical} = require("../controllers/moh");
const {protect,authorize} = require('../middlewares/authorization')
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization')


router.post('/register',protect,authorize(['MOH']),register);


router.get('/districtStats',overallDistrictsStats);
router.get('/districtStats/:district',overallDistrictStats);
router.get('/countryStats',overallCountryStats);
router.get('/historical/cases',historicalCases);
router.get('/historical/recovered',historicalRecovered);
router.get('/historical/deaths',historicalDeaths);
router.get('/historical/tests',historicalTests);

router.get('/facilities',protect,authorize(['MOH']),getFacilities);
router.get('/facilities/recovered',protect,authorize(['MOH']),getFacilitiesRecovered);
router.get('/facilities/deaths',protect,authorize(['MOH']),getFacilitiesDeaths);
router.get('/facilities/active',protect,authorize(['MOH']),getFacilitiesActive);
router.get('/facilities/beds',protect,authorize(['MOH']),getFacilitiesBeds);
router.get('/facilities/historical',protect,authorize(['MOH']),facilityHistorical);

module.exports = router;
