const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FacilityStaff', {
    user_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'facility',
        key: 'facility_id'
      }
    }
  }, {
    sequelize,
    tableName: 'facility_staff',
    timestamps: false,
    indexes: [
      {
        name: "FK_FS_Facility",
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
      {
        name: "FK_FS_User",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
