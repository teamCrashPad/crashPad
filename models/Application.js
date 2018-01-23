module.exports = function (sequelize, DataTypes) {
    var Application = sequelize.define("Application", {
        accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Application.associate = function (models) {
        Application.belongsTo(models.Property, {
            foreignKey: {
                allowNull: false
            }
        });
        Application.belongsTo(models.Tenant, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Application;
};