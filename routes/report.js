const {createReport} = require("../controllers/report");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization');


router.post('/createReport/',protect,authorize(['DOC']),createReport);



module.exports = router;
