const { compact } = require('lodash');
const sequelize = require('../database/db');
var models = require("../service/init-models").initModels(sequelize);

var Patient = models.Patient;
var MedicalReport = models.MedicalReport;

const getPatients = async (req, res, next) => {
    const patients = await Patient.findAll();
    res.json(patients);
}

const getPatientById = async (req, res, next) => {
    const patient = await Patient.findByPk(req.params.id)
    res.json(patient)
}

const getPatientReportById = async (req, res, next) => {
  const report = await MedicalReport.findOne({where: {patient_id: req.params.id}})
  res.json(report)
}

const updatePatient = async (req, res, next) => {
    const patient = await Patient.findByPk(req.params.id)
  
    if (patient) {
        patient.name = req.body.name || patient.name
        patient.age = req.body.age || patient.age
        patient.blood_type = req.body.blood_type || patient.blood_type
        patient.address = req.body.address || patient.address
        patient.contact_no = req.body.contact_no || patient.contact_no
  
      const updatedPatient = await patient.save()
  
      res.json({
        name: updatedPatient.name,
        age: updatedPatient.age,
        blood_type: updatedPatient.blood_type,
        address: updatedPatient.address,
        contact_no: updatedPatient.contact_no,
      })
    } else {
      res.status(404)
      throw new Error('Patient not found')
    }
};

const updatePatientReport = async (req, res, next) => {
  const report = await MedicalReport.findOne({where: {patient_id: req.params.id}})

  if (report) {
      report.symptoms = req.body.symptoms || report.symptoms
      report.admitted_at = req.body.admitted_at || report.admitted_at
      report.discharged_at = req.body.discharged_at || report.discharged_at
      report.description = req.body.description || report.description
      report.status = req.body.status || report.status

    const updatedReport = await report.save()

    res.json({
      symptoms: updatedReport.symptoms,
      admitted_at: updatedReport.admitted_at,
      discharged_at: updatedReport.discharged_at,
      description: updatedReport.description,
      status: updatedReport.status,
    })
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
};
  

module.exports = { getPatients , getPatientById , updatePatient , getPatientReportById , updatePatientReport };
  
