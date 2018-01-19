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
        }
    });

    Tenant.associate = function (models) {
        Tenant.hasOne(models.TenantInfo, {
            onDelete: "cascade"
        });
        Tenant.hasMany(models.Application, {
            onDelete: "cascade"
        });
    };

    return Tenant;
};