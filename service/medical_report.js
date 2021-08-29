const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medical_report', {
    report_id: {
      type: DataTypes.STRING(10),
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
    symptoms: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    admitted_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    discharged_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'medical_report',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "report_id" },
        ]
      },
      {
        name: "FK_ReportPatient",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
};
