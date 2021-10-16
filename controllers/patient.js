const { Op } = require("sequelize");
const { successMessage, errorMessage } = require("../utils/message-template");
const Joi = require('joi');
const {validateAdmitPatient,validateDischargePatient,validateTransferPatient} = require('../utils/validationSchemas/patientValidationSchemas');

const {Patient,Allocation,FacilityBed,sequelize} = require('../service/models');

const admitPatient = async (req, res, next) => {

const {
  name,
  id,
  age,
  gender,
  address,
  contactnumber,
  bloodtype,
  district,
  testId,
  isvaccinated,
  RATresult,
  medicalHistory,
  reportId,
  bedId,
  allocationId,
  admitDateTime,
  bday,
  Type_vaccine,
  Num_vaccine,

} = req.body;


const admitted_facility = req.facilityId;


if (bday > new Date().toISOString().slice(0, 10)) {
  return errorMessage(res, "Please Check again Date of Birthday !", 422)
}


const { error, value } = validateAdmitPatient(name,contactnumber,RATresult,admitDateTime,bday);
const d = new Date();

if (error) {
  return errorMessage(res, error.details[0].message, 422)
}

if (req.bedId==="no") {
  return errorMessage(res, "No free beds!", 422)
}


if (await Allocation.findOne({where: {bed_no: bedId ,is_occupied:"1" }})){
  return errorMessage(res, "Bed has already Occupied", 422)
}
  try {
  const result = await sequelize.query(
    "select add_patient(:name,:admitted_facility,:id,:age,:gender,:address,:contactnumber,:bloodtype,:district,:testId,:isvaccinated,:RATresult,:medicalHistory,:reportId,:bedId,:allocationId,:admitDateTime,:bday,:Type_vaccine ,:Num_vaccine) as result",
    {
      replacements: {
        name,
        admitted_facility,
        id,
        age,
        gender,
        address,
        contactnumber,
        bloodtype,
        district,
        testId,
        isvaccinated,
        RATresult,
        medicalHistory,
        reportId,
        bedId,
        allocationId,
        admitDateTime,
        bday,
        Type_vaccine,
        Num_vaccine
      },
    }
  );



  if (result[0][0]["result"] == 1) {
    return successMessage(res, result, "Patient successfully  Admited!", 201);
  } else {
    return errorMessage(res, "Patient  not Admited.Please Check again Details!", 404);
  }
} catch (err) {
  return errorMessage(res, "Internal Server Error!", 500);
}
};




const dischargePatient = async (req, res, next) => {

  const {
      patient_id,discharged_at,description,status
  } = req.body;

  const discharged_facility = req.facilityId;
  const { error } = validateDischargePatient(patient_id,discharged_at,status);

  if (error) {
    return errorMessage(res, error.details[0].message, 422)
}
    try {
    const result = await sequelize.query(
      "select discharge_patient(:patient_id,:discharged_facility,:discharged_at,:description,:status) as result",
      {
        replacements: {
          patient_id,discharged_facility,discharged_at,description,status
        },
      }
    );
   
    if (result[0][0]["result"] == 1) {
      return successMessage(res, result, "Patient successfully  Discharged!", 201);
    } else {
      return errorMessage(res, "Patient  not Discharged!", 404);
    }
  } catch (err) {
    return errorMessage(res, "Internal Server Error!", 500);
  }
};




const transferPatient = async (req, res, next) => {
const {
  patient_id, transfer_date ,   dest_bed_id
} = req.body;


const { error, } = validateTransferPatient(patient_id, transfer_date , dest_bed_id);

if (error) {
  return errorMessage(res, error.details[0].message, 422)
}

  try {
  const result = await sequelize.query(
    "select transfer_patient( :patient_id, :transfer_date , :dest_bed_id) as result",
    {
      replacements: {
        patient_id, transfer_date ,  dest_bed_id
      },
    }
  );


  if (result[0][0]["result"] == 1) {
    return successMessage(res, result, "Patient successfully  Transfered!", 201);
  } else {
    return errorMessage(res, "Patient  not Transfered!", 404);
  }
} catch (err) {
  return errorMessage(res, "Internal Server Error!", 500);
}
};

