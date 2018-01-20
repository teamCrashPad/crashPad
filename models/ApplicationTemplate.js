module.exports = function (sequelize, DataTypes) {
    var ApplicationTemplate = sequelize.define("ApplicationTemplate", {
        comments: {
            type: DataTypes.TEXT
        },
        havePets: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isSmoker: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    ApplicationTemplate.associate = function (models) {
        ApplicationTemplate.hasMany(models.Application, {onDelete: "cascade"});
    };

    return ApplicationTemplate;
};