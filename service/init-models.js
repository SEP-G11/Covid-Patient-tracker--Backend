var DataTypes = require("sequelize").DataTypes;
var _allocation = require("./allocation");
var _bed = require("./bed");
var _facility = require("./facility");
var _medical_report = require("./medical_report");
var _patient = require("./patient");
var _test = require("./test");
var _transfer = require("./transfer");
var _user = require("./user");
var _ward = require("./ward");

function initModels(sequelize) {
  var allocation = _allocation(sequelize, DataTypes);
  var bed = _bed(sequelize, DataTypes);
  var facility = _facility(sequelize, DataTypes);
  var medical_report = _medical_report(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);
  var test = _test(sequelize, DataTypes);
  var transfer = _transfer(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var ward = _ward(sequelize, DataTypes);

  allocation.belongsTo(bed, { as: "bed_no_bed", foreignKey: "bed_no"});
  bed.hasMany(allocation, { as: "allocations", foreignKey: "bed_no"});
  transfer.belongsTo(facility, { as: "origin_facility", foreignKey: "origin"});
  facility.hasMany(transfer, { as: "transfers", foreignKey: "origin"});
  transfer.belongsTo(facility, { as: "destination_facility", foreignKey: "destination"});
  facility.hasMany(transfer, { as: "destination_transfers", foreignKey: "destination"});
  ward.belongsTo(facility, { as: "facility", foreignKey: "facility_id"});
  facility.hasMany(ward, { as: "wards", foreignKey: "facility_id"});
  test.belongsTo(medical_report, { as: "report", foreignKey: "report_id"});
  medical_report.hasMany(test, { as: "tests", foreignKey: "report_id"});
  allocation.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(allocation, { as: "allocations", foreignKey: "patient_id"});
  medical_report.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(medical_report, { as: "medical_reports", foreignKey: "patient_id"});
  transfer.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(transfer, { as: "transfers", foreignKey: "patient_id"});
  bed.belongsTo(ward, { as: "ward_no_ward", foreignKey: "ward_no"});
  ward.hasMany(bed, { as: "beds", foreignKey: "ward_no"});

  return {
    allocation,
    bed,
    facility,
    medical_report,
    patient,
    test,
    transfer,
    user,
    ward,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
