const { Op } = require('sequelize');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const { successMessage, errorMessage } = require("../utils/message-template");
const { districtStatsMutate,countryStatsMutate,dateMapToValuesMutate,dateMapToTestsMutate,facilityBedsMutate} = require("../utils/array-mutation");
const {validateRegister} = require('../utils/validationSchemas/mohValidationSchemas');
var fs = require('fs');

const {User,DistrictStatus,MedicalReport,Test,FacilityStaff,Facility,FacilityBed,sequelize} = require('../service/models');

/**
 * Register a user to the system
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} {}
 */
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
            return successMessage(res,{},'User created successfully', 201);
        }
        else {
            return errorMessage(res, "User registration failed", 400)
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

/**
 * Get overall statistics of all districts
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} {{cases,active,deaths,recovered,todayCases,todayDeaths,todayRecovered,districtInfo}}
 */
const overallDistrictsStats = async (req,res,next) => {
    const districtInfo = JSON.parse(fs.readFileSync('data/districts.json', 'utf8'));
    try{
        const overallDistrictsResult = await DistrictStatus.findAll();
        if (overallDistrictsResult && overallDistrictsResult.length!==0){
            return successMessage(res, districtStatsMutate(overallDistrictsResult, districtInfo), 'Districts Data Found');
        }
        else {
            return errorMessage(res, 'Districts Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

/**
 * Get overall statistics of single district
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} {{cases,active,deaths,recovered,todayCases,todayDeaths,todayRecovered,districtInfo}}
 */
const overallDistrictStats = async (req,res,next) => {
    const district = req.params.district;
    const districtInfo = JSON.parse(fs.readFileSync('data/districts.json', 'utf8'));
    try{
        const overallDistrictResult = await DistrictStatus.findAll({
            where: {district: district}
        });
        if (overallDistrictResult && overallDistrictResult.length!==0){
            return successMessage(res, districtStatsMutate(overallDistrictResult, districtInfo), 'District Data Found');
        }
        else {
            return errorMessage(res, 'District Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

/**
 * Get overall statistics of the country
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} {{cases,active,recovered,deaths,todayCases,todayDeaths,todayRecovered}}
 */
const overallCountryStats = async (req,res,next) => {
    try{
        const overallCountryResult = await DistrictStatus.findAll();
        if (overallCountryResult && overallCountryResult.length!==0){
            return successMessage(res, countryStatsMutate(overallCountryResult), 'Country Data Found');
        }
        else {
            return errorMessage(res, 'Country Data Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

/**
 * Get historical no of cases of last n days
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} {mm/dd/yy}
 */
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
            return successMessage(res,dateMapToValuesMutate(activeLastXDays,lastDays),`Historical Cases over last ${lastDays} days Found`)
        }

    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};


/**
 * Get historical no of recovered of last n days
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} {mm/dd/yy}
 */
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
            return successMessage(res,dateMapToValuesMutate(recoveredLastXDays,lastDays),`Historical Recovered over last ${lastDays} days Found`)
        }

    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

/**
 * Get historical no of deaths of last n days
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} {mm/dd/yy}
 */
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
            return successMessage(res,dateMapToValuesMutate(recoveredLastXDays,lastDays),`Historical Deaths over last ${lastDays} days Found`)
        }

    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

/**
 * Get historical no of PCR and RAT tests of last n days
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} {mm/dd/yy:{pcr,rat}}
 */
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
            return successMessage(res,dateMapToTestsMutate(testsLastXDays,lastDays),`Historical Tests over last ${lastDays} days Found`)

        }

    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

/**
 * Get facilities list
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} [{facility_id,name,address,contact_no}]
 */
const getFacilities = async (req,res,next) => {
    try{
        const facilities = await Facility.findAll({
        });
        if (facilities && facilities.length>0){
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

/**
 * Get number of recovered of all facilities/single facility
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} [{facility_id,count,todayCount}]
 */
const getFacilitiesRecovered = async (req,res,next) => {
    const facilityId = parseInt(req.query.facility) || null;
    let queryOptions={
        where: {
            status: 'Recovered'
        },
        attributes: [['discharged_facility','facility_id'],
            [sequelize.fn('COUNT', 'discharged_facility'), 'count'],
            [sequelize.fn('SUM', sequelize.literal(`CASE WHEN (date(discharged_at)=date(NOW()) and status = "Recovered") THEN 1 ELSE 0 END`)), 'todayCount']
        ],
        group: 'discharged_facility'
    };

    if (facilityId){
        queryOptions.where['discharged_facility'] = facilityId
    }

    try{
        const facilitiesRecovered = await MedicalReport.findAll(queryOptions);

        if (facilitiesRecovered && facilitiesRecovered.length>0){
            return successMessage(res,facilitiesRecovered,'Facilities recoveries found')
        }
        else {
            return errorMessage(res, 'Facilities recoveries Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

/**
 * Get number of deaths of all facilities/single facility
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} [{facility_id,count,todayCount}]
 */
const getFacilitiesDeaths = async (req,res,next) => {
    const facilityId = parseInt(req.query.facility) || null;
    let queryOptions={
        where: {
            status: 'Dead'
        },
        attributes: [['discharged_facility','facility_id'],
            [sequelize.fn('COUNT', 'discharged_facility'), 'count'],
            [sequelize.fn('SUM', sequelize.literal(`CASE WHEN (date(discharged_at)=date(NOW()) and status = "Dead") THEN 1 ELSE 0 END`)), 'todayCount']
        ],
        group: 'discharged_facility'
    };

    if (facilityId){
        queryOptions.where['discharged_facility'] = facilityId
    }

    try{
        const facilitiesDeaths = await MedicalReport.findAll(queryOptions);

        if (facilitiesDeaths && facilitiesDeaths.length>0){
            return successMessage(res,facilitiesDeaths,'Facilities deaths found')
        }
        else {
            return errorMessage(res, 'Facilities deaths Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

/**
 * Get number of active of all facilities/single facility
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} [{facility_id,count,todayCount}]
 */
const getFacilitiesActive = async (req,res,next) => {
    const facilityId = parseInt(req.query.facility) || null;
    let queryOptions={
        where: {
            status: 'Active'
        },
        attributes: [['admitted_facility','facility_id'],
            [sequelize.fn('COUNT', 'admitted_facility'), 'count'],
            [sequelize.fn('SUM', sequelize.literal(`CASE WHEN (date(admitted_at)=date(NOW()) and status = "Active") THEN 1 ELSE 0 END`)), 'todayCount']
        ],
        group: 'admitted_facility'
    };

    if (facilityId){
        queryOptions.where['admitted_facility'] = facilityId
    }

    try{
        const facilitiesActive = await MedicalReport.findAll(queryOptions);

        if (facilitiesActive && facilitiesActive.length>0){
            return successMessage(res,facilitiesActive,'Facilities active found')
        }
        else {
            return errorMessage(res, 'Facilities active Not Found', 404);
        }
    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

/**
 * Get number beds of all facilities
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} {facility_id:{totalCovidBeds,occupiedCovidBeds,totalNormalBeds,occupiedNormalBeds}}
 */
const getFacilitiesBeds = async (req,res,next) => {
    try{
        const facilityBeds = await FacilityBed.findAll({
            attributes: [['FacilityId','facilityId'],['WardType','wardType'],
                [sequelize.literal(`CASE WHEN isOccupied is null THEN 0 ELSE isOccupied END`), 'isOccupied']
            ],
        });

        if (facilityBeds && facilityBeds.length>0){
            return successMessage(res,facilityBedsMutate(facilityBeds),'Facilities Beds data found')
        }
        else {
            return errorMessage(res, 'Facilities Beds data Not Found', 404);
        }

    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }

};

/**
 * Get historical statistics for a facility
 * @param {object} req - http request
 * @param {object} res - http response
 * @param {object} next
 * @return {Response} {mm/dd/yy}
 */
const facilityHistorical = async (req,res,next) => {
    const lastDays = parseInt(req.query.lastdays) || 1;
    const caseType = req.query.type || 'cases';
    const facilityId = req.query.facility || 1;
    let dateType;
    let status;
    let  facility;
    if (caseType==='cases'){
        dateType='admitted_at';
        facility='admitted_facility';
    }
    else if (caseType==='deaths'){
        dateType='discharged_at';
        facility='discharged_facility';
        status = 'Dead';
    }
    else if (caseType==='recovered'){
        dateType='discharged_at';
        facility='discharged_facility';
        status = 'Recovered'
    }
    else {
        return errorMessage(res, 'Invalid case type', 422);
    }
    let queryOptions = {
        attributes: [
            [sequelize.fn('date', sequelize.col(dateType)), 'date'],
            [sequelize.fn('COUNT', dateType), 'count']
        ],
        where: [sequelize.where(sequelize.fn('date', sequelize.col(dateType)),
            {[Op.gt]: moment().subtract(lastDays, 'days').toDate()}),{[facility]:facilityId}],
        group: ('date')
    };
    if (status==='Recovered' || status==='Dead') {
        queryOptions.where.push({status: status})
    }

    try{
        const facilityLastXDays = await MedicalReport.findAll(queryOptions);
        if (facilityLastXDays){
            return successMessage(res,dateMapToValuesMutate(facilityLastXDays,lastDays),`Historical ${caseType} of facility ${facilityId} over last ${lastDays} days Found`, 200)
        }

    }
    catch (err) {
        return errorMessage(res, 'Internal Server Error', 500);
    }
};

module.exports = {
    register,overallDistrictsStats,overallDistrictStats,overallCountryStats,historicalCases,historicalRecovered,historicalDeaths,
    historicalTests,getFacilities,getFacilitiesRecovered,getFacilitiesDeaths,getFacilitiesActive,getFacilitiesBeds,facilityHistorical
};