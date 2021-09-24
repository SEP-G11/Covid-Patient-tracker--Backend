const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FacilityBed', {

        BedID: {
          type: DataTypes.INTEGER(11),
          allowNull: true
        },
        WardID: {
          type: DataTypes.INTEGER(11),
          allowNull: true
        },
        FacilityId: {
          type: DataTypes.INTEGER(11),
          allowNull: true
        },
        FacilityName: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        WardType: {
          type: DataTypes.ENUM('Normal','Covid'),
          allowNull: true
        },
        IsOccupied: {
          type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: 1
        },
        Capacity: {
          type: DataTypes.INTEGER(11),
          allowNull: false
        },
        Contactnumber: {
          type: DataTypes.STRING(50),
          allowNull: false
        }

      },
      {
        sequelize,
        tableName: 'facility_bed',
        timestamps: false
      });


};