const {enterResult} = require("../controllers/test");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization');


router.post('/enter/',protect,authorize(['DOC','HA']),enterResult);



module.exports = router;
