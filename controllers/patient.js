const { Op } = require("sequelize");
const sequelize = require("../database/db");
var models = require("../service/init-models").initModels(sequelize);
const { successMessage, errorMessage } = require("../utils/message-template");


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
  } = req.body;

  
    try {
    const result = await sequelize.query(
      "select add_patient(:name,:id,:age,:gender,:address,:contactnumber,:bloodtype,:district,:testId,:isvaccinated,:RATresult,:medicalHistory,:reportId,:bedId,:allocationId,:admitDateTime) as result",
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
        },
      }
    );

    if (result[0][0]["result"] == 1) {
      return successMessage(res, result, "Patient successfully  Admited!", 201);
    } else {
      return errorMessage(res, "Patient successfully not Admited!", 404);
    }
  } catch (err) {
    return errorMessage(res, "Internal Server Error!", 500);
  }
};




const dischargePatient = async (req, res, next) => {

    const {
        patient_id,discharged_at,description,status
    } = req.body;
  
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



