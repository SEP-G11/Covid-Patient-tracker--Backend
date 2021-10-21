const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Bed', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bed_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ward: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ward',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'bed',
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
        name: "U_BedWard",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bed_no" },
          { name: "ward" },
        ]
      },
      {
        name: "FK_BedWard",
        using: "BTREE",
        fields: [
          { name: "ward" },
        ]
      },
    ]
  });
};