const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Allocation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patient_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
      references: {
        model: 'patient',
        key: 'patient_id'
      }
    },
    bed_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bed',
        key: 'id'
      }
    },
    is_occupied: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'allocation',
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
        name: "FK_AllocPatient",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
      {
        name: "FK_AllocBed",
        using: "BTREE",
        fields: [
          { name: "bed_no" },
        ]
      },
    ]
  });
};
