module.exports = function (sequelize, DataTypes) {
    var Landlord = sequelize.define("Landlord", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        isLandlord: {
            type: DataTypes.STRING,
            allowNull:true,
            len: [1]
        }
    });

    Landlord.associate = function (models) {
        Landlord.hasMany(models.Property, {});
    };

    return Landlord;
};