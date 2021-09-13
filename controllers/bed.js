const { Op } = require('sequelize');
const sequelize = require('../database/db');
var models = require("../service/init-models").initModels(sequelize);
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { successMessage, errorMessage } = require("../utils/message-template");



var FacilityBed = models.FacilityBed;



const bedSearch = async (req,res,next) => {
    const facilityId = req.params.facilityId;

    try{
        const bedResult = await FacilityBed.findAll({
            where: {facilityId: facilityId}
        });
        if (bedResult && bedResult.length!==0){
            return successMessage(res, bedResult, 'Beds Data Found', 201);
        }
        else {
            return errorMessage(res, 'Beds Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

module.exports = {
    bedSearch
};
