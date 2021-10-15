const { successMessage, errorMessage } = require("../utils/message-template");

const {Facility} = require('../service/models')


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
