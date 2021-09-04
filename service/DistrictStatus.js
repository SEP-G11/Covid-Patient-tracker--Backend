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
