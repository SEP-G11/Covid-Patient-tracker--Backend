const router = require('express').Router();
const { getGuestCount, getRegCount, getFlights, getPassCount, getPassAgeDetails, getPassDesCount } = require("../controller/adminController");


router.get('/guest',getGuestCount);
router.get('/register',getRegCount);
router.get('/passflights',getFlights);
router.get('/passcount', getPassCount);

router.get('/passagedetails/:flight_id',getPassAgeDetails);
router.post('/passdescount',getPassDesCount);


module.exports=router;