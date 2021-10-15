const sequelize = require('../database/db');
var models = require("./init-models").initModels(sequelize);

module.exports.Allocation = models.Allocation;
module.exports.Bed = models.Bed;
module.exports.DistrictStatus = models.DistrictStatus;
module.exports.Facility = models.Facility;
module.exports.FacilityBed = models.FacilityBed;
module.exports.FacilityStaff = models.FacilityStaff;
module.exports.MedicalReport = models.MedicalReport;
module.exports.PasswordReset = models.PasswordReset;
module.exports.Patient = models.Patient;
module.exports.Test = models.Test;
module.exports.Transfer = models.Transfer;
module.exports.User = models.User;
module.exports.Ward = models.Ward;

module.exports.sequelize = sequelize;