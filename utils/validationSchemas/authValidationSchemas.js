const Joi = require('joi');

const validateLogin = (email,password) => {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().required().label('Email'),
        password: Joi.string().required().label('Password')
    });
    return schema.validate({ email: email, password: password })
};

const validateForgotPassword = (email) => {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().required().label('Email'),
    });
    return schema.validate({ email: email})
};

const validateResetPassword = (password) => {
    const schema = Joi.object({
        password: Joi.string().trim().min(5).required().label('Password')
    });
    return schema.validate({ password: password })
};


module.exports = {
    validateLogin,validateForgotPassword,validateResetPassword
};

