const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('FacilityBed', {
        BedID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        WardID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        FacilityId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        FacilityName: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        WardType: {
            type: DataTypes.ENUM('Covid','Normal'),
            allowNull: false
        },
        IsOccupied: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 1
        },
        Capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Contactnumber: {
            type: DataTypes.STRING(12),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'facility_bed',
        timestamps: false
    });
};
