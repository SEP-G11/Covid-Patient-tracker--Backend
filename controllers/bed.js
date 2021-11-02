const { successMessage, errorMessage } = require("../utils/message-template");
const { facilitybeds } = require("../utils/array-mutation");
const { FacilityBed, sequelize } = require('../service/models');

/**
* Search facilityId to get  beds details 
* 
* @param {object} req - http request
* @param {object} res - http response
* @return {Response} [{ BedId , CovidBeds ,NormalBeds ,FacilityName , Capacity }]
*/
const bedSearch = async (req, res, next) => {
    const facilityId = req.params.facilityId == "*" ? (req.facilityId) : (req.params.facilityId);
    try {
        const bedResult = await FacilityBed.findAll({
            where: { facilityId: facilityId }
        });      
        if (bedResult && bedResult.length !== 0) {
            return successMessage(res, facilitybeds(bedResult), 'Beds Data Found', 201);
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
