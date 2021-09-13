const {admitPatient,dischargePatient,transferPatient} = require("../controllers/patient");
const authorization = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();


router.post('/admit/',admitPatient);
router.post('/discharge/', dischargePatient);
router.post('/transfer/',transferPatient);

module.exports = router;
