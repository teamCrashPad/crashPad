module.exports = function (sequelize, DataTypes) {
    var Property = sequelize.define("Property", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
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
        Property.belongsTo(models.Address,{
            foreignKey: {
                allowNull: false
            }
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