const {getAllFacility,} = require("../controllers/facility");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();


const {protect,authorize} = require('../middlewares/authorization');


// router.get('/search/:facilityId',bedSearch);

router.get('/getAllFacility/',protect,authorize(['HA' ,'DOC']),getAllFacility);


module.exports = router;
