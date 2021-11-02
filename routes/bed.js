const {bedSearch,} = require("../controllers/bed");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();


const {protect,authorize} = require('../middlewares/authorization');

/**
* @description  Search facilityId to get  beds details 
* @URL http://localhost:8000/bed/search/:facilityId
* @method GET
*/
router.get('/search/:facilityId',protect,authorize(['HA' ,'DOC']),bedSearch);


module.exports = router;
