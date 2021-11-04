const {createReport,getPatientReportById,updateReport} = require("../controllers/report");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization');


/**
* @description  Create  medical report  
* @URL http://localhost:8000/report /createReport
* @method POST
*/
router.post('/createReport/',protect,authorize(['DOC']),createReport);

/**
 * @description Get patient report details by patient id 
 * @URL http://localhost:8000/report/patientReportDetails/${id}
 * @method GET
 */
router.get('/patientReportDetails/:id', protect,authorize(['DOC']), getPatientReportById);

/**
 * @description Update patient report details 
 * @URL http://localhost:8000/report/updateReport/${report.patient_id}
 * @method PUT
 */
router.put('/updateReport/:id', protect,authorize(['DOC']), updateReport);


module.exports = router;
