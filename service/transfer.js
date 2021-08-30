const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Transfer', {
    patient_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
      references: {
        model: 'patient',
        key: 'patient_id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    origin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'facility',
        key: 'facility_id'
      }
    },
    destination: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'facility',
        key: 'facility_id'
      }
    }
  }, {
    sequelize,
    tableName: 'transfer',
    timestamps: false,
    indexes: [
      {
        name: "FK_TransferPatient",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
      {
        name: "FK_TransferOrigin",
        using: "BTREE",
        fields: [
          { name: "origin" },
        ]
      },
      {
        name: "FK_TransferDest",
        using: "BTREE",
        fields: [
          { name: "destination" },
        ]
      },
    ]
  });
};
