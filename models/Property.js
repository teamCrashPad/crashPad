module.exports = function (sequelize, DataTypes) {
    var Property = sequelize.define("Property", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type:  DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.STRING
        },
        capacity: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.BLOB
        }
    });

    Property.associate = function (models) {
        Property.hasOne(models.Address,{
            foreignKey: {
                allowNull: false
            },
            onDelete: "cascade"
        });
        Property.belongsTo(models.Landlord, {
            foreignKey: {
                allowNull: false
            }
        });
        Property.hasMany(models.Application, {
            onDelete: "cascade"
        });
    };

    return Property;
};