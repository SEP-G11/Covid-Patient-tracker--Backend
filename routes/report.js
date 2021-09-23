const {createReport,getPatientReportById,updateReport} = require("../controllers/report");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization');


router.post('/createReport/',protect,authorize(['DOC']),createReport);
router.get('/patientReportDetails/:id', protect,authorize(['DOC']), getPatientReportById);
router.put('/updateReport/:id', protect,authorize(['DOC']), updateReport);


module.exports = router;
