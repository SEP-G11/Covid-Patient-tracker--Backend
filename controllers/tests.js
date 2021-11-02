
const { successMessage, errorMessage } = require("../utils/message-template");
const { sendSMS } = require("../utils/sms");

const {Patient,MedicalReport,Test,sequelize} = require('../service/models');
const {validateEnterResult} = require('../utils/validationSchemas/testsValidationSchemas');

/**
* Enter test results 
* 
* @param {object} req - http request
* @param {object} res - http response
* @return {Response} [{ result :1, massage : "Successfully  enter "  }]
*/
const enterResult = async (req, res, next) => {
    const {
        testId,
        id,
        date,
        testType,
        RATresult   
    } = req.body;

    const { error, value } = validateEnterResult(id, RATresult, testType, date);

    if (error) {
        return errorMessage(res, error.details[0].message, 422)
    }

    if (!(await MedicalReport.findOne({where: {patient_id: value.id ,discharged_at:null }}))){
        return errorMessage(res, "Not have active Medical Report for this Patient", 422)
    }
    else{
        const data =  await MedicalReport.findOne({where: {patient_id: value.id ,discharged_at:null}});    
        report_id=(data.dataValues.report_id)

    try {
        const result = await sequelize.query(
            "select enter_results(:testId,:report_id ,:id ,:date ,:testType , :RATresult) as result",
            {
                replacements: {                    
                    testId,
                    report_id,
                    id,
                    date,
                    testType,
                    RATresult            
                },
            }
        );

        const patient_data = await Patient.findOne({where: {patient_id: id}})
        const phoneNumber = patient_data.dataValues.contact_no;
        if (result[0][0]["result"] == 1) {                
            sendSMS(phoneNumber,testId,testType,RATresult,date)
            return successMessage(res, result, "Test result successfully  Entered!", 201);

        } else {
            return errorMessage(res, "Test result  not Entered!.Please Check again Details!", 404);
        }
    } catch (err) {
        return errorMessage(res, "Internal Server Error!", 500);
    }}
};

const getTestDetailsById = async (req, res, next) => {
    try{
        const report = await MedicalReport.findOne({where: {patient_id: req.params.id}})
        const reportId = report.report_id
        const test = await Test.findAll({where: {report_id: reportId}})
        res.json(test)
    } catch (err) {
        return errorMessage(res, "Internal Server Error!", 500);
      }
  }  


module.exports = {
    enterResult,getTestDetailsById
};
