var DataTypes = require("sequelize").DataTypes;
var _Allocation = require("./Allocation");
var _Bed = require("./Bed");
var _Facility = require("./Facility");
var _MedicalReport = require("./MedicalReport");
var _Patient = require("./Patient");
var _Test = require("./Test");
var _Transfer = require("./Transfer");
var _User = require("./User");
var _Ward = require("./Ward");

function initModels(sequelize) {
  var Allocation = _Allocation(sequelize, DataTypes);
  var Bed = _Bed(sequelize, DataTypes);
  var Facility = _Facility(sequelize, DataTypes);
  var MedicalReport = _MedicalReport(sequelize, DataTypes);
  var Patient = _Patient(sequelize, DataTypes);
  var Test = _Test(sequelize, DataTypes);
  var Transfer = _Transfer(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var Ward = _Ward(sequelize, DataTypes);

  Allocation.belongsTo(Bed, { as: "bed_no_bed", foreignKey: "bed_no"});
  Bed.hasMany(Allocation, { as: "allocations", foreignKey: "bed_no"});
  Transfer.belongsTo(Facility, { as: "origin_facility", foreignKey: "origin"});
  Facility.hasMany(Transfer, { as: "transfers", foreignKey: "origin"});
  Transfer.belongsTo(Facility, { as: "destination_facility", foreignKey: "destination"});
  Facility.hasMany(Transfer, { as: "destination_transfers", foreignKey: "destination"});
  Ward.belongsTo(Facility, { as: "facility", foreignKey: "facility_id"});
  Facility.hasMany(Ward, { as: "wards", foreignKey: "facility_id"});
  Test.belongsTo(MedicalReport, { as: "report", foreignKey: "report_id"});
  MedicalReport.hasMany(Test, { as: "tests", foreignKey: "report_id"});
  Allocation.belongsTo(Patient, { as: "patient", foreignKey: "patient_id"});
  Patient.hasMany(Allocation, { as: "allocations", foreignKey: "patient_id"});
  MedicalReport.belongsTo(Patient, { as: "patient", foreignKey: "patient_id"});
  Patient.hasMany(MedicalReport, { as: "medical_reports", foreignKey: "patient_id"});
  Transfer.belongsTo(Patient, { as: "patient", foreignKey: "patient_id"});
  Patient.hasMany(Transfer, { as: "transfers", foreignKey: "patient_id"});
  Bed.belongsTo(Ward, { as: "ward_ward", foreignKey: "ward"});
  Ward.hasMany(Bed, { as: "beds", foreignKey: "ward"});

  return {
    Allocation,
    Bed,
    Facility,
    MedicalReport,
    Patient,
    Test,
    Transfer,
    User,
    Ward,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
