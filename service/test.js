const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Test', {
    test_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    report_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'medical_report',
        key: 'report_id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    test_type: {
      type: DataTypes.ENUM('PCR','RAT'),
      allowNull: false
    },
    result: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'test',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "test_id" },
        ]
      },
      {
        name: "FK_TestReport",
        using: "BTREE",
        fields: [
          { name: "report_id" },
        ]
      },
    ]
  });
};
