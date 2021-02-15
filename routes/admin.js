const router = require('express').Router();
const { getGuestCount, getRegCount, getFlights, getPassCount, getPassAboveAgeDetails,getPassBelowAgeDetails, getPassDesCount,getTotalRevenueOfAircraft,updateDelayDetails,createFlight } = require("../controller/adminController");


router.post('/guest',getGuestCount);
router.post('/register',getRegCount);
router.post('/passflights',getFlights);
router.post('/passcount', getPassCount);
router.post('/delay', updateDelayDetails);

router.get('/passagedetails/above/:flight_id', getPassAboveAgeDetails);
router.get('/passagedetails/below/:flight_id',getPassBelowAgeDetails);
router.post('/passdescount', getPassDesCount);
router.get('/totalrevenue/:aircraft_id', getTotalRevenueOfAircraft);

router.post('/createflight',createFlight);


module.exports=router;