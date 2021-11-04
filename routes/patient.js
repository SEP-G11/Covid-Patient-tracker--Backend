const {admitPatient,dischargePatient,transferPatient,getPatients,getPatientById,updatePatient,filterPatients} = require("../controllers/patient");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization');



/**
* @description  Admit  a new patient 
* @URL http://localhost:8000/patient/admit/
* @method POST
*/
router.post('/admit/',protect,authorize(['HA','DOC']),admitPatient);

/**
* @description  Discharge  patient 
* @URL http://localhost:8000/patient/discharge/
* @method POST
*/
router.post('/discharge/',protect,authorize(['HA','DOC']), dischargePatient);

/**
* @description  Transfer patient 
* @URL http://localhost:8000/patient/transfer/
* @method POST
*/
router.post('/transfer/',protect,authorize(['HA','DOC']),transferPatient);

/**
 * @description Get patient list 
 * @URL http://localhost:8000/patient/getPatients
 * @method GET
 */
router.get('/getPatients',protect,authorize(['HA','DOC']),getPatients);

/**
 * @description Get patient details by patient id 
 * @URL http://localhost:8000/patient/patientDetails/${id}
 * @method GET
 */
router.get('/patientDetails/:id',protect,authorize(['HA','DOC']),getPatientById);

/**
 * @description Update patient details 
 * @URL http://localhost:8000/patient/updatePatient/${patient.patient_id}
 * @method PUT
 */
router.put('/updatePatient/:id', protect,authorize(['HA','DOC']), updatePatient);

/**
 * @description Filter patients 
 * @URL http://localhost:8000/patient/filterPatients/${input}
 * @method GET
 */
router.get('/filterPatients/:input',protect,authorize(['HA','DOC']),filterPatients);



module.exports = router;
