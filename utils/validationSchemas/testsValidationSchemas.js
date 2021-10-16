const Joi = require('joi');

const validateEnterResult = (id, RATresult, testType, date)=> {
    const schema = Joi.object({
        id: Joi.string().required().label('Patient Id'),
        RATresult: Joi.string().required().label('RAT Result'),
        testType: Joi.string().required().label('Test Type'),
        date: Joi.string().required().label('Date'),
    });

    return schema.validate({id: id,RATresult: RATresult,testType: testType,date: date })}
;

module.exports = {
    validateEnterResult
};

  