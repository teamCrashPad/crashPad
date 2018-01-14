module.exports = function (sequelize, DataTypes) {
    var TenantInfo = sequelize.define("TenantInfo", {
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
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return TenantInfo;
};