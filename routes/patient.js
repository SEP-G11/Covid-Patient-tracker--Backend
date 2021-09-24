const {admitPatient,dischargePatient,transferPatient,getPatients,getPatientById,updatePatient} = require("../controllers/patient");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization');



//router.post('/admit/',admitPatient);

router.post('/admit/',protect,authorize(['HA','DOC']),admitPatient);
router.post('/discharge/',protect,authorize(['HA','DOC']), dischargePatient);
router.post('/transfer/',protect,authorize(['HA','DOC']),transferPatient);
router.get('/getPatients',protect,authorize(['HA','DOC']),getPatients);
router.get('/patientDetails/:id',protect,authorize(['HA','DOC']),getPatientById);
router.put('/updatePatient/:id', protect,authorize(['HA','DOC']), updatePatient);



module.exports = router;
