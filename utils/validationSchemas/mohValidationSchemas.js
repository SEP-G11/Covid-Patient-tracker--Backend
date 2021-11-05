const Joi = require('joi');

const validateRegister = (id, name, email, contact, password,accountType,facilityId)  => {
    const schema = Joi.object({
        id: Joi.string().pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/).required().label('ID').messages({'string.pattern.base': '"ID" must be a valid NIC'}),
        name: Joi.string().trim().max(255).required().label('Name'),
        email: Joi.string().email().trim().lowercase().max(100).required().label('Email'),
        contact: Joi.string().pattern(/^(94[0-9]{9})$/).required().label('Contact').messages({'string.pattern.base': 'Must be a valid Contact Number'}),
        password: Joi.string().trim().min(5).required().label('Password'),
        accountType: Joi.string().valid('MOH','DOC','HA').required().label('Account Type'),
        facilityId: Joi.number().when('accountType',{not: 'MOH',then: Joi.number().required()}).label("Facility")
    });
    return schema.validate({ id: id, email: email, name: name, contact: contact, password: password, accountType: accountType, facilityId: facilityId })
};

module.exports = {
    validateRegister
};
