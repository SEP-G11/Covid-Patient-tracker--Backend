const Joi = require('joi');

const validateEditProfile = (name, contact,newPassword) => {
    const schema = Joi.object({
        name: Joi.string().trim().max(255).label('Name'),
        contact: Joi.string().max(12).label('Contact'),
        newPassword: Joi.string().trim().min(5).label('Password'),
    });
    return schema.validate({ name: name, contact: contact, newPassword: newPassword})
};

module.exports =  {
    validateEditProfile
};
