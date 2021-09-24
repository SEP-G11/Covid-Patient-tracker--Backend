const { Op } = require("sequelize");
const sequelize = require("../database/db");
var models = require("../service/init-models").initModels(sequelize);
const { successMessage, errorMessage } = require("../utils/message-template");
const Joi = require('joi');

var Allocation = models.Allocation;
var MedicalReport = models.MedicalReport;
var Patient = models.Patient;
var Bed = models.Bed;

function validateCreateReport(RATresult, bedId, date, bday, phonenumber) {

    schema = Joi.object({
        bday: Joi.string().required().label('Date of Birthday'),
        phonenumber: Joi.string().min(12).max(12).required().label('Contact Number'),
        RATresult: Joi.string().required().label('RAT Result'),
        bedId: Joi.string().required().label('Bed ID'),
        date: Joi.string().required().label(' Date'),

    });


    return schema.validate({ RATresult, bedId, date, bday, phonenumber })
}


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


    if (bday > new Date().toISOString().slice(0, 10)) {
        return errorMessage(res, "Please Check again Date of Birthday !", 422)
    }

    const { error, value } = validateCreateReport(RATresult, bedId, date, bday, phonenumber);


    if (error) {
        return errorMessage(res, error.details[0].message, 422)
    }
    if (await Allocation.findOne({where: {bed_no: value.bedId ,is_occupied:"1" }})){
        return errorMessage(res, "Bed has already Occupied", 422)
    }

    else if (!(await Patient.findOne({ where: { Patient_id: id } }))) {
        return errorMessage(res, "Patient is not Registered", 422)
    }
    else if ((await MedicalReport.findOne({where: {patient_id: id ,discharged_at:null }}))){
        return errorMessage(res, "Already have an active Medical Report for this Patient", 422)
    }
    try {
        const result = await sequelize.query(
            "select create_report(:id,:testId,:RATresult,:reportId,:bedId,:allocationId,:date, :description) as result",
            {
                replacements: {
                    id,
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
    const bed = await Bed.findOne({where: {id: allocation.id}})

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
    const bed = await Bed.findOne({where: {ward: req.body.ward} && {bed_no: req.body.bed_no}})

    report.symptoms = req.body.symptoms || report.symptoms
    report.admitted_at = req.body.admitted_at || report.admitted_at
    report.discharged_at = req.body.discharged_at || report.discharged_at
    report.description = req.body.description || report.description
    report.status = req.body.status || report.status


    try{
    const updatedReport = await report.save()
    const updatedBed = await bed.save()

    res.json({
        bed_no: updatedBed.bed_no,
        ward: updatedBed.ward,
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
