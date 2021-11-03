const {getAllFacility,} = require("../controllers/facility");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();


const {protect,authorize} = require('../middlewares/authorization');


/**
* @description  Get all facility name
* @URL http://localhost:8000/facility/getAllFacility
* @method GET
*/
router.get('/getAllFacility/',protect,authorize(['HA' ,'DOC']),getAllFacility);


module.exports = router;
