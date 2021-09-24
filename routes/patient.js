const {admitPatient,dischargePatient,transferPatient} = require("../controllers/patient");
const express = require("express");
const router = express.Router();
const {protect,authorize} = require('../middlewares/authorization');



//router.post('/admit/',admitPatient);

router.post('/admit/',protect,authorize(['HA','DOC']),admitPatient);
router.post('/discharge/',protect,authorize(['HA','DOC']), dischargePatient);
router.post('/transfer/',protect,authorize(['HA','DOC']),transferPatient);



module.exports = router;
