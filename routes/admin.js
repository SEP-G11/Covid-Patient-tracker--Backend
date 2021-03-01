const router = require('express').Router();
const { checkToken} = require("../auth/token_validation");
const { isAdmin } = require("../middlewares/isAdmin");
const { loginAdmin,getGuestCount, getRegCount, getFlights, getPassCount, getPassAboveAgeDetails,getPassBelowAgeDetails,getAirport, getPassDesCount,getTotalRevenueOfAircraft,updateDelayDetails,createFlight } = require("../controller/adminController");


router.post('/guest',checkToken,isAdmin,getGuestCount);
router.post('/register',checkToken,isAdmin,getRegCount);
router.post('/passflights',checkToken,isAdmin,getFlights);
router.post('/passcount',checkToken,isAdmin, getPassCount);
router.post('/delay',checkToken,isAdmin, updateDelayDetails);
router.post('/airport',checkToken,isAdmin,getAirport);

router.get('/passagedetails/above/:flight_id',checkToken,isAdmin, getPassAboveAgeDetails);
router.get('/passagedetails/below/:flight_id',checkToken,isAdmin,getPassBelowAgeDetails);
router.post('/passdescount',checkToken,isAdmin, getPassDesCount);
router.get('/totalrevenue/:aircraft_id',checkToken,isAdmin, getTotalRevenueOfAircraft);

router.post('/createflight',checkToken,isAdmin,createFlight);

router.post('/signin',loginAdmin);

module.exports=router;