const {enterResult,getTestDetailsById} = require("../controllers/test");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization');


router.post('/enter/',protect,authorize(['DOC','HA']),enterResult);
router.get('/testDetails/:id', protect,authorize(['DOC']),getTestDetailsById);


module.exports = router;
