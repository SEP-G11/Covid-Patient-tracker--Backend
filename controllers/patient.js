const { Op } = require("sequelize");
const sequelize = require("../database/db");
var models = require("../service/init-models").initModels(sequelize);
const { successMessage, errorMessage } = require("../utils/message-template");
const Joi = require('joi');

var Allocation = models.Allocation;


function validateAdmitPatient(name,contactnumber,RATresult,bedId,admitDateTime,bday) {
  
  
    schema = Joi.object({
      name: Joi.string().trim().max(255).required().label('Name'),
      bday : Joi.string().required().label('Date of Birthday') ,
    
      contactnumber: Joi.string().min(12).max(12).required().label('Contact Number'),    
      RATresult: Joi.string().required().label('RAT Result'),
      bedId: Joi.string().required().label('Bed ID'),    
      admitDateTime: Joi.string().required().label('Admit Date'),
      
    });
  

 
  
  return schema.validate({ name:name,bday:bday,contactnumber:contactnumber,RATresult:RATresult,bedId:bedId,admitDateTime:admitDateTime })
}




function validateDischargePatient(patient_id,discharged_at,status) {
 
 
  const schema = Joi.object({
    patient_id: Joi.string().required().label('Patient Id'),  
    status: Joi.string().required().label('Status'),    
    discharged_at: Joi.string().required().label('Discharge Date'),
     
   });

 
 return schema.validate({patient_id: patient_id,discharged_at : discharged_at,status :status })
}


function validateTransferPatient(patient_id, transfer_date ,  origin_bed_id,  dest_bed_id) {
 
 
  const schema = Joi.object({
    patient_id: Joi.string().required().label('Patient Id'),  
    origin_bed_id: Joi.number().required().label('Origin Bed Id'),    
    dest_bed_id: Joi.number().required().label('Destination Bed Id'),    
    transfer_date: Joi.string().required().label('Transfer Date'),
     
   });

 
 return schema.validate({patient_id: patient_id,transfer_date : transfer_date,origin_bed_id :origin_bed_id, dest_bed_id:dest_bed_id})
}

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
  } = req.body;

  if (bday > new Date().toISOString().slice(0, 10)) {
    return errorMessage(res, "Please Check again Date of Birthday !", 422)
  }

  const { error, value } = validateAdmitPatient(name,contactnumber,RATresult,bedId,admitDateTime,bday);
  const d = new Date();

  if (error) {
    return errorMessage(res, error.details[0].message, 422)
}



if (await Allocation.findOne({where: {bed_no: value.bedId ,is_occupied:"1" }})){
    return errorMessage(res, "Bed has already Occupied", 422)
}
    try {
    const result = await sequelize.query(
      "select add_patient(:name,:id,:age,:gender,:address,:contactnumber,:bloodtype,:district,:testId,:isvaccinated,:RATresult,:medicalHistory,:reportId,:bedId,:allocationId,:admitDateTime,:bday) as result",
      {
        replacements: {
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
        },
      }
    );

  

    if (result[0][0]["result"] == 1) {
      return successMessage(res, result, "Patient successfully  Admited!", 201);
    } else {
      return errorMessage(res, "Patient successfully not Admited.Please Check again Details!", 404);
    }
  } catch (err) {
    return errorMessage(res, "Internal Server Error!", 500);
  }
};




const dischargePatient = async (req, res, next) => {

    const {
        patient_id,discharged_at,description,status
    } = req.body;

    const { error } = validateDischargePatient(patient_id,discharged_at,status);

    if (error) {
      return errorMessage(res, error.details[0].message, 422)
  }
      try {
      const result = await sequelize.query(
        "select discharge_patient(:patient_id,:discharged_at,:description,:status) as result",
        {
          replacements: {
            patient_id,discharged_at,description,status
          },
        }
      );
  
      if (result[0][0]["result"] == 1) {
        return successMessage(res, result, "Patient successfully  Discharged!", 201);
      } else {
        return errorMessage(res, "Patient successfully not Discharged!", 404);
      }
    } catch (err) {
      return errorMessage(res, "Internal Server Error!", 500);
    }
  };



  
const transferPatient = async (req, res, next) => {
  const {
    patient_id, transfer_date ,  origin_bed_id,  dest_bed_id
  } = req.body;

  const { error, } = validateTransferPatient(patient_id, transfer_date ,  origin_bed_id,  dest_bed_id);
  

  if (error) {
    return errorMessage(res, error.details[0].message, 422)
}


    try {
    const result = await sequelize.query(
      "select transfer_patient( :patient_id, :transfer_date ,  :origin_bed_id,  :dest_bed_id) as result",
      {
        replacements: {
          patient_id, transfer_date ,  origin_bed_id,  dest_bed_id
        },
      }
    );

    if (result[0][0]["result"] == 1) {
      return successMessage(res, result, "Patient successfully  Transfered!", 201);
    } else {
      return errorMessage(res, "Patient successfully not Transfered!", 404);
    }
  } catch (err) {
    return errorMessage(res, "Internal Server Error!", 500);
  }
};


module.exports = {
  admitPatient, dischargePatient,transferPatient
};



