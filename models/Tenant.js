module.exports = function (sequelize, DataTypes) {
    var Tenant = sequelize.define("Tenant", {
        id:
            {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
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

    Tenant.associate = function (models) {
        Tenant.hasOne(models.ApplicationTemplate, {
            onDelete: "cascade"
        });
        Tenant.hasMany(models.Application, {
            onDelete: "cascade"
        });
    };

    return Tenant;
};