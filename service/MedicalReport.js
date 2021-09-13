const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MedicalReport', {
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
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active','Dead','Recovered'),
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
