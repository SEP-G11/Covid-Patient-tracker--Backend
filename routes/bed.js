const {bedSearch,} = require("../controllers/bed");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();


router.get('/search/:facilityId',bedSearch);


module.exports = router;
