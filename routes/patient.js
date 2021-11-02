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


router.get('/getPatients',protect,authorize(['HA','DOC']),getPatients);
router.get('/filterPatients/:input',protect,authorize(['HA','DOC']),filterPatients);
router.get('/patientDetails/:id',protect,authorize(['HA','DOC']),getPatientById);
router.put('/updatePatient/:id', protect,authorize(['HA','DOC']), updatePatient);



module.exports = router;
