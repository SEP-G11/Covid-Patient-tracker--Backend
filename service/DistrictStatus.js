const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DistrictStatus', {
    district: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    districtCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    todayCount: {
      type: DataTypes.DECIMAL(22,0),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Active','Dead','Recovered'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'district_status',
    timestamps: false
  });
};
