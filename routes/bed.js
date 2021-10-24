const {bedSearch,} = require("../controllers/bed");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();


const {protect,authorize} = require('../middlewares/authorization');


 //router.get('/search/:facilityId',bedSearch);

router.get('/search/:facilityId',protect,authorize(['HA' ,'DOC']),bedSearch);


module.exports = router;
