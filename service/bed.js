const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bed', {
    bed_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ward_no: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'ward',
        key: 'ward_no'
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
          { name: "bed_no" },
        ]
      },
      {
        name: "FK_BedWard",
        using: "BTREE",
        fields: [
          { name: "ward_no" },
        ]
      },
    ]
  });
};
