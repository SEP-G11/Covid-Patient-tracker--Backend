const Joi = require('joi');

const validateAdmitPatient = (name, contactnumber, RATresult, admitDateTime, bday) => {
    const schema = Joi.object({
        name: Joi.string().trim().max(255).required().label('Name'),
        bday: Joi.string().required().label('Date of Birthday'),
        contactnumber: Joi.string().min(12).max(12).required().label('Contact Number'),
        RATresult: Joi.string().required().label('RAT Result'),
        admitDateTime: Joi.string().required().label('Admit Date'),
    });
    return schema.validate({ name: name, bday: bday, contactnumber: contactnumber, RATresult: RATresult, admitDateTime: admitDateTime })
};


const validateDischargePatient = (patient_id, discharged_at, status,) => {
    const schema = Joi.object({
        patient_id: Joi.string().required().label('Patient Id'),
        status: Joi.string().required().label('Status'),
        discharged_at: Joi.string().required().label('Discharge Date'),
    });
    return schema.validate({ patient_id: patient_id, discharged_at: discharged_at, status: status })
};


const validateTransferPatient = (patient_id, transfer_date, dest_bed_id) => {
    const schema = Joi.object({
        patient_id: Joi.string().required().label('Patient Id'),
        dest_bed_id: Joi.number().required().label('Destination Bed Id'),
        transfer_date: Joi.string().required().label('Transfer Date'),
    });
    return schema.validate({ patient_id: patient_id, transfer_date: transfer_date, dest_bed_id: dest_bed_id })
};



module.exports = {
    validateAdmitPatient, validateDischargePatient, validateTransferPatient
};
