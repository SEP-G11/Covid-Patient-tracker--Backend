const router = require('express').Router();
const { getGuestCount, getRegCount, getFlights, getPassCount, getPassAboveAgeDetails,getPassBelowAgeDetails, getPassDesCount } = require("../controller/adminController");


router.get('/guest',getGuestCount);
router.get('/register',getRegCount);
router.get('/passflights',getFlights);
router.get('/passcount', getPassCount);

router.get('/passagedetails/above/:flight_id', getPassAboveAgeDetails);
router.get('/passagedetails/below/:flight_id',getPassBelowAgeDetails);
router.post('/passdescount',getPassDesCount);


module.exports=router;