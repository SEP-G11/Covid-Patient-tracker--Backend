const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Transfer', {
    patient_id: {
      type: DataTypes.STRING(200),
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
    origin_bed_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bed',
        key: 'id'
      }
    },
    destination_bed_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bed',
        key: 'id'
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
        name: "FK_TransferDestBed",
        using: "BTREE",
        fields: [
          { name: "destination_bed_id" },
        ]
      },
      {
        name: "FK_TransferOriginBed",
        using: "BTREE",
        fields: [
          { name: "origin_bed_id" },
        ]
      },
    ]
  });
};
