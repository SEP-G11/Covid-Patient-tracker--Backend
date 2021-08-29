const sequelize = require('../database/db');
var initModels = require("../service/init-models");
var models = initModels(sequelize);
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { successMessage, errorMessage } = require("../utils/message-template");

function validateRegister(id, name, email, contact, password) {
    const schema = Joi.object({
        id: Joi.string().required().label('ID'),
        email: Joi.string().email().trim().lowercase().max(100).required().label('Email'),
        name: Joi.string().trim().max(255).required().label('Name'),
        contact: Joi.string().max(12).required().label('Contact'),
        password: Joi.string().trim().min(5).required().label('Password')
    });
    return schema.validate({ id: id, email: email, name: name, contact: contact, password: password })
}

const register = async (req, res, next) => {
    const {id,email,name,contact,password,accountType} = req.body;
    const { error, value } = validateRegister(id, name, email, contact, password);
    if (error) {
        return errorMessage(res, error.details[0].message, 422)
    }
    if (await models.user.findByPk(value.id)){
        return errorMessage(res, "ID already registered", 422)
    }
    if (await models.user.findOne({where: {email: value.email}})){
        return errorMessage(res, "Email already registered", 422)
    }
    try {
        const hashedPw = await bcrypt.hash(value.password, 12);
        const queryResult = await models.user.create({
            user_id: value.id,
            name: value.name,
            email: value.email,
            contact_no: value.contact,
            password: hashedPw,
            user_type: accountType
        });
        return successMessage(res, {}, 'User created successfully', 201);
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

module.exports = {
    register
}
