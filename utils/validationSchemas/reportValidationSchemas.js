const Joi = require('joi');

const validateCreateReport = (RATresult, date, bday, phonenumber) => {
    const schema = Joi.object({
        bday: Joi.string().required().label('Date of Birthday'),
        phonenumber: Joi.string().min(12).max(12).required().label('Contact Number'),
        RATresult: Joi.string().required().label('RAT Result'),
        date: Joi.string().required().label(' Date'),
    });

    return schema.validate({ RATresult: RATresult, date: date,bday: bday,phonenumber: phonenumber })
};

module.exports = {
    validateCreateReport
};