const getPatients = async (req, res, next) => {
  try{
    const facility_Id = req.facilityId
    const facilityBeds = await FacilityBed.findAll({where: {facilityId: facility_Id}})
    const allocations = await Allocation.findAll()
    const beds= []
    const patients = []
    for (let i = 0; i < allocations.length; i++) {
      beds.push(allocations[i].id)
    } 
    for (let j = 0; j < facilityBeds.length; j++) {
      if (beds.includes(''+facilityBeds[j].BedID)){
        const Id = facilityBeds[j].BedID
        const allocation = await Allocation.findOne({where: {id: Id}})
        if (allocation.is_occupied){
          const patient = await Patient.findOne({where: {patient_id: allocation.patient_id}})
          patients.push(patient)
        }
      }
    } 
    res.json(patients);
  } catch (err) {
    return errorMessage(res, "Internal Server Error!", 500);
  }
};

const getPatientById = async (req, res, next) => {
  try{
    const patient = await Patient.findByPk(req.params.id)
    if (patient.is_Vaccinated.toString()=="true"){
      patient.is_Vaccinated="Vaccinated"
    }else{
      patient.is_Vaccinated="Not Vaccinated"
    }
    res.json(patient)
  } catch (err) {
    return errorMessage(res, "Internal Server Error!", 500);
  }
}


const updatePatient = async (req, res, next) => {

  console.log("ss")
 if (req.body.is_Vaccinated.toString()=="Vaccinated"){
   req.body.is_Vaccinated="true"
 }else{
  req.body.is_Vaccinated="false"
 }
 if (req.body.contact_no.length>0){
  req.body.contact_no = req.body.contact_no.split("94").pop()
  if (req.body.contact_no.length != 10) {
    return errorMessage(res, "Please Check again Contact Number !", 422)
  }
 }
 try{
  const patient = await Patient.findByPk(req.params.id)
      patient.name = req.body.name || patient.name
      patient.age = req.body.age || patient.age
      patient.gender = req.body.gender || patient.gender
      patient.blood_type = req.body.blood_type || patient.blood_type
      patient.address = req.body.address || patient.address
      patient.contact_no = req.body.contact_no || patient.contact_no
      patient.district = req.body.district || patient.district
      patient.bday = req.body.bday || patient.bday
      patient.is_Vaccinated = req.body.is_Vaccinated || patient.is_Vaccinated

      const updatedPatient = await patient.save()

      if (updatedPatient.is_Vaccinated.toString()=="true"){
        updatedPatient.is_Vaccinated="Vaccinated"
      }else{
        updatedPatient.is_Vaccinated="Not Vaccinated"
      }

      res.json({
        name: updatedPatient.name,
        age: updatedPatient.age,
        blood_type: updatedPatient.blood_type,
        address: updatedPatient.address,
        contact_no: updatedPatient.contact_no,
        district: updatedPatient.district,
        gender: updatedPatient.gender,
        bday: updatedPatient.bday,
        is_Vaccinated:updatePatient.is_Vaccinated
      })

    } catch (err) {
      return errorMessage(res, "Internal Server Error!", 500);
    }
};

const filterPatients = async (req, res, next) => {
  try{
    const facility_Id = req.facilityId
    const facilityBeds = await FacilityBed.findAll({where: {facilityId: facility_Id}})
    const allocations = await Allocation.findAll()
    const beds= []
    const patients = []
    for (let i = 0; i < allocations.length; i++) {
      beds.push(allocations[i].id)
    } 
    for (let j = 0; j < facilityBeds.length; j++) {
      if (beds.includes(''+facilityBeds[j].BedID)){
        const Id = facilityBeds[j].BedID
        const allocation = await Allocation.findOne({where: {id: Id}})
        if (allocation.is_occupied){
          patients.push(allocation.patient_id)
        }
      }
    } 
    const filteredPatients = []
    const filteredBed = await Allocation.findOne({where: {id: req.params.input}})
    if (filteredBed){
      req.params.input = filteredBed.patient_id
    }
    const allPatients = await Patient.findAll({
      where: {
        [Op.or]: [{patient_id: req.params.input}, {name: req.params.input},
          {district: req.params.input}, {blood_type: req.params.input}, 
          {contact_no: req.params.input},{gender: req.params.input}]
      }
    });
    for (let k = 0; k < allPatients.length; k++) {
      if (patients.includes(allPatients[k].patient_id)){
        filteredPatients.push(allPatients[k])
      }
    }
    res.json(filteredPatients);
  } catch (err) {
    console.log(err.message)
    return errorMessage(res, "Internal Server Error!", 500);
  }
};

module.exports = {
  admitPatient, dischargePatient,transferPatient,getPatients,getPatientById,updatePatient,filterPatients
};



