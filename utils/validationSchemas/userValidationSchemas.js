const Joi = require('joi');

const validateEditProfile = (name, contact,newPassword) => {
    const schema = Joi.object({
        name: Joi.string().trim().max(255).label('Name'),
        contact: Joi.string().pattern(/^(94[0-9]{9})$/).label('Contact').messages({'string.pattern.base': 'Must be a valid Contact Number'}),
        newPassword: Joi.string().trim().min(5).label('Password'),
    });
    return schema.validate({ name: name, contact: contact, newPassword: newPassword})
};

module.exports =  {
    validateEditProfile
};
