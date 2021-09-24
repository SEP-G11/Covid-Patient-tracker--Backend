var DataTypes = require("sequelize").DataTypes;
var _Allocation = require("./Allocation");
var _Bed = require("./Bed");
var _DistrictStatus = require("./DistrictStatus");
var _Facility = require("./Facility");
var _FacilityBed = require("./FacilityBed");
var _FacilityStaff = require("./FacilityStaff");
var _MedicalReport = require("./MedicalReport");
var _PasswordReset = require("./PasswordReset");
var _Patient = require("./Patient");
var _Test = require("./Test");
var _Transfer = require("./Transfer");
var _User = require("./User");
var _Ward = require("./Ward");

function initModels(sequelize) {
  var Allocation = _Allocation(sequelize, DataTypes);
  var Bed = _Bed(sequelize, DataTypes);
  var DistrictStatus = _DistrictStatus(sequelize, DataTypes);
  var Facility = _Facility(sequelize, DataTypes);
  var FacilityBed = _FacilityBed(sequelize, DataTypes);
  var FacilityStaff = _FacilityStaff(sequelize, DataTypes);
  var MedicalReport = _MedicalReport(sequelize, DataTypes);
  var PasswordReset = _PasswordReset(sequelize, DataTypes);
  var Patient = _Patient(sequelize, DataTypes);
  var Test = _Test(sequelize, DataTypes);
  var Transfer = _Transfer(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var Ward = _Ward(sequelize, DataTypes);

  Allocation.belongsTo(Bed, { as: "bed_no_bed", foreignKey: "bed_no"});
  Bed.hasMany(Allocation, { as: "allocations", foreignKey: "bed_no"});
  Transfer.belongsTo(Bed, { as: "origin_bed", foreignKey: "origin_bed_id"});
  Bed.hasMany(Transfer, { as: "transfers", foreignKey: "origin_bed_id"});
  Transfer.belongsTo(Bed, { as: "destination_bed", foreignKey: "destination_bed_id"});
  Bed.hasMany(Transfer, { as: "destination_bed_transfers", foreignKey: "destination_bed_id"});
  FacilityStaff.belongsTo(Facility, { as: "facility", foreignKey: "facility_id"});
  Facility.hasMany(FacilityStaff, { as: "facility_staffs", foreignKey: "facility_id"});
  MedicalReport.belongsTo(Facility, { as: "admitted_facility_facility", foreignKey: "admitted_facility"});
  Facility.hasMany(MedicalReport, { as: "medical_reports", foreignKey: "admitted_facility"});
  MedicalReport.belongsTo(Facility, { as: "discharged_facility_facility", foreignKey: "discharged_facility"});
  Facility.hasMany(MedicalReport, { as: "discharged_facility_medical_reports", foreignKey: "discharged_facility"});
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
  FacilityStaff.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(FacilityStaff, { as: "facility_staffs", foreignKey: "user_id"});
  PasswordReset.belongsTo(User, { as: "email_user", foreignKey: "email"});
  User.hasMany(PasswordReset, { as: "password_resets", foreignKey: "email"});
  Bed.belongsTo(Ward, { as: "ward_ward", foreignKey: "ward"});
  Ward.hasMany(Bed, { as: "beds", foreignKey: "ward"});
  DistrictStatus.removeAttribute('id');
  FacilityStaff.removeAttribute('id');
  FacilityBed.removeAttribute("id");
  return {
    Allocation,
    Bed,
    DistrictStatus,
    Facility,
    FacilityBed,
    FacilityStaff,
    MedicalReport,
    PasswordReset,
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