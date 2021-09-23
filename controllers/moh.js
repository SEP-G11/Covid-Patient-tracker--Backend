const { Op } = require('sequelize');
const moment = require('moment');
const sequelize = require('../database/db');
var models = require("../service/init-models").initModels(sequelize);
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { successMessage, errorMessage } = require("../utils/message-template");
const { districtStatsMutate,countryStatsMutate,dateMapToValuesMutate,dateMapToTestsMutate} = require("../utils/array-mutation");
var fs = require('fs');

var User = models.User;
var DistrictStatus = models.DistrictStatus;
var MedicalReport = models.MedicalReport;
var Test = models.Test;
var FacilityStaff = models.FacilityStaff;
var Facility = models.Facility;

function validateRegister(id, name, email, contact, password,accountType,facilityId) {
    const schema = Joi.object({
        id: Joi.string().required().label('ID'),
        email: Joi.string().email().trim().lowercase().max(100).required().label('Email'),
        name: Joi.string().trim().max(255).required().label('Name'),
        contact: Joi.string().max(12).required().label('Contact'),
        password: Joi.string().trim().min(5).required().label('Password'),
        accountType: Joi.string().required().label('Account Type'),
        facilityId: Joi.number().label("Facility")
    });
    return schema.validate({ id: id, email: email, name: name, contact: contact, password: password, accountType: accountType, facilityId: facilityId })
}

const register = async (req, res, next) => {
    const {id,email,name,contact,password,accountType,facilityId} = req.body;
    const { error, value } = validateRegister(id, name, email, contact, password, accountType,facilityId);
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
        let createUserObj = {
            user_id: value.id,
            name: value.name,
            email: value.email,
            contact_no: value.contact,
            password: hashedPw,
            user_type: value.accountType
        };
        let queryResult;
        if (value.accountType!=='MOH' && facilityId){
            createUserObj["facility_staffs"] = {
                user_id: value.id,
                facility_id: value.facilityId
            };
            queryResult = await User.create(createUserObj,{
                include: {
                    model: FacilityStaff,
                    as: 'facility_staffs'
                }
            });
        }
        else if(value.accountType==='MOH' && !facilityId) {
            queryResult = await User.create(createUserObj);
        }
        if (queryResult){
            return successMessage(res, 'User created successfully', 201);
        }
        else {
            return errorMessage(res, "User registration failed", 400)
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

const overallDistrictsStats = async (req,res,next) => {
    const districtInfo = JSON.parse(fs.readFileSync('data/districts.json', 'utf8'));
    try{
        const overallDistrictsResult = await DistrictStatus.findAll();
        if (overallDistrictsResult && overallDistrictsResult.length!==0){
            return successMessage(res, districtStatsMutate(overallDistrictsResult, districtInfo), 'Districts Data Found', 201);
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
    const districtInfo = JSON.parse(fs.readFileSync('data/districts.json', 'utf8'));
    try{
        const overallDistrictResult = await DistrictStatus.findAll({
            where: {district: district}
        });

        if (overallDistrictResult && overallDistrictResult.length!==0){
            return successMessage(res, districtStatsMutate(overallDistrictResult, districtInfo), 'District Data Found', 201);
        }
        else {
            return errorMessage(res, 'District Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

const overallCountryStats = async (req,res,next) => {
    try{
        const overallCountryResult = await DistrictStatus.findAll();
        if (overallCountryResult && overallCountryResult.length!==0){
            return successMessage(res, countryStatsMutate(overallCountryResult), 'Country Data Found', 201);
        }
        else {
            return errorMessage(res, 'Country Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

const historicalCases = async (req,res,next) => {
    const lastDays = parseInt(req.query.lastdays) || 1;
    try{
        const activeLastXDays = await MedicalReport.findAll({
            attributes: [
                [sequelize.fn('date', sequelize.col('admitted_at')), 'date'],
                [sequelize.fn('COUNT', 'admitted_at'), 'count']
            ],
            where: sequelize.where(sequelize.fn('date', sequelize.col('admitted_at')),
                {[Op.gt]: moment().subtract(lastDays, 'days').toDate()}),
            group: ('date')
        });
        if (activeLastXDays){
            return successMessage(res,dateMapToValuesMutate(activeLastXDays,lastDays),`Historical Cases over last ${lastDays} days Found`, 201)
        }
        else {
            return errorMessage(res, 'Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

const historicalRecovered = async (req,res,next) => {
    const lastDays = parseInt(req.query.lastdays) || 1;
    try{
        const recoveredLastXDays = await MedicalReport.findAll({
            attributes: [
                [sequelize.fn('date', sequelize.col('discharged_at')), 'date'],
                [sequelize.fn('COUNT', 'discharged_at'), 'count']
            ],
            where: [sequelize.where(sequelize.fn('date', sequelize.col('discharged_at')),
                {[Op.gt]: moment().subtract(lastDays, 'days').toDate()}),{status: 'Recovered'}],
            group: ('date')
        });
        if (recoveredLastXDays){
            return successMessage(res,dateMapToValuesMutate(recoveredLastXDays,lastDays),`Historical Recovered over last ${lastDays} days Found`, 201)
        }
        else {
            return errorMessage(res, 'Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

const historicalDeaths = async (req,res,next) => {
    const lastDays = parseInt(req.query.lastdays) || 1;
    try{
        const recoveredLastXDays = await MedicalReport.findAll({
            attributes: [
                [sequelize.fn('date', sequelize.col('discharged_at')), 'date'],
                [sequelize.fn('COUNT', 'discharged_at'), 'count']
            ],
            where: [sequelize.where(sequelize.fn('date', sequelize.col('discharged_at')),
                {[Op.gt]: moment().subtract(lastDays, 'days').toDate()}),{status: 'Dead'}],
            group: ('date')
        });
        if (recoveredLastXDays){
            return successMessage(res,dateMapToValuesMutate(recoveredLastXDays,lastDays),`Historical Deaths over last ${lastDays} days Found`, 201)
        }
        else {
            return errorMessage(res, 'Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

const historicalTests = async (req,res,next) => {
    const lastDays = parseInt(req.query.lastdays) || 1;
    try{
        const testsLastXDays = await Test.findAll({
            attributes: [
                [sequelize.fn('date', sequelize.col('date')), 'test_date'],
                [sequelize.fn('COUNT', 'test_type'), 'count'],
                'test_type'
            ],
            where: [sequelize.where(sequelize.fn('date', sequelize.col('date')),
                {[Op.gt]: moment().subtract(lastDays, 'days').toDate()})],
            group: ['test_date','test_type']
        });
        if (testsLastXDays){
            return successMessage(res,dateMapToTestsMutate(testsLastXDays,lastDays),`Historical Tests over last ${lastDays} days Found`, 201)

        }
        else {
            return errorMessage(res, 'Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

const getFacilities = async (req,res,next) => {
    try{
        const facilities = await Facility.findAll({
           attributes: ['facility_id','name']
        });
        if (facilities){
            return successMessage(res,facilities,'Facilities found')
        }
        else {
            return errorMessage(res, 'Facilities Not Found', 404);
        }

    }
    catch(err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

module.exports = {
    register,overallDistrictsStats,overallDistrictStats,overallCountryStats,historicalCases,historicalRecovered,historicalDeaths,
    historicalTests,getFacilities
};