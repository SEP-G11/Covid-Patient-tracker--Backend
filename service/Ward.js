const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Ward', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ward_no: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'facility',
        key: 'facility_id'
      }
    },
    ward_type: {
      type: DataTypes.ENUM('Covid','Normal'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ward',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "U_WardAndFacility",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ward_no" },
          { name: "facility_id" },
        ]
      },
      {
        name: "FK_WardFacility",
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
    ]
  });
};
