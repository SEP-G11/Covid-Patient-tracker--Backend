const { Op } = require('sequelize');
const sequelize = require('../database/db');
var models = require("../service/init-models").initModels(sequelize);
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { successMessage, errorMessage } = require("../utils/message-template");


var Facility = models.Facility;



const getAllFacility = async (req,res,next) => {
   
  
    try{

     
        const facilityResult = await Facility.findAll();

       
        if (facilityResult && facilityResult.length!==0){
            return successMessage(res,facilityResult, 'facility Data Found', 201);
        }
        else {
            return errorMessage(res, 'facility Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

module.exports = {
    getAllFacility
};
