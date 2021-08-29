const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('allocation', {
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
        key: 'bed_no'
      }
    }
  }, {
    sequelize,
    tableName: 'allocation',
    timestamps: false,
    indexes: [
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
