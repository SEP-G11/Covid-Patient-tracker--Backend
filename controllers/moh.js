const sequelize = require('../database/db');
var models = require("../service/init-models").initModels(sequelize);
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { successMessage, errorMessage } = require("../utils/message-template");
const { districtStatsMutate} = require("../utils/array-mutation");
var fs = require('fs');

var User = models.User;
var DistrictStatus = models.DistrictStatus;

function validateRegister(id, name, email, contact, password,accountType) {
    const schema = Joi.object({
        id: Joi.string().required().label('ID'),
        email: Joi.string().email().trim().lowercase().max(100).required().label('Email'),
        name: Joi.string().trim().max(255).required().label('Name'),
        contact: Joi.string().max(12).required().label('Contact'),
        password: Joi.string().trim().min(5).required().label('Password'),
        accountType: Joi.string().required().label('Account Type')
    });
    return schema.validate({ id: id, email: email, name: name, contact: contact, password: password, accountType: accountType })
}

const register = async (req, res, next) => {
    const {id,email,name,contact,password,accountType} = req.body;
    const { error, value } = validateRegister(id, name, email, contact, password, accountType);
    if (error) {
        return errorMessage(res, error.details[0].message, 422)
    }
    if (await User.findByPk(value.id)){
        return errorMessage(res, "ID already registered", 422)
    }
    if (await User.findOne({where: {email: value.email}})){
        return errorMessage(res, "Email already registered", 422)
    }
    try {
        const hashedPw = await bcrypt.hash(value.password, 12);
        const queryResult = await User.create({
            user_id: value.id,
            name: value.name,
            email: value.email,
            contact_no: value.contact,
            password: hashedPw,
            user_type: value.accountType
        });
        return successMessage(res, {}, 'User created successfully', 201);
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

const overallDistrictsStats = async (req,res,next) => {
    const districtCoord = JSON.parse(fs.readFileSync('data/districts.json', 'utf8'));
    try{
        const overallDistrictsResult = await DistrictStatus.findAll();
        if (overallDistrictsResult && overallDistrictsResult.length!==0){
            return successMessage(res, districtStatsMutate(overallDistrictsResult, districtCoord), 'Districts Data Found', 201);
        }
        else {
            return errorMessage(res, 'Districts Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

const overallDistrictStats = async (req,res,next) => {
    const district = req.params.district;
    const districtCoord = JSON.parse(fs.readFileSync('data/districts.json', 'utf8'));
    try{
        const overallDistrictResult = await DistrictStatus.findAll({
            where: {district: district}
        });
        if (overallDistrictResult && overallDistrictResult.length!==0){
            return successMessage(res, districtStatsMutate(overallDistrictResult, districtCoord), 'District Data Found', 201);
        }
        else {
            return errorMessage(res, 'District data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};



module.exports = {
    register,overallDistrictsStats,overallDistrictStats
};
