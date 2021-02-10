const router = require('express').Router();
const { getGuestCount, getRegCount, getFlights, getPassCount, getPassAboveAgeDetails,getPassBelowAgeDetails, getPassDesCount } = require("../controller/adminController");



router.get('/passagedetails/above/:flight_id', getPassAboveAgeDetails);
router.get('/passagedetails/below/:flight_id',getPassBelowAgeDetails);
router.post('/passdescount',getPassDesCount);


module.exports=router;