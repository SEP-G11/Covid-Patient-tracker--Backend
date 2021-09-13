const express = require("express");
const router = express.Router()
const { getPatients, getPatientById, getPatientReportById, updatePatient, updatePatientReport } = require('../controllers/patient.js');

router.get('/getPatients', getPatients);
router.get('/patientDetails/:id', getPatientById);
router.get('/patientReportDetails/:id', getPatientReportById);
router.put('/updatePatient/:id', updatePatient);
router.put('/updatePatientReport/:id', updatePatientReport);

module.exports = router;

