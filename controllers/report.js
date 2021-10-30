const { successMessage, errorMessage } = require("../utils/message-template");

const {Bed,Patient,MedicalReport,Allocation,sequelize} = require('../service/models');
const {validateCreateReport} = require('../utils/validationSchemas/reportValidationSchemas');


const createReport = async (req, res, next) => {
    const {
        id,
        testId,
        RATresult,
        reportId,
        bedId,
        allocationId,
        date,
        phonenumber,
        bday,
        description
    } = req.body;


    const admitted_facility = req.facilityId;

    if (bday > new Date().toISOString().slice(0, 10)) {
        return errorMessage(res, "Please Check again Date of Birthday !", 422)
    }

    const { error, value } = validateCreateReport(RATresult,  date, bday, phonenumber);

    if (req.bedId==="no") {
        return errorMessage(res, "No free beds!", 422)
      }
      

    if (error) {
        return errorMessage(res, error.details[0].message, 422)
    }

    
    try {
        if (await Allocation.findOne({where: {bed_no: bedId ,is_occupied:"1" }})){
            return errorMessage(res, "Bed has already Occupied", 422)
        }
    
        else if (!(await Patient.findOne({ where: { Patient_id: id } }))) {
            return errorMessage(res, "Patient is not Registered", 422)
        }
        else if ((await MedicalReport.findOne({where: {patient_id: id ,discharged_at:null }}))){
            return errorMessage(res, "Already have an active Medical Report for this Patient", 422)
        }
        const result = await sequelize.query(
            "select create_report(:id,:admitted_facility,:testId,:RATresult,:reportId,:bedId,:allocationId,:date, :description) as result",
            {
                replacements: {
                    id,
                    admitted_facility,
                    testId,
                    RATresult,
                    reportId,
                    bedId,
                    allocationId,
                    date,
                    description
                },
            }
        );
       
        if (result[0][0]["result"] == 1) {
            return successMessage(res, result, "Report successfully  Created!", 201);
        } else {
            return errorMessage(res, "Report successfully not  Created!.Please Check again Details!", 404);
        }
    } catch (err) {
        return errorMessage(res, "Internal Server Error!", 500);
    }
};

const getPatientReportById = async (req, res, next) => {


    const report = await MedicalReport.findOne({where: {patient_id: req.params.id}})

    const allocation = await Allocation.findOne({where: {patient_id: req.params.id}})
    const bed = await Bed.findOne({where: {id: allocation.bed_no}})

    try{
    res.json({
        report_id:report.report_id,
        patient_id:report.patient_id,
        symptoms:report.symptoms,
        admitted_at:report.admitted_at,
        discharged_at:report.discharged_at,
        description:report.description,
        status:report.status,
        bed_no:bed.bed_no,
        ward:bed.ward
    })
} catch (err) {
    return errorMessage(res, "Internal Server Error!", 500);
}

}

const updateReport = async (req, res, next) => {

    const report = await MedicalReport.findOne({where: {patient_id: req.params.id}})
    
    report.symptoms = req.body.symptoms || report.symptoms
    report.admitted_at = req.body.admitted_at || report.admitted_at
    report.discharged_at = req.body.discharged_at || report.discharged_at
    report.description = req.body.description || report.description
    report.status = req.body.status || report.status


    try{
    const updatedReport = await report.save()

    res.json({
        symptoms: updatedReport.symptoms,
        admitted_at: updatedReport.admitted_at,
        discharged_at: updatedReport.discharged_at,
        description: updatedReport.description,
        status: updatedReport.status,
    })

    } catch (err) {
        return errorMessage(res, "Internal Server Error!", 500);
    }
};


module.exports = {
    createReport,getPatientReportById,updateReport
};
