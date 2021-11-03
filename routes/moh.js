const {register,overallDistrictsStats,overallDistrictStats,overallCountryStats,historicalCases,historicalRecovered,
    historicalDeaths,historicalTests,getFacilities,getFacilitiesRecovered,getFacilitiesDeaths,getFacilitiesActive,getFacilitiesBeds,
    facilityHistorical} = require("../controllers/moh");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization');

/**
 * @description MOH Admin register new user
 * @URL http://localhost:8000/moh/register
 * @method PUT
 */
router.post('/register',protect,authorize(['MOH']),register);


/**
 * @description Get statistics of all districts
 * @URL http://localhost:8000/moh/districtStats
 * @method GET
 */
router.get('/districtStats',overallDistrictsStats);

/**
 * @description Get statistics of a specific district
 * @URL http://localhost:8000/moh/districtStats/:district
 * @method GET
 */
router.get('/districtStats/:district',overallDistrictStats);

/**
 * @description Get statistics of the country
 * @URL http://localhost:8000/moh/countryStats
 * @method GET
 */
router.get('/countryStats',overallCountryStats);

/**
 * @description Get historical number of island-wide cases for last n days
 * @URL http://localhost:8000/moh/historical/cases
 * @method GET
 * @optionalParams lastDays: Number
 */
router.get('/historical/cases',historicalCases);

/**
 * @description Get historical number of island-wide recovered for last n days
 * @URL http://localhost:8000/moh/historical/recovered
 * @method GET
 * @optionalParams lastDays: Number
 */
router.get('/historical/recovered',historicalRecovered);

/**
 * @description Get historical number of island-wide deaths for last n days
 * @URL http://localhost:8000/moh/historical/deaths
 * @method GET
 * @optionalParams lastDays: Number
 */
router.get('/historical/deaths',historicalDeaths);

/**
 * @description Get historical number of island-wide PCR and RAT tests for last n days
 * @URL http://localhost:8000/moh/historical/tests
 * @method GET
 * @optionalParams lastDays: Number
 */
router.get('/historical/tests',historicalTests);


/**
 * @description Get list of facilities
 * @URL http://localhost:8000/moh/facilities
 * @method GET
 */
router.get('/facilities',protect,authorize(['MOH']),getFacilities);

/**
 * @description Get all facilities/single facility recovered count
 * @URL http://localhost:8000/moh/facilities/recovered
 * @method GET
 * @optionalParams facility: Number
 */
router.get('/facilities/recovered',protect,authorize(['MOH']),getFacilitiesRecovered);

/**
 * @description Get all facilities/single facility deaths count
 * @URL http://localhost:8000/moh/facilities/deaths
 * @method GET
 * @optionalParams facility: Number
 */
router.get('/facilities/deaths',protect,authorize(['MOH']),getFacilitiesDeaths);

/**
 * @description Get all facilities/single facility active count
 * @URL http://localhost:8000/moh/facilities/active
 * @method GET
 * @optionalParams facility: Number
 */
router.get('/facilities/active',protect,authorize(['MOH']),getFacilitiesActive);

/**
 * @description Get all facilities beds count
 * @URL http://localhost:8000/moh/facilities/beds
 * @method GET
 */
router.get('/facilities/beds',protect,authorize(['MOH']),getFacilitiesBeds);

/**
 * @description Get a facility's historical cases/deaths/recovered over last n days
 * @URL http://localhost:8000/moh/facilities/historical
 * @method GET
 * @optionalParams facility: Number, lastDays: Number, type: String
 */
router.get('/facilities/historical',protect,authorize(['MOH']),facilityHistorical);

module.exports = router;
