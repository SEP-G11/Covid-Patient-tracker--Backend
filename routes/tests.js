const {enterResult,getTestDetailsById} = require("../controllers/tests");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization');

/**
* @description  Enter  test results 
* @URL http://localhost:8000/test/enter/
* @method POST
*/
router.post('/enter/',protect,authorize(['DOC','HA']),enterResult);
router.get('/testDetails/:id', protect,authorize(['DOC']),getTestDetailsById);


module.exports = router;
